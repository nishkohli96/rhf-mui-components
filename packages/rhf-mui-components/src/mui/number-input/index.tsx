'use client';

import { useContext, type ReactNode, type ChangeEvent } from 'react';
import {
  Controller,
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
import { fieldNameToLabel, keepLabelAboveFormField, useFieldIds } from '@/utils';

type TextFieldInputProps = Omit<TextFieldProps, 'type'>;

export type RHFNumberInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    value: number | null,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  showLabelAboveFormField?: boolean;
  showMarkers?: boolean;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & TextFieldInputProps;

const RHFNumberInput = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
  label,
  showLabelAboveFormField,
  showMarkers,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  sx,
  onBlur,
  autoComplete = defaultAutocompleteValue,
  disabled: muiDisabled,
  ...rest
}: RHFNumberInputProps<T>) => {
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
  const isError = Boolean(errorMessage);

  return (
    <FormControl error={isError}>
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
              type="number"
              inputRef={rhfRef}
              autoComplete={autoComplete}
              label={
                !isLabelAboveFormField
                  ? <FormLabelText label={fieldLabel} required={required} />
                  : undefined
              }
              value={rhfValue ?? ''}
              disabled={muiDisabled || rhfDisabled}
              onChange={event => {
                const fieldValue = event.target.value === ''
                  ? null
                  : Number(event.target.value);
                rhfOnChange(fieldValue);
                onValueChange?.(fieldValue, event);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              error={isError}
              aria-describedby={isError ? errorId : helperTextId}
              sx={{
                ...(!showMarkers && {
                  '& input[type=number]': {
                    MozAppearance: 'textfield',
                    '&::-webkit-outer-spin-button': { display: 'none' },
                    '&::-webkit-inner-spin-button': { display: 'none' }
                  }
                }),
                ...sx
              }}
              {...rest}
            />
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={{
          id: isError ? errorId : helperTextId,
          ...formHelperTextProps
        }}
      />
    </FormControl>
  );
};

export default RHFNumberInput;
