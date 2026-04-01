'use client';

import { Fragment, useContext, type ReactNode } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MuiSlider, { type SliderProps } from '@mui/material/Slider';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormLabel, FormHelperText } from '@/common';
import type { FormLabelProps, FormHelperTextProps, CustomComponentIds } from '@/types';
import { fieldNameToLabel, resolveLabelAboveControl, useFieldIds } from '@/utils';

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
  /**
 * Custom change handler for slider value updates.
 *
 * Allows you to control how the slider value is processed
 * before updating React Hook Form state.
 *
 * ⚠️ Important: You must call `rhfOnChange` manually to update the form state.
 * `onValueChange` is not invoked when using `customOnChange`.
 *
 * @param rhfOnChange - React Hook Form's internal change handler
 * @param value - The new slider value (number or range)
 * @param activeThumb - Index of the currently active thumb (for range sliders)
 * @param event - The change event triggered by the slider
 */
  customOnChange?: (
    rhfOnChange: (newValue: number | number[]) => void,
    value: number | number[],
    activeThumb: number,
    event: Event
  ) => void;
  onValueChange?: (
    value: number | number[],
    activeThumb: number,
    event: Event,
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  customIds?: CustomComponentIds;
} & SliderInputProps;

const RHFSlider = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  required,
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  hideLabel,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
  customIds,
  ...rest
}: RHFSliderProps<T>) => {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName, customIds);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  return (
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
        },
        fieldState: { error: fieldStateError }
      }) => {
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        return (
          <Fragment>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveControl}
                required={required}
                error={isError}
                formLabelProps={{
                  id: labelId,
                  ...formLabelProps
                }}
              />
            )}
            <MuiSlider
              id={fieldId}
              name={rhfFieldName}
              value={rhfValue ?? 0}
              disabled={rhfDisabled}
              onChange={(event, value, activeThumb) => {
                if (customOnChange) {
                  customOnChange(rhfOnChange, value, activeThumb, event);
                  return;
                }
                rhfOnChange(value);
                onValueChange?.(value, activeThumb, event);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              aria-required={required || undefined}
              aria-labelledby={
                !hideLabel && isLabelAboveControl ? labelId : undefined
              }
              aria-label={hideLabel ? String(fieldLabel) : undefined}
              aria-valuetext={
                Array.isArray(rhfValue)
                  ? rhfValue.join(' to ')
                  : String(rhfValue)
              }
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
          </Fragment>
        );
      }}
    />
  );
};

export default RHFSlider;
