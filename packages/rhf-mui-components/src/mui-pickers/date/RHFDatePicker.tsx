'use client';

import {
  useContext,
  forwardRef,
  type Ref,
  type ReactNode,
  type JSX
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DatePicker as MuiDatePicker,
  type DatePickerProps,
  type PickerValidDate,
  type DateValidationError,
  type PickerChangeHandlerContext
} from '@mui/x-date-pickers';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  type FormLabelProps,
  type FormHelperTextProps
} from '@/common';
import type { CustomComponentIds } from '@/types';
import {
  fieldNameToLabel,
  generateDateAdapterErrMsg,
  keepLabelAboveFormField,
  mergeRefs,
  useFieldIds
} from '@/utils';

type DatePickerInputProps = Omit<
  DatePickerProps<PickerValidDate>,
  'name' | 'value' | 'defaultValue' | 'inputRef'
>;

type PickerOnValueChangeProps<ValidationError> = {
  newValue: PickerValidDate;
  context: PickerChangeHandlerContext<ValidationError>;
};

type PickerCustomOnChangeProps<ValidationError>
  = PickerOnValueChangeProps<ValidationError> & {
    rhfOnChange: (value: PickerValidDate) => void;
  };

/**
 * Without `customOnChange`, valid picker changes update the form value in **onChange**.
 * **onAccept** forwards the MUI accept event and marks the field as touched.
 */
export type RHFDatePickerProps<T extends FieldValues> = {
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
   * Overrides the default date picker change handling.
   * Receives every picker change, including date values that currently have validation errors.
   * Call `rhfOnChange` with the picker value that should be stored; else the form value will not be updated.
   * The default handler stores the value only when `context.validationError` is `null`.
   *
   * @param rhfOnChange - React Hook Form field change handler for the selected date value.
   * @param newValue - New date value emitted by MUI X.
   * @param context - MUI X picker change context, including validation status.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    context
  }: PickerCustomOnChangeProps<DateValidationError>) => void;
  /**
   * Called after the default date picker handler stores a valid date value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - New date value emitted by MUI X.
   * @param context - MUI X picker change context, including validation status.
   */
  onValueChange?: ({
    newValue,
    context
  }: PickerOnValueChangeProps<DateValidationError>) => void;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
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
} & DatePickerInputProps;

const RHFDatePickerInner = forwardRef(function RHFDatePicker<T extends FieldValues>(
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
    ...otherDatePickerProps
  }: RHFDatePickerProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if (!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFDatePicker'));
  }

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const { textField: textFieldSlotProps, ...otherSlotProps }
    = muiSlotProps ?? {};

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const accessibleFieldLabel = typeof fieldLabel === 'string'
    ? fieldLabel
    : fieldNameToLabel(fieldName);

  return (
    <LocalizationProvider dateAdapter={dateAdapter}>
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
            ref: rhfRef,
            disabled: rhfDisabled
          },
          fieldState: { error: fieldStateError }
        }) => {
          const isDisabled = muiDisabled || rhfDisabled;
          const fieldErrorMessage
            = fieldStateError
              ? renderError?.(fieldStateError) ?? fieldStateError.message?.toString()
              : errorMessage;
          const isError = !!fieldErrorMessage;
          const showHelperTextElement = !!(
            helperText
            || (isError && !hideErrorMessage)
          );
          return (
            <FormControl error={isError} disabled={isDisabled}>
              {!hideLabel && (
                <FormLabel
                  label={fieldLabel}
                  isVisible={isLabelAboveFormField}
                  required={required}
                  error={isError}
                  disabled={isDisabled}
                  formLabelProps={{
                    ...formLabelProps,
                    id: labelId,
                    htmlFor: fieldId
                  }}
                />
              )}
              <MuiDatePicker
                {...otherDatePickerProps}
                name={rhfFieldName}
                inputRef={mergeRefs(rhfRef, ref)}
                value={rhfValue ?? null}
                disabled={isDisabled}
                onChange={(newValue, context) => {
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
                label={
                  !hideLabel && !isLabelAboveFormField
                    ? (
                      <FormLabelText label={fieldLabel} required={required} />
                    )
                    : undefined
                }
                slotProps={{
                  ...otherSlotProps,
                  textField: ownerState => {
                    const resolvedTextFieldSlotProps = typeof textFieldSlotProps === 'function'
                      ? textFieldSlotProps(ownerState)
                      : textFieldSlotProps;
                    return {
                      ...resolvedTextFieldSlotProps,
                      id: fieldId,
                      error: isError,
                      onBlur: rhfOnBlur,
                      inputProps: {
                        ...resolvedTextFieldSlotProps?.inputProps,
                        'aria-labelledby':
                          !hideLabel && isLabelAboveFormField
                            ? labelId
                            : undefined,
                        'aria-label': hideLabel
                          ? accessibleFieldLabel
                          : undefined,
                        'aria-describedby': showHelperTextElement
                          ? isError
                            ? errorId
                            : helperTextId
                          : undefined,
                        'aria-invalid': isError || undefined,
                        'aria-required': required || undefined
                      }
                    };
                  }
                }}
              />
              <FormHelperText
                error={isError}
                errorMessage={fieldErrorMessage}
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
    </LocalizationProvider>
  );
});

const RHFDatePicker = RHFDatePickerInner as <T extends FieldValues>(
  props: RHFDatePickerProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFDatePicker;
