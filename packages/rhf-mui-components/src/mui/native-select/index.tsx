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
import { OptionType } from '@/types';
import {
  fieldNameToLabel,
  isKeyValueOption,
  validateArray
} from '@/utils';

type SelectValueType = string | string[] | number | number[];

export type RHFNativeSelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  defaultValue?: SelectValueType;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  onValueChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<
  NativeSelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value' | 'defaultValue'
>;

const RHFNativeSelect = <T extends FieldValues>({
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
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...otherNativeSelectProps
}: RHFNativeSelectProps<T>) => {
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

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
        onChange={event => {
          onChange(event);
          if(onValueChange) {
            onValueChange(event);
          }
        }}
      >
        {options.map(option => {
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
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default RHFNativeSelect;
