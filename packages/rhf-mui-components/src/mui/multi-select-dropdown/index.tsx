import { Fragment, ReactNode, useState, useContext } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import Autocomplete, {
  AutocompleteProps,
  AutocompleteChangeDetails,
  AutocompleteChangeReason
} from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import {
  FormLabelProps,
  FormControlLabelProps,
  CheckboxProps,
  FormHelperTextProps,
  OptionType,
  SelectProps,
  StringOrNumber,
  StrNumArray
} from '@/types';
import { fieldNameToLabel, validateArray, isKeyValueOption } from '@/utils';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

type AutoCompleteProps = Omit<
  AutocompleteProps<OptionType, true, false, false>,
  | 'freeSolo'
  | 'fullWidth'
  | 'renderInput'
  | 'renderOption'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
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

type SelectInputProps = Omit<SelectProps, 'multiple' | 'renderValue'>;

export type RHFMultiSelectDropdownProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  selectAllOptionText?: string;
  onValueChange?: (
    targetValue: StringOrNumber | null,
    fieldValue: StrNumArray
  ) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  renderValue?: (value: StrNumArray) => ReactNode;
} & SelectInputProps;

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
  renderValue,
  ...otherSelectProps
}: RHFMultiSelectDropdownProps<T>) => {
  validateArray('RHFMultiSelectDropdown', options, labelKey, valueKey);

  const [selectedValues, setSelectedValues] = useState<StrNumArray>([]);
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

  const autoCompleteOptions = [
    selectAllLabel,
    ...options
  ];

  const handleCheckboxChange = (
    isChecked: boolean,
    value: StringOrNumber | null
  ) => {
    console.log('-- Selctd value: ', value);
    /* The event is fired on "Select All" checkbox. */
    if (!value || (value === selectAllLabel)) {
      if (isChecked) {
        const allValues = options.map((option) =>
          isKeyValueOption(option, labelKey, valueKey)
            ? option[valueKey ?? '']
            : option
        );
        return allValues as StrNumArray;
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
      <Fragment>
        {!isLabelAboveFormField && (
          <InputLabel id={fieldName}>{fieldLabel}</InputLabel>
        )}
      </Fragment>
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { value, onChange, ...otherFieldProps } }) => {
          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              fullWidth
              options={autoCompleteOptions}
              value={selectedValues}
              multiple={true}
              autoHighlight
              disableCloseOnSelect
              onChange={(_, newValue, reason) => {
                if (reason === 'clear') {
                  setSelectedValues([]);
                  onChange([]);
                }
                if(reason === 'removeOption') {
                  setSelectedValues(newValue as StrNumArray);
                  onChange(newValue);
                }
              }}
              // disabled={disabled}
              limitTags={2}
              getOptionLabel={(option: OptionType) =>  {
                return isKeyValueOption(option, labelKey, valueKey) ? option[`${valueKey}`] : option
              }}
              isOptionEqualToValue={(option, value) => {
                // console.log('295 value: ', value);
                // return isKeyValueOption(option, labelKey, valueKey)
                //   ? // @ts-ignore
                //     option[`${valueKey}`] === value[`${valueKey}`]
                //   : option === value;
                const opnValue = isKeyValueOption(option, labelKey, valueKey)
                  ? option[`${valueKey}`]
                  : option;
                return (value as StrNumArray).includes(opnValue);
              }}
              renderOption={({ key, ...props }, option: OptionType) => {
                //console.log('option: ', option);
                const isObject = isKeyValueOption(option as OptionType, labelKey, valueKey);
                const isSelectAllOption = option === selectAllLabel;

                const opnLabel =
                  typeof option === 'object'
                    ? option[`${labelKey}`]
                    : isSelectAllOption
                    ? selectAllLabel
                    : option;
                const opnValue =
                  typeof option === 'object'
                    ? option[`${valueKey}`]
                    : isSelectAllOption
                    ? selectAllOptionValue
                    : option;

                if (!isObject) {
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
                                : selectedValues.includes(option as any)
                            }
                            {...(isSelectAllOption && {
                              indeterminate:
                                selectedValues.length > 0 &&
                                selectedValues.length !== options.length
                            })}
                            onChange={(event) => {
                              const fieldValues = handleCheckboxChange(
                                event.target.checked,
                                event.target.value
                              );
                              console.log('fieldValues: ', fieldValues);
                              onChange(fieldValues);
                              setSelectedValues(fieldValues);
                            }}
                          />
                        }
                        sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                        {...otherFormControlLabelProps}
                      />
                    </Box>
                  );
                }
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
                          onChange={(event) => {
                            const fieldValues = handleCheckboxChange(
                              event.target.checked,
                              event.target.value
                            );
                            console.log('fieldValues: ', fieldValues);
                            setSelectedValues(fieldValues);
                            onChange(fieldValues);
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
                  // {...textFieldProps}
                  {...params}
                  label={!isLabelAboveFormField ? fieldLabel : undefined}
                  error={isError}
                  // {...(isMuiV6
                  //   ? {
                  //       slotProps: {
                  //         htmlInput: {
                  //           ...params.inputProps,
                  //           autoComplete: fieldName
                  //         }
                  //       }
                  //     }
                  //   : {
                  //       inputProps: {
                  //         ...params.inputProps,
                  //         autoComplete: fieldName
                  //       }
                  //     })}
                />
              )}
              // {...otherAutoCompleteProps}
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
