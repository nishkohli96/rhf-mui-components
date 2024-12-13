import { ReactNode, useState, useContext, useCallback, useMemo } from 'react';
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
  AutoCompleteTextFieldProps,
  MuiChipProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  isAboveMuiV5
} from '@/utils';

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
  | 'ChipProps'
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
  ChipProps?: MuiChipProps;
} & AutoCompleteProps;

const RHFMultiAutocomplete = <T extends FieldValues>({
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

  const selectAllOptionValue = '';
  const areAllSelected = selectedValues.length === options.length;
  const isIndeterminate = selectedValues.length > 0 && !areAllSelected;

  const autoCompleteOptions: StrObjOption[] = useMemo(
    () => [selectAllText, ...options],
    [options, selectAllText]
  );

  const isSelectAllOption = useCallback(
    (option: StrObjOption) => {
      return option === selectAllText || option === selectAllOptionValue;
    },
    [selectAllText, selectAllOptionValue]
  );

  const getOptionLabelOrValue = useCallback(
    (option: StrObjOption, key?: string): string => {
      return key && isKeyValueOption(option, labelKey, valueKey)
        ? option[key]
        : (option as string);
    },
    [labelKey, valueKey]
  );

  const renderOptionLabel = (option: StrObjOption): string =>
    isSelectAllOption(option)
      ? selectAllText
      : getOptionLabelOrValue(option, labelKey);

  const handleCheckboxChange = useCallback((
    isChecked: boolean,
    value: string
  ) => {
    /* When "Select All" checkbox is toggled. */
    if (!value || isSelectAllOption(value)) {
      return isChecked
        ? options.map(option => getOptionLabelOrValue(option, valueKey))
        : [];
    }

    /* When one of the options is selected */
    return isChecked
      ? [...selectedValues, value]
      : selectedValues.filter(val => val !== value);
  }, [options, getOptionLabelOrValue, valueKey, selectedValues, isSelectAllOption]);

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
          const selectedOptions = (value ?? [])
            .map(val =>
              options.find(opn =>
                valueKey && isKeyValueOption(opn, labelKey, valueKey)
                  ? opn[valueKey] === val
                  : opn === val))
            .filter((opn): opn is StrObjOption => Boolean(opn));

          const changeFieldState = (
            newValue: StringArr,
            selectedValue?: string
          ) => {
            onChange(newValue);
            setSelectedValues(newValue);
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
                    .map(opn => getOptionLabelOrValue(opn, valueKey))
                    .filter(opn => opn !== valueOfClickedItem);
                  changeFieldState(fieldValue, valueOfClickedItem);
                }
              }}
              limitTags={2}
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={option => renderOptionLabel(option)}
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
                  : getOptionLabelOrValue(option, valueKey);
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
                              ? areAllSelected
                              : selectedValues.includes(value)
                          }
                          indeterminate={
                            isSelectAll ? isIndeterminate : undefined
                          }
                        />
                      }
                      sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                      onClick={event => {
                        event.preventDefault();
                        const isChecked = isSelectAll ? !areAllSelected
                          : !selectedValues.includes(value);
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
