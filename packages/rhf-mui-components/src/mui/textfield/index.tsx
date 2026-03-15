'use client';

import { useContext, forwardRef, type ReactNode, type ChangeEvent, type Ref, type JSX } from 'react';
import {
  Controller,
  get,
  useFormState,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MuiTextField from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue
} from '@/common';
import type { FormLabelProps, FormHelperTextProps, TextFieldProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField, mergeRefs } from '@/utils';

export type RHFTextFieldProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  customOnChange?: (
    rhfOnChange: (value: string) => void,
    newValue: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onValueChange?: (
    value: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & TextFieldProps;

const RHFTextField = forwardRef(function RHFTextField<
  T extends FieldValues
>(
  {
    fieldName,
    control,
    registerOptions,
    customOnChange,
    onValueChange,
    label,
    showLabelAboveFormField,
    hideLabel,
    formLabelProps,
    required,
    helperText,
    errorMessage,
    hideErrorMessage,
    formHelperTextProps,
    onBlur,
    autoComplete = defaultAutocompleteValue,
    ...rest
  }: RHFTextFieldProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  const { errors } = useFormState({
    control,
    name: fieldName
  });
  const rhfError = get(errors, fieldName);
  const fieldErrorMessage = rhfError?.message?.toString() ?? errorMessage;
  const isError = !!rhfError || !!errorMessage;

  return (
    <FormControl error={isError}>
      {!hideLabel && (
        <FormLabel
          label={fieldLabel}
          isVisible={isLabelAboveFormField}
          required={required}
          error={isError}
          formLabelProps={formLabelProps}
        />
      )}
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field }) => {
          const {
            value,
            onChange,
            onBlur: rhfOnBlur,
            ref: rhfRef,
            ...otherFieldParams
          } = field;
          return (
            <MuiTextField
              id={fieldName}
              autoComplete={autoComplete}
              label={
                !hideLabel && !isLabelAboveFormField && (
                  <FormLabelText label={fieldLabel} required={required} />
                )
              }
              value={value ?? ''}
              onChange={event => {
                if (customOnChange) {
                  customOnChange(onChange, event.target.value, event);
                  return;
                }
                onChange(event.target.value);
                onValueChange?.(event.target.value, event);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              error={isError}
              inputRef={mergeRefs(rhfRef, ref)}
              {...rest}
              {...otherFieldParams}
            />
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={fieldErrorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
}) as <T extends FieldValues>(
  props: RHFTextFieldProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFTextField;
