import { ReactNode, ChangeEvent } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues
} from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect, { NativeSelectProps } from '@mui/material/NativeSelect';
import FormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText';
import { OptionType } from '../../../types';
import {
  fieldNameToLabel,
  isKeyValueOption,
  validateArray
} from '../../../utils';

type SelectValueType = string | string[] | number | number[];

export type RHFNativeSelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  defaultValue?: SelectValueType;
  label?: ReactNode;
  onValueChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  errorMsg?: ReactNode;
  hideErrorMsg?: boolean;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<
  NativeSelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value' | 'defaultValue'
>;

export function RHFNativeSelect<T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  options,
  labelKey,
  valueKey,
  defaultValue,
  onValueChange,
  formHelperTextProps,
  errorMsg,
  hideErrorMsg,
  showDefaultOption,
  defaultOptionText,
  label,
  ...otherNativeSelectProps
}: RHFNativeSelectProps<T>) {
  const isError = Boolean(errorMsg);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const { onChange, ...rest } = register(fieldName, registerOptions);
  validateArray('RHFNativeSelect', options, labelKey, valueKey);

  return (
    <FormControl fullWidth error={isError}>
      <InputLabel variant="standard" htmlFor={fieldName}>
        {fieldLabel}
      </InputLabel>
      <NativeSelect
        {...otherNativeSelectProps}
        {...rest}
        defaultValue={defaultValue ?? ''}
        inputProps={{
          name: fieldName,
          id: fieldName
        }}
        onChange={(e) => {
          onChange(e);
          onValueChange && onValueChange(e);
        }}
      >
        {options.map((option) => {
          const isObject = isKeyValueOption(option, labelKey, valueKey);
          const opnValue = isObject ? `${option[valueKey ?? '']}` : option;
          const opnLabel = isObject ? `${option[labelKey ?? '']}` : option;
          return (
            <option key={opnValue} value={opnValue}>
              {opnLabel}
            </option>
          );
        })}
      </NativeSelect>
      {isError && (
        <FormHelperText
          error={isError}
          sx={formHelperTextProps?.sx ?? { ml: 0 }}
        >
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
}
