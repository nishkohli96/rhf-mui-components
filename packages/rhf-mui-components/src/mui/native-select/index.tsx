/**
 * TODO
 * Add showDefaultOption prop from v4
 */
import type { ReactNode, ChangeEvent } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import NativeSelect, { type NativeSelectProps } from '@mui/material/NativeSelect';
import { FormLabel, FormHelperText, defaultAutocompleteValue } from '@/common';
import type {
  FormHelperTextProps,
  FormLabelProps,
  StringOrNumber,
  StrNumObjOption,
} from '@/types';
import {
  fieldNameToLabel,
  getOptionValue,
  isKeyValueOption,
  normalizeSelectValue,
  validateArray
} from '@/utils';

type InputNativeSelectProps = Omit<
  NativeSelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value'
>;

export type RHFNativeSelectProps<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  labelKey?: LabelKey;
  valueKey?: ValueKey;
  onValueChange?: (
    value: StringOrNumber | StringOrNumber[],
    event: ChangeEvent<HTMLSelectElement>
  ) => void;
  defaultOptionText?: string;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  label?: ReactNode;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & InputNativeSelectProps;

const RHFNativeSelect = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
>({
    fieldName,
    control,
    registerOptions,
    options,
    labelKey,
    valueKey,
    onValueChange,
    defaultOptionText,
    showLabelAboveFormField,
    formLabelProps,
    label,
    required,
    helperText,
    errorMessage,
    hideErrorMessage,
    formHelperTextProps,
    sx,
    onBlur,
    autoComplete = defaultAutocompleteValue,
    placeholder,
    ...otherNativeSelectProps
  }: RHFNativeSelectProps<T, Option, LabelKey, ValueKey>) => {
  validateArray('RHFNativeSelect', options, labelKey, valueKey);

  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);
  const blankOptionText = defaultOptionText ?? placeholder ?? '';

  return (
    <FormControl fullWidth error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({
          field: { onChange, value, onBlur: rhfOnBlur, ...rest }
        }) => (
          <NativeSelect
            {...otherNativeSelectProps}
            {...rest}
            autoComplete={autoComplete}
            value={value ?? ''}
            inputProps={{
              name: fieldName,
              id: fieldName
            }}
            onChange={event => {
              const selectedValue = event.target.value;
              const normalizedValue = normalizeSelectValue(
                selectedValue,
                options,
                labelKey,
                valueKey
              );
              onChange(normalizedValue);
              onValueChange?.(normalizedValue, event);
            }}
            onBlur={blurEvent => {
              rhfOnBlur();
              onBlur?.(blurEvent);
            }}
            sx={{
              ...sx,
              '&.MuiNativeSelect-root': {
                margin: 0
              }
            }}
          >
            <option value="" disabled>
              {blankOptionText}
            </option>
            {options.map(option => {
              const isObject = isKeyValueOption(option, labelKey, valueKey);
              const opnValue = getOptionValue<Option, ValueKey>(
                option,
                valueKey
              );
              const opnLabel = isObject
                ? String(option[labelKey!])
                : String(option);
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
