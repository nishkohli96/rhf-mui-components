import {
  useContext,
  useCallback,
  useMemo,
  type ReactNode
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Autocomplete, { type AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue
} from '@/common';
import type {
  FormLabelProps,
  FormControlLabelProps,
  CheckboxProps,
  FormHelperTextProps,
  KeyValueOption,
  StringArr,
  StrObjOption,
  AutoCompleteTextFieldProps,
  MuiChipProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  isAboveMuiV5
} from '@/utils';

type MultiAutoCompleteProps<Option> = Omit<
  AutocompleteProps<Option, true, false, false>,
  | 'freeSolo'
  | 'fullWidth'
  | 'renderInput'
  | 'renderOption'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'multiple'
  | 'onChange'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'autoHighlight'
  | 'disableCloseOnSelect'
  | 'ChipProps'
>;

export type RHFMultiAutocompleteProps<
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  labelKey?: LabelKey;
  valueKey?: ValueKey;
  selectAllText?: string;
  onValueChange?: (fieldValue: StringArr, targetValue?: string) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: FormControlLabelProps;
  required?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  textFieldProps?: AutoCompleteTextFieldProps;
  ChipProps?: MuiChipProps;
  hideSelectAllOption?: boolean;
} & MultiAutoCompleteProps<Option>;

