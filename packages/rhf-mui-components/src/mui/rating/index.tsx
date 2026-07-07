'use client';

import { useContext, type ReactNode, type SyntheticEvent } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MuiRating, { type RatingProps } from '@mui/material/Rating';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormLabelProps,
  FormHelperTextProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { fieldNameToLabel, useFieldIds, resolveLabelAboveControl } from '@/utils';

type InputRatingProps = Omit<
  RatingProps,
  | 'name'
  | 'onChange'
  | 'error'
  | 'value'
  | 'defaultValue'
>;

export type RHFRatingProps<T extends FieldValues> = {
  /**
   * Name/path of the React Hook Form field this component controls.
   */
  fieldName: Path<T>;
  /**
   * React Hook Form control object returned by `useForm`.
   */
  control: Control<T>;
  /**
   * Validation rules passed to React Hook Form for this field.
   */
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
  /**
   * Callback fired after the rating value is stored in the field.
   * @param newValue - Updated rating value, or `null` when cleared.
   * @param event - Rating change event.
   */
  onValueChange?: (
    newValue: number | null,
    event: SyntheticEvent<Element, Event>
  ) => void;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Validation error message displayed in the `FormHelperText` component.
   * When provided, it takes precedence over `helperText` unless
   * `hideErrorMessage` is set to `true`.
   */
  errorMessage?: ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
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
  ...otherRatingProps
}: RHFRatingProps<T>) => {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          name: rhfFieldName,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          disabled: rhfDisabled
        }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const isError = !!errorMessage;
        const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

        return (
          <FormControl
            component="fieldset"
            error={isError}
            disabled={isDisabled}
          >
            <FormLabel
              label={fieldLabel}
              isVisible={isLabelAboveControl}
              required={required}
              error={isError}
              disabled={isDisabled}
              formLabelProps={{
                ...formLabelProps,
                id: labelId,
                component: 'legend'
              }}
            />
            <MuiRating
              {...otherRatingProps}
              id={fieldId}
              name={rhfFieldName}
              value={rhfValue ?? null}
              disabled={isDisabled}
              onChange={(event, newValue) => {
                rhfOnChange(newValue);
                onValueChange?.(newValue, event);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              aria-labelledby={isLabelAboveControl ? labelId : undefined}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              aria-invalid={isError || undefined}
            />
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              showHelperTextElement={showHelperTextElement}
              formHelperTextProps={{
                ...formHelperTextProps,
                id: isError ? errorId : helperTextId
              }}
            />
          </FormControl>
        );
      }}
    />
  );
};

export default RHFRating;
