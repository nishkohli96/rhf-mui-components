'use client';

import {
  useContext,
  forwardRef,
  type ReactNode,
  type JSX,
  type Ref,
  type SyntheticEvent
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { type RatingProps } from '@mui/material/Rating';
import MUIRating from '@nish1896/mui-components/mui/rating';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
import {
  mergeRefs,
  mergeSx,
  resolveLabelAboveControl,
  resolveRequired,
  useFieldIds
} from '@/utils';

type OnValueChangeProps = {
  newValue: number | null;
  event: SyntheticEvent<Element, Event>;
};

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
   * Overrides the default rating change handling.
   * Receives the next rating value and the original rating change event.
   * Call `rhfOnChange` with the number or `null` value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the rating value.
   * @param newValue - Next rating value, or `null` when cleared.
   * @param event - Original rating change event.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<OnValueChangeProps, number | null>) => void;
  /**
   * Called after the default rating handler stores the next rating value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next rating value, or `null` when cleared.
   * @param event - Original rating change event.
   */
  onValueChange?: ({ newValue, event }: OnValueChangeProps) => void;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * Renders the label above the component.
   * @default true
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   *
   * Use `renderError` to customize how the field error is rendered.
   */
  errorMessage?: ReactNode;
  /**
   * Custom renderer for the React Hook Form field error.
   * Receives the current field error and must return renderable content, such as `error.message` or a custom element.
   *
   * @param error - React Hook Form field error for this field.
   */
  renderError?: (error: FieldError) => ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
} & InputRatingProps;

const RHFRatingInner = forwardRef(function RHFRating<T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  required,
  customOnChange,
  onValueChange,
  onBlur: muiOnBlur,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  errorMessage,
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  customIds,
  ...otherRatingProps
}: RHFRatingProps<T>,
ref: Ref<HTMLSpanElement>) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName, customIds);

  const isFieldRequired = resolveRequired(required, registerOptions?.required);
  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const {
    sx: formLabelSx,
    ...otherFormLabelProps
  } = formLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          name: rhfFieldName,
          ref: rhfRef,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage = typeof errorMessage === 'string'
          ? errorMessage
          : fieldStateError?.message?.toString();

        return (
          <MUIRating
            {...otherRatingProps}
            fieldName={rhfFieldName}
            ref={mergeRefs(rhfRef, ref)}
            required={isFieldRequired}
            value={rhfValue}
            onValueChange={({ newValue, event }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, event });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, event });
            }}
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent);
            }}
            disabled={isDisabled}
            label={label}
            showLabelAboveFormField={isLabelAboveControl}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            errorMessage={fieldErrorMessage}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            hideErrorMessage={hideErrorMessage}
            helperText={helperText}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
            customIds={{
              field: fieldId,
              label: labelId,
              helperText: helperTextId,
              error: errorId
            }}
          />
        );
      }}
    />
  );
});

const RHFRating = RHFRatingInner as <T extends FieldValues>(
  props: RHFRatingProps<T> & { ref?: Ref<HTMLSpanElement> }
) => JSX.Element;

export default RHFRating;
