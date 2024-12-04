import { ReactNode, ChangeEvent } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect, { NativeSelectProps } from '@mui/material/NativeSelect';
import { FormLabelText, FormHelperText } from '@/mui/common';
import { FormHelperTextProps, OptionType } from '@/types';
import {
  fieldNameToLabel,
  isKeyValueOption,
  validateArray
} from '@/utils';

type InputNativeSelectProps = Omit<
  NativeSelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value'
>;

export type RHFNativeSelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  onValueChange?: (value: OptionType, event: ChangeEvent<HTMLSelectElement>) => void;
  label?: ReactNode;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & InputNativeSelectProps;

const RHFNativeSelect = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  onValueChange,
  label,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  required,
  ...otherNativeSelectProps
}: RHFNativeSelectProps<T>) => {
  validateArray('RHFNativeSelect', options, labelKey, valueKey);

  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const SelectFormLabel = <FormLabelText label={fieldLabel} required={required} />;
  const isError = Boolean(errorMessage);

  return (
    <FormControl fullWidth error={isError}>
      <InputLabel variant="standard" htmlFor={fieldName} error={isError}>
        {SelectFormLabel}
      </InputLabel>
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value, ...rest } }) => (
          <NativeSelect
            {...otherNativeSelectProps}
            {...rest}
            value={value ?? ''}
            inputProps={{
              name: fieldName,
              id: fieldName
            }}
            onChange={event => {
              onChange(event.target.value);
              if (onValueChange) {
                onValueChange(event.target.value, event);
              }
            }}
          >
            <option value="" disabled >
              {''}
            </option>
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

export default RHFNativeSelect;
