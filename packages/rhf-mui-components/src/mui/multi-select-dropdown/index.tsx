import { useState, useContext } from 'react';
import {
	FieldValues,
	Path,
	Controller,
	Control,
	RegisterOptions
} from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { SelectChangeEvent }  from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps, OptionType, SelectProps } from '@/types';
import { fieldNameToLabel, validateArray, isKeyValueOption } from '@/utils';

type MultiSelectValueType = OptionType[];

type SelectInputProps = Omit<
  SelectProps,
  | 'multiple'
>;

export type RHFMultiSelectDropdownProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  onValueChange?: (
    newValue: MultiSelectValueType,
    event: React.ChangeEvent<{ value: unknown }>
  ) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: React.ReactNode;
  errorMessage?: React.ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & SelectInputProps;

const RHFMultiSelectDropdown = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  showDefaultOption,
  defaultOptionText,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...otherSelectProps
}: RHFMultiSelectDropdownProps<T>) => {
  validateArray('RHFMultiSelectDropdown', options, labelKey, valueKey);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = showLabelAboveFormField ?? allLabelsAboveFields;
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const [selectedValues, setSelectedValues] = useState<MultiSelectValueType>([]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
			setSelectedValues([]);
      // const allValues = options.map(option => (isKeyValueOption(option, labelKey, valueKey) ? option[valueKey ?? ''] : option));
      // setSelectedValues(allValues);
      // if (onValueChange) onValueChange(allValues as MultiSelectValueType, event);
    } else {
      setSelectedValues(options);
      // if (onValueChange) onValueChange([], event);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, value: OptionType) => {
    const updatedValues = event.target.checked
      ? [...selectedValues, value]
      : selectedValues.filter(val => val !== value);

    setSelectedValues(updatedValues);
    if (onValueChange) onValueChange(updatedValues as MultiSelectValueType, event);
  };

  return (
    <FormControl error={isError}>
      <FormLabel label={fieldLabel} isVisible={isLabelAboveFormField} error={isError} formLabelProps={formLabelProps} />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { value, onChange, ...otherFieldProps } }) => (
          <MuiSelect
            {...otherFieldProps}
            value={selectedValues}
            onChange={onChange}
            multiple
            renderValue={(selected: MultiSelectValueType) => selected.join(', ')}
            {...otherSelectProps}
          >
            <MenuItem>
              <Checkbox
                checked={selectedValues.length === options.length}
								indeterminate={selectedValues.length > 0 && selectedValues.length !== options.length}
                onChange={handleSelectAll}
              />
              <ListItemText primary="Select All" />
            </MenuItem>
            {options.map(option => {
							const isObject = isKeyValueOption(option, labelKey, valueKey);
							const opnValue = isObject ? `${option[valueKey ?? '']}` : option;
							const opnLabel = isObject ? `${option[labelKey ?? '']}` : option;
              const isChecked = selectedValues.includes(opnValue);
              return (
                <MenuItem key={opnValue} value={opnValue}>
                  <Checkbox
                    checked={isChecked}
                    onChange={event => handleCheckboxChange(event, opnValue)}
                  />
                  <ListItemText primary={opnLabel} />
                </MenuItem>
              );
            })}
          </MuiSelect>
        )}
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
