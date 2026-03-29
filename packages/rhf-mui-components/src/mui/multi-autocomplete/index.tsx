import { useContext, useCallback, useMemo, type ReactNode } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Autocomplete, {
  type AutocompleteRenderOptionState,
  type AutocompleteProps
} from '@mui/material/Autocomplete';
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
  defaultAutocompleteValue,
  selectAllOptionValue
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
  isAboveMuiV5,
  isMuiV7AndAbove,
  useFieldIds,
  keepLabelAboveFormField
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
  renderOptionLabel?: (
    option: Option,
    selectAllText: string,
    state: AutocompleteRenderOptionState
  ) => ReactNode;
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
  disabled: muiDisabled,
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
  renderOptionLabel,
  onBlur,
  loading,
  hideSelectAllOption,
  ...otherAutoCompleteProps
}: RHFMultiAutocompleteProps<T, Option, LabelKey, ValueKey>) => {
  validateArray('RHFMultiAutocomplete', options, labelKey, valueKey);

  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const {
    allLabelsAboveFields,
    defaultFormControlLabelSx
  } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const isError = !!errorMessage;
  const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

  const shouldHideSelectAllOptions
    = hideSelectAllOption || (options.length === 0 || options.length === 1);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };

 const autoCompleteOptions: Option[] = useMemo(() => {
    if (shouldHideSelectAllOptions) {
      return options;
    }
    return [selectAllText as Option, ...options];
  }, [options, selectAllText, shouldHideSelectAllOptions]);

   const optionsMap = useMemo(() => {
    if (!valueKey) {
      return null;
    }

    const map = new Map<Option[ValueKey], Option>();
    for (const option of options) {
      if (isKeyValueOption(option, labelKey, valueKey)) {
        map.set(option[valueKey], option);
      }
    }
    return map;
  }, [options, valueKey, labelKey]);

  const isSelectAllOption = useCallback(
    (option: Option) => option === selectAllText,
    [selectAllText]
  );

  const getOptionLabelOrValue = useCallback(
    (option: StrObjOption, key?: LabelKey | ValueKey) =>
      key && isKeyValueOption(option, labelKey, valueKey)
        ? option[key]
        : (option as string),
    [labelKey, valueKey]
  );

  const displayOptionLabel = useCallback(
    (option: Option, getSelectAllValue?: boolean) =>
      isSelectAllOption(option)
        ? getSelectAllValue
          ? selectAllOptionValue
          : selectAllText
        : getOptionLabelOrValue(option, labelKey),
    [isSelectAllOption, selectAllText, getOptionLabelOrValue, labelKey]
  );

    const renderChips = useCallback(
    (value: Option[], getProps: any) =>
      value.map((option, index) => {
        const { key, ...itemProps } = getProps({ index });
        const optionLabel = getOptionLabelOrValue(option, labelKey);
        return (
          <Chip
            key={key}
            label={optionLabel}
            variant="outlined"
            {...itemProps}
          />
        );
      }),
    [getOptionLabelOrValue, labelKey]
  );

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={{
          id: labelId,
          htmlFor: fieldId,
          ...formLabelProps
        }}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        disabled={muiDisabled}
        render={({
          field: {
            name: rhfFieldName,
            value: rhfValue,
            onChange: rhfOnChange,
            onBlur: rhfOnBlur,
            ref: rhfRef,
            disabled: rhfDisabled
          }
        }) => {
          const selectedValues: StringArr = rhfValue ?? [];
          const selectedOptions = (rhfValue ?? []).flatMap(val => {
            if (optionsMap) {
              const option = optionsMap.get(val);
              return option ? [option] : [];
            }
            const option = options.find(opn => opn === val);
            return option ? [option] : [];
          });

          const areAllSelected
            = options.length > 0
              && selectedValues.length === options.length
              && options.every(option =>
                selectedValues.includes(getOptionLabelOrValue(option, valueKey)));
          const isIndeterminate = selectedValues.length > 0 && !areAllSelected;

          const changeFieldState = useCallback(
            (newValues: StringArr, selectedValue?: string) => {
              rhfOnChange(newValues);
              onValueChange?.(newValues, selectedValue);
            },
            [rhfOnChange, onValueChange]
          );

            const handleCheckboxChange = useCallback(
    (currentValue: StringArr, optionValue: string, checked: boolean) => {
      /* When "Select All" checkbox is toggled. */
      if (!optionValue || optionValue === selectAllOptionValue) {
        return checked
          ? options.map(opt => getOptionLabelOrValue(opt, valueKey))
          : [];
      }
      /* When one of the options is selected */
      return checked
        ? [...currentValue, optionValue]
        : currentValue.filter(val => val !== optionValue);
    },
    [options, getOptionLabelOrValue, valueKey]
  );

          return (
            <Autocomplete
              id={fieldId}
              options={autoCompleteOptions}
              value={selectedOptions}
              loading={loading}
              fullWidth
              multiple
              autoHighlight
              disableCloseOnSelect
              disabled={rhfDisabled}
              onChange={(_, newSelectedOptions, reason, details) => {
                if (reason === 'clear') {
                  rhfOnChange([]);
                  onValueChange?.([]);
                  return;
                }
                const isSelectAllSelected = newSelectedOptions.some(isSelectAllOption);
                if (isSelectAllSelected) {
                  const allValues = options.map(option =>
                    getOptionLabelOrValue(option, valueKey));
                  const finalValue = areAllSelected ? [] : allValues;
                  rhfOnChange(finalValue);
                  onValueChange?.(finalValue, selectAllOptionValue);
                  return;
                }

                const clickedOption = details?.option;
                const finalValue = newSelectedOptions
                  .filter(option => !isSelectAllOption(option))
                  .map(option => getOptionLabelOrValue(option, valueKey));
                rhfOnChange(finalValue);
                onValueChange?.(
                  finalValue,
                  clickedOption
                    ? getOptionLabelOrValue(clickedOption, valueKey)
                    : undefined
                );
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              limitTags={2}
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={option => displayOptionLabel(option, true)}
              isOptionEqualToValue={(option, value) => {
                /*
                 * Select All is never stored in `value`; matching it to real values when
                 * `areAllSelected` made MUI remove the first option on the next click.
                 */
                if (isSelectAllOption(option)) {
                  return false;
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
                  InputProps,
                  inputProps,
                  disabled: paramsDisabled,
                  ...otherInputParams
                } = params ?? {};
                const {
                  autoComplete = defaultAutocompleteValue,
                  placeholder,
                  ...otherTextFieldProps
                } = textFieldProps ?? {};
                const textFieldInputProps = {
                  ...inputProps,
                  'aria-required': required,
                  'aria-invalid': isError,
                  'aria-labelledby': isLabelAboveFormField ? labelId : undefined,
                  'aria-describedby': showHelperTextElement
                    ? (isError ? errorId : helperTextId)
                    : undefined,
                  autoComplete
                };
                return (
                  <TextField
                    name={rhfFieldName}
                    inputRef={rhfRef}
                    disabled={paramsDisabled || rhfDisabled}
                    {...otherTextFieldProps}
                    placeholder={
                      selectedOptions.length > 0
                        ? undefined
                        : placeholder
                    }
                    {...otherInputParams}
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
                            ...InputProps,
                            ...textFieldProps?.slotProps?.input,
                            endAdornment: (
                              <>
                                {loading && (
                                  <CircularProgress color="inherit"
                                    size={20}
                                  />
                                )}
                                {InputProps.endAdornment}
                              </>
                            )
                          },
                          htmlInput: textFieldInputProps
                        }
                      }
                      : {
                        InputProps: {
                          ...InputProps,
                          ...textFieldProps?.InputProps,
                          endAdornment: (
                            <>
                              {loading && (
                                <CircularProgress color="inherit" size={20} />
                              )}
                              {InputProps.endAdornment}
                            </>
                          ),
                        },
                        inputProps: textFieldInputProps
                      })}
                  />
                );
              }}
              renderOption={({ key, ...optionProps }, option, state) => {
                const isSelectAll = isSelectAllOption(option);
                const optionLabel = displayOptionLabel(option);
                const optionValue = isSelectAll
                  ? selectAllOptionValue
                  : getOptionLabelOrValue(option, valueKey);
                return (
                  <Box component="li" key={key} {...optionProps}>
                    <FormControlLabel
                      label={renderOptionLabel?.(option, selectAllText, state) ?? optionLabel}
                      control={
                        <Checkbox
                          {...checkboxProps}
                          id={`${fieldName}_${optionValue}`}
                          name={`${fieldName}_${optionValue}`}
                          value={optionValue}
                          checked={
                            isSelectAll
                              ? areAllSelected
                              : selectedValues.includes(optionValue)
                          }
                          indeterminate={
                            isSelectAll ? isIndeterminate : undefined
                          }
                        />
                      }
                      sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                      onClick={e => {
                        e.preventDefault();
                        const checked = isSelectAll
                          ? !areAllSelected
                          : !selectedValues.includes(optionValue);
                        changeFieldState(
                          handleCheckboxChange(
                            selectedValues,
                            optionValue,
                            checked
                          ),
                          optionValue
                        );
                      }}
                      {...otherFormControlLabelProps}
                    />
                  </Box>
                );
              }}
              {...(isMuiV7AndAbove
                ? ({ renderValue: renderChips } as Partial<
                  AutocompleteProps<Option, true, false, false>
                >)
                : ({ renderTags: renderChips } as Partial<
                  AutocompleteProps<Option, true, false, false>
                >))}
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
        showHelperTextElement={showHelperTextElement}
        formHelperTextProps={{
          id: isError ? errorId : helperTextId,
          ...formHelperTextProps
        }}
      />
    </FormControl>
  );
};

export default RHFMultiAutocomplete;
