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
import Chip from '@mui/material/Chip';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormLabelText, FormHelperText } from '@/mui/common';
import {
  FormLabelProps,
  FormControlLabelProps,
  CheckboxProps,
  FormHelperTextProps,
  KeyValueOption,
  StringArr,
  StrObjOption,
  AutoCompleteTextFieldProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  isAboveMuiV5
} from '@/utils';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type AutoCompleteProps = Omit<
  AutocompleteProps<StrObjOption, true, false, false>,
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
  options: StrObjOption[];
  labelKey?: string;
  valueKey?: string;
  selectAllText?: string;
  onValueChange?: (
    fieldValue: StringArr,
    targetValue?: string
  ) => void;
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
} & AutoCompleteProps;

const RHFMultiAutocomplete = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  selectAllText,
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

  const autoCompleteOptions: StrObjOption[] = [
    selectAllLabel as StrObjOption,
    ...options,
  ];

  const isSelectAllOption = (option: StrObjOption): boolean =>
    option === selectAllLabel;

  const renderOptionLabel = (option: StrObjOption): string =>
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

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
                : opn === val)).filter((opn): opn is StrObjOption => Boolean(opn));
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
              limitTags={2}
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
              renderInput={params => {
                const textFieldInputProps = {
                  ...params.inputProps,
                  autoComplete: fieldName
                };
                return (
                  <TextField
                    {...textFieldProps}
                    {...params}
                    label={
                      !isLabelAboveFormField ? (
                        <FormLabelText label={fieldLabel} required={required} />
                      ) : undefined
                    }
                    error={isError}
                    {...(isAboveMuiV5
                      && {
                        slotProps: {
                          htmlInput: textFieldInputProps,
                        }
                      }
                    )}
                  />
                );
              }}
              renderOption={({ key, ...optionProps }, option) => {
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
                  <Box component="li" key={key} {...optionProps}>
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
                        />
                      }
                      sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                      onClick={() => {
                        const isChecked = !selectedValues.includes(value);
                        changeFieldState(
                          handleCheckboxChange(isChecked, value),
                          value
                        );
                      }}
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
              {...(isAboveMuiV5
                ? { slotProps }
                : { ChipProps }
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
