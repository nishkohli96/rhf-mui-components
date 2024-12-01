import { ReactNode, useState, useContext } from 'react';
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
  const { allLabelsAboveFields, defaultFormControlLabelSx } =
    useContext(RHFMuiConfigContext);

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

  const autoCompleteOptions = [selectAllLabel, ...options];

  const handleCheckboxChange = (
    isChecked: boolean,
    value: string | null
  ) => {
    /* The event is fired on "Select All" checkbox. */
    if (!value) {
      if (isChecked) {
        const allValues = options.map((option) =>
          isKeyValueOption(option, labelKey, valueKey)
            ? option[valueKey ?? '']
            : option
        );
        return allValues as StringArr;
      }
      return [];
    }

    /* One of the options is selected */
    return isChecked
      ? [...selectedValues, value]
      : selectedValues.filter((val) => val !== value);
  };

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
              getOptionLabel={option =>
                isKeyValueOption(option, labelKey, valueKey)
                  ? option[`${valueKey}`]
                  : option
              }
              isOptionEqualToValue={(option, value) => {
                const opnValue = isKeyValueOption(option, labelKey, valueKey)
                  ? option[`${valueKey}`]
                  : option;
                return (value as StringArr).includes(opnValue);
              }}
              renderOption={({ key, ...props }, option: OptionType) => {
                const isSelectAllOption = option === selectAllLabel;
                if (!isKeyValueOption(option, labelKey, valueKey)) {
                  const opnLabel = isSelectAllOption ? selectAllLabel : option;
                  const opnValue = isSelectAllOption
                    ? selectAllOptionValue
                    : option;
                  return (
                    <Box component="li" key={key} {...props}>
                      <FormControlLabel
                        label={opnLabel}
                        control={
                          <Checkbox
                            {...checkboxProps}
                            name={fieldName}
                            value={opnValue}
                            checked={
                              isSelectAllOption
                                ? selectedValues.length === options.length
                                : selectedValues.includes(option)
                            }
                            {...(isSelectAllOption && {
                              indeterminate:
                                selectedValues.length > 0 &&
                                selectedValues.length !== options.length
                            })}
                            onChange={event => {
                              const fieldValues = handleCheckboxChange(
                                event.target.checked,
                                event.target.value
                              );
                              changeFieldState(fieldValues);
                            }}
                          />
                        }
                        sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                        {...otherFormControlLabelProps}
                      />
                    </Box>
                  );
                }

                const opnLabel = option[`${labelKey}`];
                const opnValue = option[`${valueKey}`];
                return (
                  <Box component="li" key={key} {...props}>
                    <FormControlLabel
                      label={opnLabel}
                      control={
                        <Checkbox
                          {...checkboxProps}
                          name={fieldName}
                          value={opnValue}
                          checked={selectedValues.includes(opnValue)}
                          onChange={event => {
                            const fieldValues = handleCheckboxChange(
                              event.target.checked,
                              event.target.value
                            );
                            changeFieldState(fieldValues);
                          }}
                        />
                      }
                      sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                      {...otherFormControlLabelProps}
                    />
                  </Box>
                );
              }}
              renderInput={(params) => (
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
