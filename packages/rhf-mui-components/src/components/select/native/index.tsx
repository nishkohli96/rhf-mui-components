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
import FormHelperText, { FormHelperTextProps }  from '@mui/material/FormHelperText';
import { fieldNameToLabel } from '../../../utils';

type SelectValueType = string | string[] | number | number[];

export type RHFNativeSelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  options: string[] | number[];
  defaultValue: SelectValueType;
  registerOptions?: RegisterOptions;
  label?: ReactNode;
  onValueChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
  errorMsg?: ReactNode;
  hideErrorMsg?: boolean;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
} & Omit<
  NativeSelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value' | 'defaultValue'
>;

export function RHFNativeSelect<T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  options,
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

  return (
      <FormControl fullWidth error={isError}>
        <InputLabel variant="standard" htmlFor={fieldName}>
          {fieldLabel}
        </InputLabel>
        <NativeSelect
          {...otherNativeSelectProps}
          {...rest}
          defaultValue={defaultValue}
          inputProps={{
            name: fieldName,
            id: fieldName,
          }}
          onChange={(e) => {
            onChange(e);
            onValueChange && onValueChange(e);
          }}
        >
          {options.map(opn => (
            <option key={opn} value={opn}>{opn}</option>
          ))}
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
