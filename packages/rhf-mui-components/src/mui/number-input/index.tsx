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

type TextFieldInputProps = Omit<
  TextFieldProps,
  'type' | 'multiline' | 'rows' | 'minRows' | 'maxRows'
>;

export type RHFNumberInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  customOnChange?: (
    rhfOnChange: (value: number | null) => void,
    newValue: number | null,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onValueChange?: (
    value: number | null,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  showMarkers?: boolean;
  maxDecimalPlaces?: number;
  stepAmount?: number;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & TextFieldInputProps;

const RHFNumberInput = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  hideLabel,
  showMarkers,
  maxDecimalPlaces,
  stepAmount = 1,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  sx,
  onBlur,
  autoComplete = defaultAutocompleteValue,
  slotProps,
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
  const isError = !!errorMessage;
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
              type="number"
              inputRef={rhfRef}
              autoComplete={autoComplete}
              label={
                !hideLabel && !isLabelAboveFormField && (
                  <FormLabelText label={fieldLabel} required={required} />
                )
              }
              value={
                rhfValue === null
                || rhfValue === undefined
                || Number.isNaN(rhfValue)
                  ? ''
                  : rhfValue
              }
              disabled={rhfDisabled}
              onChange={event => {
                const inputValue = event.target.value;
                const decimalPattern
                  = maxDecimalPlaces !== undefined
                    ? new RegExp(`^\\d*(\\.\\d{0,${maxDecimalPlaces}})?$`)
                    : /^\d*(\.\d*)?$/;
                if (inputValue === '' || decimalPattern.test(inputValue)) {
                  const fieldValue
                    = inputValue === '' ? null : Number(inputValue);
                  const safeValue = Number.isNaN(fieldValue) ? null : fieldValue;
                  if (customOnChange) {
                    customOnChange(rhfOnChange, safeValue, event);
                    return;
                  }
                  rhfOnChange(safeValue);
                  onValueChange?.(safeValue, event as ChangeEvent<HTMLInputElement>);
                }
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              slotProps={{
                ...slotProps,
                htmlInput: {
                  ...slotProps?.htmlInput,
                  step: stepAmount
                }
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
              sx={{
                ...(!showMarkers && {
                  '& input[type=number]': {
                    MozAppearance: 'textfield',
                    '&::-webkit-outer-spin-button': { display: 'none' },
                    '&::-webkit-inner-spin-button': { display: 'none' },
                  },
                }),
                ...sx,
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
        showHelperTextElement={showHelperTextElement}
        formHelperTextProps={{
          id: isError ? errorId : helperTextId,
          ...formHelperTextProps
        }}
      />
    </FormControl>
  );
};

export default RHFNumberInput;
