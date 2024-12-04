import { ReactNode, useState, useContext, useCallback } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormLabelText, FormHelperText } from '@/mui/common';
import {
  FormLabelProps,
  FormControlLabelProps,
  CheckboxProps,
  FormHelperTextProps,
  KeyValueOption,
  StringArr,
  AutocompleteOptionType,
  AutoCompleteTextFieldProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  isMuiV6
} from '@/utils';


type AutoCompleteProps = Omit<
  AutocompleteProps<AutocompleteOptionType, true, false, false>,
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
>;

export type RHFMultiAutocompleteProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: AutocompleteOptionType[];
  labelKey?: string;
  valueKey?: string;
  selectAllText?: string;
  required?: boolean;
  onValueChange?: (
    fieldValue: StringArr,
    targetValue?: string
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  textFieldProps?: AutoCompleteTextFieldProps;
} & AutoCompleteProps;

const RHFMultiAutocomplete = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  selectAllText,
  required,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  checkboxProps,
  formControlLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  textFieldProps,
  ...otherAutoCompleteProps
}: RHFMultiAutocompleteProps<T>) => {
  validateArray('RHFMultiAutocomplete', options, labelKey, valueKey);

  const [selectedValues, setSelectedValues] = useState<StringArr>([]);
  const { allLabelsAboveFields, defaultFormControlLabelSx }
    = useContext(RHFMuiConfigContext);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };

  const isLabelAboveFormField = showLabelAboveFormField ?? allLabelsAboveFields;
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const selectAllLabel = selectAllText ?? 'Select All';
  const selectAllOptionValue = '';

  const autoCompleteOptions: AutocompleteOptionType[] = [
    selectAllLabel as AutocompleteOptionType,
    ...options,
  ];

  const isSelectAllOption = (option: AutocompleteOptionType): boolean =>
    option === selectAllLabel;

  const renderOptionLabel = (option: AutocompleteOptionType): string =>
    isSelectAllOption(option)
      ? selectAllLabel
      : labelKey && isKeyValueOption(option, labelKey, valueKey)
        ? option[labelKey]
        : (option as string);

  const handleCheckboxChange = useCallback((
    isChecked: boolean,
    value: string
  ) => {
    /* The event is fired on "Select All" checkbox. */
    if (!value || (value === selectAllOptionValue)) {
      return isChecked
        ? options.map(option =>
          valueKey && isKeyValueOption(option, labelKey, valueKey)
            ? option[valueKey]
            : option)
        : [];
    }

    /* One of the options is selected */
    return isChecked
      ? [...selectedValues, value]
      : selectedValues.filter(val => val !== value);
  }, [options, labelKey, valueKey, selectedValues]);

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
        render={({ field: { value, onChange, ...otherFieldProps } }) => {
          const selectedOptions = (value ?? []).map(val =>
            options.find(opn =>
              valueKey && isKeyValueOption(opn, labelKey, valueKey)
                ? opn[valueKey] === val
                : opn === val)).filter((opn): opn is AutocompleteOptionType => Boolean(opn));
          const changeFieldState = (
            newValue: StringArr,
            selectedValue?: string
          ) => {
            setSelectedValues(newValue);
            onChange(newValue);
            onValueChange?.(newValue, selectedValue);
          };

          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              options={autoCompleteOptions}
              value={selectedOptions}
              fullWidth
              multiple
              autoHighlight
              disableCloseOnSelect
              onChange={(_, newValue, reason, details) => {
                const valueOfClickedItem = details?.option
                  ? isKeyValueOption(details.option, labelKey, valueKey) && valueKey
                    ? details.option[valueKey]
                    : details.option
                  : undefined;
                if (reason === 'clear') {
                  changeFieldState([], valueOfClickedItem);
                }
                if (reason === 'removeOption') {
                  const fieldValue = newValue.map(opn =>
                    isKeyValueOption(opn, labelKey, valueKey) && valueKey
                      ? opn[valueKey]
                      : opn).filter(opn => opn !== valueOfClickedItem);
                  changeFieldState(fieldValue as StringArr, valueOfClickedItem);
                }
              }}
              limitTags={3}
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={option => renderOptionLabel(option)}
              isOptionEqualToValue={(option, value) => {
                if (isSelectAllOption(option)) {
                  return selectedValues.length === options.length;
                }
                if (valueKey && isKeyValueOption(option, labelKey, valueKey)) {
                  return (
                    option[valueKey] === (value as KeyValueOption)[valueKey]
                  );
                }
                return option === value;
              }}
              renderOption={({ key, ...props }, option: AutocompleteOptionType) => {
                const isSelectAll = isSelectAllOption(option);
                const label = renderOptionLabel(option);
                const value = isSelectAll
                  ? selectAllOptionValue
                  : valueKey && isKeyValueOption(option, labelKey, valueKey)
                    ? option[valueKey]
                    : (option as string);
                const allSelected = selectedValues.length === options.length;
                const isIndeterminate = selectedValues.length > 0 && !allSelected;
                return (
                  <Box component="li" key={key} {...props}>
                    <FormControlLabel
                      label={label}
                      control={
                        <Checkbox
                          {...checkboxProps}
                          name={fieldName}
                          value={value}
                          checked={
                            isSelectAll
                              ? allSelected
                              : selectedValues.includes(value)
                          }
                          indeterminate={
                            isSelectAll ? isIndeterminate : undefined
                          }
                          onChange={event =>
                            changeFieldState(
                              handleCheckboxChange(
                                event.target.checked,
                                event.target.value
                              ),
                              event.target.value
                            )}
                        />
                      }
                      sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                      {...otherFormControlLabelProps}
                    />
                  </Box>
                );
              }}
              renderInput={params => (
                <TextField
                  {...textFieldProps}
                  {...params}
                  label={
                    !isLabelAboveFormField ? (
                      <FormLabelText label={fieldLabel} required={required} />
                    ) : undefined
                  }
                  error={isError}
                  {...(isMuiV6
                    ? {
                      slotProps: {
                        htmlInput: {
                          ...params.inputProps,
                          autoComplete: fieldName
                        }
                      }
                    }
                    : {
                      inputProps: {
                        ...params.inputProps,
                        autoComplete: fieldName
                      }
                    })}
                />
              )}
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
