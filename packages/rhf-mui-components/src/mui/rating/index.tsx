'use client';

import {
  useContext,
  forwardRef,
  type Ref,
  type ReactNode,
  type SyntheticEvent
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MuiRating, { type RatingProps } from '@mui/material/Rating';
import { FormControl, FormLabel, FormHelperText } from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type {
  FormLabelProps,
  FormHelperTextProps,
  CustomComponentIds
} from '@/types';
import {
  fieldNameToLabel,
  mergeRefs,
  resolveLabelAboveControl,
  useFieldIds
} from '@/utils';

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
  /**
   * Custom change handler that overrides the default rating value update.
   *
   * Use when you need to intercept or transform the selected rating before
   * updating React Hook Form state.
   *
   * ⚠️ Important: Call `rhfOnChange` manually to update the form state.
   * `onValueChange` is not invoked when this callback is provided.
   *
   * @param rhfOnChange - React Hook Form field change handler
   * @param newValue - New rating value, or `null` when cleared
   * @param event - Synthetic event from the rating control
   */
  customOnChange?: (
    rhfOnChange: (newValue: number | null) => void,
    newValue: number | null,
    event: SyntheticEvent<Element, Event>
  ) => void;
  onValueChange?: (
    newValue: number | null,
    event: SyntheticEvent<Element, Event>
  ) => void;
  label?: ReactNode;
  hideLabel?: boolean;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  customIds?: CustomComponentIds;
} & InputRatingProps;

const RHFRatingInner = forwardRef(function RHFRating<T extends FieldValues>({
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
}: RHFRatingProps<T>,
ref: Ref<HTMLSpanElement>) {
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
          ref: rhfRef,
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
          <FormControl component="fieldset" error={isError}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveControl}
                required={required}
                error={isError}
                formLabelProps={{
                  id: labelId,
                  component: 'legend',
                  ...formLabelProps
                }}
              />
            )}
            <MuiRating
              ref={mergeRefs(rhfRef, ref)}
              id={fieldId}
              name={rhfFieldName}
              value={rhfValue ?? null}
              disabled={rhfDisabled}
              onChange={(event, newValue) => {
                if(customOnChange) {
                  customOnChange(rhfOnChange, newValue, event);
                  return;
                }
                rhfOnChange(newValue);
                onValueChange?.(newValue, event);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              aria-labelledby={!hideLabel ? labelId : undefined}
              aria-label={
                hideLabel
                  ? typeof fieldLabel === 'string'
                    ? fieldLabel
                    : undefined
                  : undefined
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
          </FormControl>
        );
      }}
    />
  );
});

const RHFRating = RHFRatingInner as <T extends FieldValues>(
  props: RHFRatingProps<T> & { ref?: Ref<HTMLSpanElement> }
) => JSX.Element;

export default RHFRating;
