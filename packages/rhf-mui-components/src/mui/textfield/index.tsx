'use client';

import {
  useContext,
  forwardRef,
  type ReactNode,
  type ChangeEvent,
  type Ref,
  type JSX
} from 'react';
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
import type {
  FormLabelProps,
  FormHelperTextProps,
  TextFieldProps
} from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  mergeRefs,
  useFieldIds
} from '@/utils';

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
    disabled: muiDisabled,
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
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const { errors } = useFormState({
    control,
    name: fieldName
  });
  const rhfError = get(errors, fieldName);
  const fieldErrorMessage = rhfError?.message?.toString() ?? errorMessage;
  const isError = !!rhfError || !!errorMessage;
  const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

  return (
    <FormControl error={isError}>
      {!hideLabel && (
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
      )}
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
        }) => {
          return (
            <MuiTextField
              id={fieldId}
              name={rhfFieldName}
              inputRef={mergeRefs(rhfRef, ref)}
              autoComplete={autoComplete}
              label={
                !hideLabel &&
                !isLabelAboveFormField && (
                  <FormLabelText label={fieldLabel} required={required} />
                )
              }
              value={rhfValue ?? ''}
              disabled={rhfDisabled}
              onChange={event => {
                const newValue = event.target.value;
                if (customOnChange) {
                  customOnChange(rhfOnChange, newValue, event);
                  return;
                }
                rhfOnChange(newValue);
                onValueChange?.(newValue, event);
              }}
              onBlur={(blurEvent) => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              error={isError}
              aria-labelledby={isLabelAboveFormField ? labelId : undefined}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              aria-required={required}
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
