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
<<<<<<< HEAD
import { fieldNameToLabel, keepLabelAboveFormField, mergeRefs } from '@/utils';
=======
import { fieldNameToLabel, keepLabelAboveFormField, useFieldIds } from '@/utils';
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d

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

<<<<<<< HEAD
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
=======
const RHFTextField = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
  autoComplete = defaultAutocompleteValue,
  ...rest
}: RHFTextFieldProps<T>) => {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = !!errorMessage;
  const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

  const { errors } = useFormState({
    control,
    name: fieldName
  });
  const rhfError = get(errors, fieldName);
  const fieldErrorMessage = rhfError?.message?.toString() ?? errorMessage;
  const isError = !!rhfError || !!errorMessage;

  return (
    <FormControl error={isError}>
<<<<<<< HEAD
      {!hideLabel && (
        <FormLabel
          label={fieldLabel}
          isVisible={isLabelAboveFormField}
          required={required}
          error={isError}
          formLabelProps={formLabelProps}
        />
      )}
=======
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={{
          id: labelId,
          htmlFor: fieldId,
          ...formLabelProps
        }}
      />
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
<<<<<<< HEAD
        render={({ field }) => {
          const {
            value,
            onChange,
            onBlur: rhfOnBlur,
            ref: rhfRef,
            ...otherFieldParams
          } = field;
=======
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
        }) => {
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
          return (
            <MuiTextField
              id={fieldId}
              name={rhfFieldName}
              inputRef={rhfRef}
              autoComplete={autoComplete}
              label={
                !hideLabel && !isLabelAboveFormField && (
                  <FormLabelText label={fieldLabel} required={required} />
                )
              }
              value={rhfValue ?? ''}
              disabled={rhfDisabled}
              onChange={event => {
<<<<<<< HEAD
                if (customOnChange) {
                  customOnChange(onChange, event.target.value, event);
                  return;
                }
                onChange(event.target.value);
                onValueChange?.(event.target.value, event);
=======
                const newValue = event.target.value;
                rhfOnChange(newValue);
                onValueChange?.(newValue, event);
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              error={isError}
<<<<<<< HEAD
              inputRef={mergeRefs(rhfRef, ref)}
=======
              aria-labelledby={isLabelAboveFormField ? labelId : undefined}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              aria-required={required}
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
              {...rest}
            />
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={fieldErrorMessage}
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
}) as <T extends FieldValues>(
  props: RHFTextFieldProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFTextField;
