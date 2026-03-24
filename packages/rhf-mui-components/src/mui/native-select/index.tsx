'use client';

import { type ReactNode, type ChangeEvent } from 'react';
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
  validateArray,
  useFieldIds
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
  disabled: muiDisabled,
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

  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = !!errorMessage;
  const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);
  const blankOptionText = defaultOptionText ?? placeholder ?? '';

  return (
    <FormControl fullWidth error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        required={required}
        error={isError}
        formLabelProps={{
          id: labelId,
          htmlFor: fieldId,
          ...formLabelProps
        }}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        disabled={muiDisabled}
        render={({
          field: {
            name: rhfFieldName,
            value: rhfValue,
            onChange: rhfOnChange,
            onBlur: rhfOnBlur,
            ref: rhfRef,
            disabled: rhfDisabled
          }
        }) => (
          <NativeSelect
            id={fieldId}
            name={rhfFieldName}
            autoComplete={autoComplete}
            aria-required={required}
            aria-invalid={isError}
            aria-describedby={
              showHelperTextElement
                ? (isError ? errorId : helperTextId)
                : undefined
            }
            value={rhfValue ?? ''}
            inputRef={rhfRef}
            disabled={rhfDisabled}
            onChange={event => {
              const selectedValue = event.target.value;
              const normalizedValue = normalizeSelectValue(
                selectedValue,
                options,
                labelKey,
                valueKey
              );
              rhfOnChange(normalizedValue);
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
            {...otherNativeSelectProps}
          >
            <option value="" disabled={required}>
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
        showHelperTextElement={showHelperTextElement}
        formHelperTextProps={{
          id: isError ? errorId : helperTextId,
          ...formHelperTextProps
        }}
      />
    </FormControl>
  );
};

export default RHFNativeSelect;
