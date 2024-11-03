import { useContext, Fragment, ReactNode } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues,
} from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import { FormLabelProps } from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import MuiSelect, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { OptionType } from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  keepLabelAboveFormField,
} from '@/utils';
import { FormControl, FormLabel, FormHelperText } from '../common';

type SelectValueType = OptionType | OptionType[];

type SelectInputProps =  Omit<SelectProps,
  | 'name'
	| 'id'
	| 'labelId'
	| 'error'
	| 'onChange'
	| 'value'
	| 'defaultValue'
>;

export type RHFSelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  defaultValue?: SelectValueType;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  onValueChange?: (e: SelectChangeEvent<SelectValueType>) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & SelectInputProps;

const RHFSelect = <T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  options,
  labelKey,
  valueKey,
  defaultValue,
  showDefaultOption,
  defaultOptionText,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  multiple,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...otherSelectProps
}: RHFSelectProps<T>) => {
  const { allLabelsAboveFormField } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFormField
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const { onChange, ...rest } = register(fieldName, registerOptions);
  validateArray('RHFSelect', options, labelKey, valueKey);

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
      <MuiSelect
        id={fieldName}
        labelId={isLabelAboveFormField ? undefined : fieldName}
        label={isLabelAboveFormField ? undefined : fieldName}
        defaultValue={defaultValue ?? ( multiple ? [] : '')}
        error={isError}
        multiple={multiple}
        onChange={e => {
          onChange(e);
          if(onValueChange) {
            onValueChange(e);
          }
        }}
        {...otherSelectProps}
        {...rest}
      >
        <MenuItem
          value=""
          disabled
          sx={{ display: showDefaultOption ? 'block' : 'none' }}
        >
          {showDefaultOption ? defaultOptionText ?? `Select ${fieldLabel}` : ''}
        </MenuItem>
        {options.map(option => {
          const isObject = isKeyValueOption(option, labelKey, valueKey);
          const opnValue = isObject ? `${option[valueKey ?? '']}` : option;
          const opnLabel = isObject ? `${option[labelKey ?? '']}` : option;
          return (
            <MenuItem key={opnValue} value={opnValue}>
              {opnLabel}
            </MenuItem>
          );
        })}
      </MuiSelect>
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
}

export default RHFSelect;
