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
<<<<<<< HEAD
  isMuiV7AndAbove
=======
  useFieldIds,
  keepLabelAboveFormField
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
  Option extends StrObjOption = StrObjOption
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  labelKey?: string;
  valueKey?: string;
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
  renderOptionLabel?: (
    option: Option,
    selectAllText: string,
    state: AutocompleteRenderOptionState
  ) => ReactNode;
} & MultiAutoCompleteProps<Option>;

const RHFMultiAutocomplete = <
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption
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
  ...otherAutoCompleteProps
}: RHFMultiAutocompleteProps<T, Option>) => {
  validateArray('RHFMultiAutocomplete', options, labelKey, valueKey);

<<<<<<< HEAD
  const { allLabelsAboveFields, defaultFormControlLabelSx }
    = useContext(RHFMuiConfigContext);

  const isLabelAboveFormField = showLabelAboveFormField ?? allLabelsAboveFields;
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const selectAllOptionValue = '';
=======
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

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };
  const isError = !!errorMessage;
  const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

  const shouldHideSelectAllOptions
    = hideSelectAllOption || (options.length === 0 || options.length === 1);
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = { ...defaultFormControlLabelSx, ...sx };

  const isSelectAllOption = useCallback(
    (option: Option) => option === selectAllText,
    [selectAllText]
  );

  const getOptionLabelOrValue = useCallback(
    (option: StrObjOption, key?: string) =>
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
<<<<<<< HEAD
    [isSelectAllOption, getOptionLabelOrValue, labelKey, selectAllText]
  );

  const autoCompleteOptions: Option[] = useMemo(() => {
    return options.length <= 1
      ? options
      : [selectAllText as Option, ...options];
  }, [options, selectAllText]);

  const renderChips = useCallback(
    (value: Option[], getPropDetailsByVersions: any) =>
      value.map((option, index) => {
        const { key, ...itemProps } = getPropDetailsByVersions({ index });
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

  const isOptionEqualToValue = useCallback(
    (option: Option, value: Option) => {
      if (isSelectAllOption(option)) {
        return false;
      }
      if (valueKey && isKeyValueOption(option, labelKey, valueKey)) {
        return option[valueKey] === (value as KeyValueOption)[valueKey];
      }
      return option === value;
    },
    [isSelectAllOption, valueKey, labelKey]
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
=======
    [isSelectAllOption, selectAllText, getOptionLabelOrValue, labelKey]
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
<<<<<<< HEAD
          const selectedValues: StringArr = Array.isArray(value) ? value : [];
          const areAllSelected = selectedValues.length === options.length;
=======
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
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
          const isIndeterminate = selectedValues.length > 0 && !areAllSelected;

          const selectedOptions = useMemo(
            () =>
              selectedValues
                .map(val =>
                  options.find(op =>
                    valueKey && isKeyValueOption(op, labelKey, valueKey)
                      ? op[valueKey] === val
                      : op === val))
                .filter((op): op is Option => Boolean(op)),
            [selectedValues, options, labelKey, valueKey]
          );

          const changeFieldState = useCallback(
            (newValues: StringArr, selectedValue?: string) => {
              onChange(newValues);
              onValueChange?.(newValues, selectedValue);
            },
            [onChange, onValueChange]
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
<<<<<<< HEAD
              onChange={(_, newValue, reason, details) => {
                const valueOfClickedItem = details?.option
                  ? getOptionLabelOrValue(details.option, valueKey) === selectAllText
                    ? selectAllOptionValue
                    : getOptionLabelOrValue(details.option, valueKey)
                  : undefined;

                if (reason === 'clear') {
                  changeFieldState([], valueOfClickedItem);
                }
                /**
                 * "removeOption" reason is being called even after unchecking a checkbox.
                 * This will also be called when a remove chip. I purposely need to check
                 * that if "SelectAll" option is being removed, then the flow should not
                 * go in the if block.
                 */
                if (reason === 'removeOption' && valueOfClickedItem) {
                  const fieldValue = newValue
                    .map(op => getOptionLabelOrValue(op, valueKey))
                    .filter(op => op !== valueOfClickedItem);
                  changeFieldState(fieldValue, valueOfClickedItem);
                }
=======
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
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              limitTags={2}
<<<<<<< HEAD
              getLimitTagsText={v => `+${v} More`}
              getOptionLabel={option => displayOptionLabel(option, true)}
              isOptionEqualToValue={isOptionEqualToValue}
=======
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={option => renderOptionLabel(option, true)}
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
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
<<<<<<< HEAD
                const textFieldInputProps = { ...params.inputProps, autoComplete };
=======
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
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
                return (
                  <TextField
                    name={rhfFieldName}
                    inputRef={rhfRef}
                    disabled={paramsDisabled || rhfDisabled}
                    {...otherTextFieldProps}
<<<<<<< HEAD
                    {...params}
                    {...(selectedOptions.length > 0 && {
                      placeholder: undefined
                    })}
                    autoComplete={autoComplete}
=======
                    placeholder={
                      selectedOptions.length > 0
                        ? undefined
                        : placeholder
                    }
                    {...otherInputParams}
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
<<<<<<< HEAD
                                {loading
                                  ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  )
                                  : <></>}
                                {params.InputProps.endAdornment}
=======
                                {loading && (
                                  <CircularProgress color="inherit"
                                    size={20}
                                  />
                                )}
                                {InputProps.endAdornment}
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
<<<<<<< HEAD
                          name={fieldName}
                          value={optionValue}
=======
                          id={`${fieldName}_${value}`}
                          name={`${fieldName}_${value}`}
                          value={value}
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
