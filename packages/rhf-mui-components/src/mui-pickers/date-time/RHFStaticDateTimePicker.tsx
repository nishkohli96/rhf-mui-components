'use client';

import {
  useContext,
  forwardRef,
  type ReactNode,
  type JSX,
  type Ref
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import {
  type StaticDateTimePickerProps,
  type PickerValidDate,
  type DateTimeValidationError,
  type PickerChangeHandlerContext
} from '@mui/x-date-pickers';
import { MUIStaticDateTimePicker } from '@nish1896/mui-components/mui-pickers/date-time';
import { ConfigProvider as MUIComponentsConfigProvider } from '@nish1896/mui-components/config';
import {
  type FormLabelProps,
  type FormHelperTextProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
import {
  generateDateAdapterErrMsg,
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
  resolveRequired
} from '@/utils';

type StaticDateTimePickerInputProps = Omit<
  StaticDateTimePickerProps,
  'value' | 'defaultValue' | 'ref'
>;

type PickerOnValueChangeProps<ValidationError> = {
  newValue: PickerValidDate;
  context: PickerChangeHandlerContext<ValidationError>;
};

type PickerCustomOnChangeProps<ValidationError>
  = PickerOnValueChangeProps<ValidationError> & {
    rhfOnChange: (value: PickerValidDate) => void;
  };

export type RHFStaticDateTimePickerProps<T extends FieldValues> = {
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
   * Overrides the default date-time picker change handling.
   * Receives every picker change, including date-time values that currently have validation errors.
   * Call `rhfOnChange` with the picker value that should be stored; else the form value will not be updated.
   * The default handler stores the value only when `context.validationError` is `null`.
   *
   * @param rhfOnChange - React Hook Form field change handler for the selected date-time value.
   * @param newValue - New date-time value emitted by MUI X.
   * @param context - MUI X picker change context, including validation status.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    context
  }: PickerCustomOnChangeProps<DateTimeValidationError>) => void;
  /**
   * Called after the default date-time picker handler stores a valid date-time value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - New date-time value emitted by MUI X.
   * @param context - MUI X picker change context, including validation status.
   */
  onValueChange?: ({
    newValue,
    context
  }: PickerOnValueChangeProps<DateTimeValidationError>) => void;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * When `true`, renders the label above the component instead of within the field layout.
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
} & StaticDateTimePickerInputProps;

const RHFStaticDateTimePickerInner = forwardRef(function RHFStaticDateTimePicker<
  T extends FieldValues
>(
  {
    fieldName,
    control,
    registerOptions,
    required,
    customOnChange,
    onChange: muiOnChange,
    onAccept: muiOnAccept,
    onValueChange,
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
    slotProps: muiSlotProps,
    customIds,
    ...otherStaticDateTimePickerProps
  }: RHFStaticDateTimePickerProps<T>,
  ref: Ref<HTMLDivElement>
) {
  const {
    dateAdapter,
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);
  if (!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFStaticDateTimePicker'));
  }

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const isFieldRequired = resolveRequired(required, registerOptions?.required);

  const {
    sx: formLabelSx,
    ...otherFormLabelProps
  } = formLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};

  return (
    <MUIComponentsConfigProvider dateAdapter={dateAdapter}>
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({
          field: {
            value: rhfValue,
            ref: rhfRef,
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
            <MUIStaticDateTimePicker
              {...otherStaticDateTimePickerProps}
              fieldName={fieldName}
              required={isFieldRequired}
              ref={mergeRefs(rhfRef, ref)}
              value={rhfValue}
              onValueChange={({ newValue, context }) => {
                muiOnChange?.(newValue, context);
                if (customOnChange) {
                  customOnChange({ rhfOnChange, newValue, context });
                  return;
                }
                if (context.validationError !== null) {
                  return;
                }
                rhfOnChange(newValue);
                onValueChange?.({ newValue, context });
              }}
              onAccept={(newValue, context) => {
                muiOnAccept?.(newValue, context);
                rhfOnBlur();
              }}
              disabled={isDisabled}
              label={label}
              showLabelAboveFormField={isLabelAboveFormField}
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
              slotProps={muiSlotProps}
              customIds={customIds}
            />
          );
        }}
      />
    </MUIComponentsConfigProvider>
  );
});

const RHFStaticDateTimePicker = RHFStaticDateTimePickerInner as <
  T extends FieldValues
>(
  props: RHFStaticDateTimePickerProps<T> & { ref?: Ref<HTMLDivElement> }
) => JSX.Element;

export default RHFStaticDateTimePicker;
