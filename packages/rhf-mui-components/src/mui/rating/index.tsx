'use client';

import type { ReactNode, SyntheticEvent } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MuiRating, { type RatingProps } from '@mui/material/Rating';
import { FormControl, FormLabel, FormHelperText } from '@/common';
import type { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel, useFieldIds } from '@/utils';

type InputRatingProps = Omit<
  RatingProps,
  | 'name'
  | 'onChange'
  | 'error'
  | 'value'
  | 'defaultValue'
>;

export type RHFRatingProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  onValueChange?: (
    newValue: number | null,
    event: SyntheticEvent<Element, Event>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & InputRatingProps;

const RHFRating = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  required,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
  ...rest
}: RHFRatingProps<T>) => {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = !!errorMessage;

  return (
    <FormControl component="fieldset" error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        required={required}
        error={isError}
        formLabelProps={{
          id: labelId,
          component: 'legend',
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
            disabled: rhfDisabled
          }
        }) => {
          return (
            <MuiRating
              id={fieldId}
              name={rhfFieldName}
              value={rhfValue ?? null}
              disabled={rhfDisabled}
              onChange={(event, newValue) => {
                rhfOnChange(newValue);
                onValueChange?.(newValue, event);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              aria-labelledby={labelId}
              aria-describedby={isError ? errorId : helperTextId}
              aria-invalid={isError || undefined}
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

export default RHFRating;