const RHFMultiAutocomplete = <
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>
>({
    fieldName,
    control,
    registerOptions,
    options,
    labelKey,
    valueKey,
    selectAllText = 'Select All',
    onValueChange,
    label,
    showLabelAboveFormField,
    formLabelProps,
    checkboxProps,
    formControlLabelProps,
    required,
    helperText,
    errorMessage,
    hideErrorMessage,
    formHelperTextProps,
    textFieldProps,
    slotProps,
    ChipProps,
    onBlur,
    loading,
    hideSelectAllOption,
    ...otherAutoCompleteProps
  }: RHFMultiAutocompleteProps<T, Option, LabelKey, ValueKey>) => {
  validateArray('RHFMultiAutocomplete', options, labelKey, valueKey);

  const { allLabelsAboveFields, defaultFormControlLabelSx }
    = useContext(RHFMuiConfigContext);
  const shouldHideSelectAllOptions
    = hideSelectAllOption || (options.length === 0 || options.length === 1);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };

  const isLabelAboveFormField = showLabelAboveFormField ?? allLabelsAboveFields;
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);
  const selectAllOptionValue = '';

  const autoCompleteOptions: Option[] = useMemo(() => {
    if (shouldHideSelectAllOptions) {
      return options;
    }
    return [selectAllText as Option, ...options];
  }, [options, selectAllText, shouldHideSelectAllOptions]);

  const isSelectAllOption = useCallback(
    (option: Option) => {
      return option === selectAllText;
    },
    [selectAllText]
  );

  const getOptionLabelOrValue = useCallback(
    (option: Option, key?: LabelKey | ValueKey): string => {
      return key && isKeyValueOption(option, labelKey, valueKey)
        ? option[key]
        : (option as string);
    },
    [labelKey, valueKey]
  );

  const renderOptionLabel = (
    option: Option,
    getSelectAllValue?: boolean
  ): string =>
    isSelectAllOption(option)
      ? getSelectAllValue
        ? selectAllOptionValue
        : selectAllText
      : getOptionLabelOrValue(option, labelKey);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({
          field: { value, onChange, onBlur: rhfOnBlur, ...otherFieldProps }
        }) => {
          const selectedValues: StringArr = value ?? [];
          const selectedOptions = (value ?? [])
            .map(val =>
              options.find(opn =>
                valueKey && isKeyValueOption(opn, labelKey, valueKey)
                  ? opn[valueKey] === val
                  : opn === val))
            .filter((opn): opn is Option => Boolean(opn));
          const areAllSelected = selectedValues.length === options.length;
          const isIndeterminate = selectedValues.length > 0 && !areAllSelected;

          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              options={autoCompleteOptions}
              value={selectedOptions}
              loading={loading}
              fullWidth
              multiple
              autoHighlight
              disableCloseOnSelect
              onChange={(_, newSelectedOptions, reason, details) => {
                const clickedOption = details?.option;
                if (!clickedOption) {
                  onChange([]);
                  onValueChange?.([]);
                  return;
                }
                const isSelectAll = isSelectAllOption(clickedOption);
                if (isSelectAll) {
                  const allValues = options.map(option => getOptionLabelOrValue(option, valueKey));
                  const areAllCurrentlySelected = (value ?? []).length === options.length;
                  const finalValue = areAllCurrentlySelected ? [] : allValues;
                  onChange(finalValue);
                  onValueChange?.(finalValue, selectAllOptionValue);
                  return;
                }
                const finalValue = newSelectedOptions.map(option =>
                  getOptionLabelOrValue(option, valueKey));
                onChange(finalValue);
                onValueChange?.(
                  finalValue,
                  getOptionLabelOrValue(clickedOption, valueKey)
                );
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              limitTags={2}
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={option => renderOptionLabel(option, true)}
              isOptionEqualToValue={(option, value) => {
                if (isSelectAllOption(option)) {
                  return areAllSelected;
                }
                if (valueKey && isKeyValueOption(option, labelKey, valueKey)) {
                  return (
                    option[valueKey] === (value as KeyValueOption)[valueKey]
                  );
                }
                return option === value;
              }}
              renderInput={params => {
                const {
                  autoComplete = defaultAutocompleteValue,
                  ...otherTextFieldProps
                } = textFieldProps ?? {};
                const textFieldInputProps = {
                  ...params.inputProps,
                  autoComplete
                };
                return (
                  <TextField
                    {...otherTextFieldProps}
                    {...(selectedOptions.length > 0 && {
                      placeholder: undefined
                    })}
                    {...params}
                    label={
                      !isLabelAboveFormField
                        ? (
                          <FormLabelText label={fieldLabel} required={required} />
                        )
                        : undefined
                    }
                    error={isError}
                    {...(isAboveMuiV5
                      ? {
                        slotProps: {
                          ...textFieldProps?.slotProps,
                          input: {
                            ...params?.InputProps,
                            ...textFieldProps?.slotProps?.input,
                            endAdornment: (
                              <>
                                {loading
                                  ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  )
                                  : (
                                    <></>
                                  )}
                                {params.InputProps.endAdornment}
                              </>
                            )
                          },
                          htmlInput: textFieldInputProps
                        }
                      }
                      : {
                        InputProps: {
                          ...params.InputProps,
                          ...textFieldProps?.InputProps,
                          endAdornment: (
                            <>
                              {loading && (
                                <CircularProgress color="inherit" size={20} />
                              )}
                              {params.InputProps.endAdornment}
                            </>
                          )
                        },
                        inputProps: textFieldInputProps
                      })}
                  />
                );
              }}
              renderOption={(optionProps, option) => {
                const isSelectAll = isSelectAllOption(option);
                const label = renderOptionLabel(option);
                const value = isSelectAll
                  ? selectAllOptionValue
                  : getOptionLabelOrValue(option, valueKey);
                return (
                  <Box component="li" {...optionProps}>
                    <FormControlLabel
                      label={label}
                      onClick={e => e.preventDefault()}
                      control={
                        <Checkbox
                          {...checkboxProps}
                          name={fieldName}
                          value={value}
                          checked={
                            isSelectAll
                              ? areAllSelected
                              : selectedValues.includes(value)
                          }
                          indeterminate={
                            isSelectAll ? isIndeterminate : undefined
                          }
                        />
                      }
                      sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                      {...otherFormControlLabelProps}
                    />
                  </Box>
                );
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...otherChipProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      {...otherChipProps}
                      label={renderOptionLabel(option)}
                      {...ChipProps}
                    />
                  );
                })}
              {...(isAboveMuiV5 ? { slotProps } : { ChipProps })}
              {...otherAutoCompleteProps}
            />
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFMultiAutocomplete;
