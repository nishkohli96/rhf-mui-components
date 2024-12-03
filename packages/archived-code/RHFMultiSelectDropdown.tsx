import { Fragment, ReactNode, useState, useContext } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
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

type SelectInputProps = Omit<SelectProps, 'multiple' | 'renderValue'>;

export type RHFMultiAutocompleteProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  selectAllText?: string;
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
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  renderValue,
  ...otherSelectProps
}: RHFMultiAutocompleteProps<T>) => {
  validateArray('RHFMultiAutocomplete', options, labelKey, valueKey);

  const [selectedValues, setSelectedValues] = useState<StrNumArray>([]);
  const { allLabelsAboveFields, defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);

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

  const handleCheckboxChange = (
    isChecked: boolean,
    value: StringOrNumber | null
  ) => {
    /* The event is fired on "Select All" checkbox. */
    if (!value) {
      if (isChecked) {
        const allValues = options.map(option =>
          isKeyValueOption(option, labelKey, valueKey)
            ? option[valueKey ?? '']
            : option);
        return allValues as StrNumArray;
      }
      return [];
    }

    /* One of the options is selected */
    return isChecked
      ? [...selectedValues, value]
      : selectedValues.filter(val => val !== value);
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
          <InputLabel id={fieldName}>
            {fieldLabel}
          </InputLabel>
        )}
      </Fragment>
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, ...otherFieldProps } }) => {
          const onCheckboxSelected = (
            isChecked: boolean,
            value: StringOrNumber
          ) => {
            const numericValue = typeof value === 'string' && !isNaN(Number(value))
              ? Number(value)
              : value;
            const targetValue = numericValue === selectAllOptionValue ? null : numericValue;            
            const fieldValue = handleCheckboxChange(isChecked, targetValue);

            setSelectedValues(fieldValue);
            onChange(fieldValue);
            onValueChange?.(targetValue, fieldValue);
          };

          return (
            <Select
              {...otherFieldProps}
              id={fieldName}
              labelId={isLabelAboveFormField ? undefined : fieldName}
              label={isLabelAboveFormField ? undefined : fieldLabel}
              error={isError}
              value={selectedValues}
              multiple
              renderValue={(selectValues: StrNumArray) => {
                return (
                  <Fragment>
                    {renderValue ? renderValue(selectValues) : selectValues.join(', ')}
                  </Fragment>
                );
              }}
              {...otherSelectProps}
            >
              <MenuItem value={selectAllOptionValue}>
                <FormControlLabel
                  label={selectAllLabel}
                  control={
                    <Checkbox
                      {...checkboxProps}
                      name={fieldName}
                      value={selectAllOptionValue}
                      checked={selectedValues.length === options.length}
                      indeterminate={
                        selectedValues.length > 0
                        && selectedValues.length !== options.length
                      }
                      onChange={event => onCheckboxSelected(
                        event.target.checked,
                        event.target.value
                      )}
                    />
                  }
                  sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                  {...otherFormControlLabelProps}
                />
              </MenuItem>

              {options.map(option => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = isObject
                  ? `${option[valueKey ?? '']}`
                  : option;
                const opnLabel = isObject
                  ? `${option[labelKey ?? '']}`
                  : option;
                const isChecked = selectedValues.includes(opnValue);
                return (
                  <MenuItem key={opnValue} value={opnValue}>
                    <FormControlLabel
                      label={opnLabel}
                      control={
                        <Checkbox
                          {...checkboxProps}
                          name={fieldName}
                          value={opnValue}
                          checked={isChecked}
                          onChange={event => onCheckboxSelected(
                            event.target.checked,
                            event.target.value
                          )}
                        />
                      }
                      sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                      {...otherFormControlLabelProps}
                    />
                  </MenuItem>
                );
              })}
            </Select>
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
