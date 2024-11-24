import { Fragment, useState, useContext } from 'react';
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
import {
	FormLabelProps,
	FormHelperTextProps,
	OptionType,
	SelectProps,
	StrNumArray
} from '@/types';
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
  selectAllOptionText?: string;
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
  selectAllOptionText,
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
  const selectAllOpnValue = 'select_all';

  const [selectedValues, setSelectedValues] = useState<StrNumArray>([]);

	const getFieldValues = (isSelectAll: boolean) => {
    if (isSelectAll) {
      const allValues = options.map((option) =>
        isKeyValueOption(option, labelKey, valueKey)
          ? option[valueKey ?? '']
          : option
      );
      return allValues as StrNumArray;
    }
    return [];
  };

  const handleCheckboxChange = (isChecked: boolean, value: string | number) => {
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
        render={({ field: { value, onChange, ...otherFieldProps } }) => (
          <MuiSelect
            {...otherFieldProps}
						id={fieldName}
						labelId={isLabelAboveFormField ? undefined : fieldName}
						label={isLabelAboveFormField ? undefined : fieldLabel}
						error={isError}
            value={selectedValues}
            multiple
            renderValue={(selected: MultiSelectValueType) => selected.join(', ')}
            {...otherSelectProps}
          >
            <MenuItem value={'null'}>
              <Checkbox
                checked={selectedValues.length === options.length}
								indeterminate={selectedValues.length > 0 && selectedValues.length !== options.length}
                onChange={e => {
									const fieldValue = getFieldValues(e.target.checked);
									setSelectedValues(fieldValue);
									onChange(fieldValue);
								}}
              />
              <ListItemText primary={selectAllOptionText ?? 'Select All'} />
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
                    onChange={event => {
											const fieldValue = handleCheckboxChange(event.target.checked, opnValue);
											setSelectedValues(fieldValue);
											onChange(fieldValue);
										}}
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

