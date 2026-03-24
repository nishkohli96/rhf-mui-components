'use client';

import { Fragment, type ReactNode } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MuiSlider, { type SliderProps } from '@mui/material/Slider';
import { FormLabel, FormHelperText } from '@/common';
import type { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel, useFieldIds } from '@/utils';

type SliderInputProps = Omit<
  SliderProps,
  | 'name'
  | 'value'
  | 'onChange'
>;

export type RHFSliderProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  onValueChange?: (
    value: number | number[],
    activeThumb: number,
    event: Event,
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & SliderInputProps;

const RHFSlider = <T extends FieldValues>({
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
}: RHFSliderProps<T>) => {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isFormLabelVisible = showLabelAboveFormField ?? true;
  const isError = !!errorMessage;
  const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

  return (
    <Fragment>
      <FormLabel
        label={fieldLabel}
        isVisible={isFormLabelVisible}
        required={required}
        error={isError}
        formLabelProps={{
          id: labelId,
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
            <MuiSlider
              id={fieldId}
              name={rhfFieldName}
              value={rhfValue ?? 0}
              disabled={rhfDisabled}
              onChange={(event, value, activeThumb) => {
                rhfOnChange(value);
                onValueChange?.(value, activeThumb, event);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              aria-labelledby={isFormLabelVisible ? labelId : undefined}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
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
        showHelperTextElement={showHelperTextElement}
        formHelperTextProps={{
          id: isError ? errorId : helperTextId,
          ...formHelperTextProps
        }}
      />
    </Fragment>
  );
};

export default RHFSlider;
