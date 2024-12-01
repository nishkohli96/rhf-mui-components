import { ReactNode, useState, useContext, useCallback } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Autocomplete, {
  AutocompleteProps,
  AutocompleteChangeDetails,
  AutocompleteChangeReason
} from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import {
  FormLabelProps,
  FormControlLabelProps,
  CheckboxProps,
  FormHelperTextProps,
  KeyValueOption
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  isMuiV6
} from '@/utils';

type OptionType = string | KeyValueOption;
type StringArr = string[];

type AutoCompleteProps = Omit<
  AutocompleteProps<OptionType, true, false, false>,
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

type AutoCompleteTextFieldProps = Omit<
  TextFieldProps,
  | 'value'
  | 'onChange'
  | 'disabled'
  | 'inputProps'
  | 'slotProps'
  | 'label'
  | 'error'
>;

export type RHFMultiSelectDropdownProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  selectAllOptionText?: string;
  onValueChange?: (
    targetValue: string | null,
    fieldValue: StringArr
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

const RHFMultiSelectDropdown = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  selectAllOptionText,
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
}: RHFMultiSelectDropdownProps<T>) => {
  validateArray('RHFMultiSelectDropdown', options, labelKey, valueKey);

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

  const selectAllLabel = selectAllOptionText ?? 'Select All';
  const selectAllOptionValue = '';

  const autoCompleteOptions: OptionType[] = [
    selectAllLabel as OptionType,
    ...options,
  ];

  const isSelectAllOption = (option: OptionType): boolean =>
    option === selectAllLabel;

  const renderOptionLabel = (option: OptionType): string =>
    isSelectAllOption(option)
      ? selectAllLabel
      : valueKey && isKeyValueOption(option, labelKey, valueKey)
        ? option[valueKey]
        : (option as string);

  const handleCheckboxChange = useCallback((
    isChecked: boolean,
    value: string | null
  ) => {
    /* The event is fired on "Select All" checkbox. */
    if (!value) {
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
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, ...otherFieldProps } }) => {
          const changeFieldState = (newValue: StringArr) => {
            setSelectedValues(newValue);
            onChange(newValue);
            // onValueChange(newValue)
          };

          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              options={autoCompleteOptions}
              value={selectedValues}
              fullWidth
              multiple
              autoHighlight
              disableCloseOnSelect
              onChange={(_, newValue, reason) => {
                if (reason === 'clear') {
                  changeFieldState([]);
                }
                if (reason === 'removeOption') {
                  changeFieldState(newValue as StringArr);
                }
              }}
              limitTags={3}
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={option => renderOptionLabel(option)}
              isOptionEqualToValue={(option, value) => {
                if (isSelectAllOption(option)) {
                  return selectedValues.length === options.length;
                }
                const opnValue = valueKey && isKeyValueOption(option, labelKey, valueKey)
                  ? option[valueKey]
                  : option;
                return (value as StringArr).includes(opnValue);
              }}
              renderOption={({ key, ...props }, option: OptionType) => {
                const isSelectAll = isSelectAllOption(option);
                const label = renderOptionLabel(option);
                const value = isSelectAll ? selectAllOptionValue : renderOptionLabel(option);
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
                          checked={isSelectAll ? allSelected : selectedValues.includes(value)}
                          indeterminate={isSelectAll ? isIndeterminate : undefined}
                          onChange={event => {
                            changeFieldState(
                              handleCheckboxChange(
                                event.target.checked,
                                event.target.value
                              )
                            );
                          }}
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
                  label={!isLabelAboveFormField ? fieldLabel : undefined}
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

export default RHFMultiSelectDropdown;
