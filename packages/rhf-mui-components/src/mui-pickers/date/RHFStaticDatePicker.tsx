'use client';

import {
  useContext,
  forwardRef,
  type Ref,
  type ReactNode,
  type JSX,
  type ComponentProps,
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  StaticDatePicker as MuiStaticDatePicker,
  type PickerValidDate,
  type DateValidationError,
  type PickerChangeHandlerContext
} from '@mui/x-date-pickers';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  CustomComponentIds
} from '@/types';
import {
  fieldNameToLabel,
  generateDateAdapterErrMsg,
  keepLabelAboveFormField,
  mergeRefs,
  useFieldIds
} from '@/utils';

type StaticDatePickerInputProps = Omit<
  ComponentProps<typeof MuiStaticDatePicker>,
  'value' | 'ref'
>;

type PickerOnValueChangeProps<ValidationError> = {
  newValue: PickerValidDate;
  context: PickerChangeHandlerContext<ValidationError>;
};

type PickerCustomOnChangeProps<ValidationError>
  = PickerOnValueChangeProps<ValidationError> & {
    rhfOnChange: (value: PickerValidDate) => void;
  };

export type RHFStaticDatePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  /**
   * Override the default picker value update. Call **rhfOnChange** with the value to store in
   * the form (including `null` when cleared). Use **context.validationError** if you need the
   * same “only update when valid” rule as **onValueChange**.
   *
   * ⚠️ Important: `onValueChange` is not invoked when this callback is provided.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    context
  }: PickerCustomOnChangeProps<DateValidationError>) => void;
  /**
   * Fired when the picker value changes and **context.validationError** is `null`.
   * Not invoked when **customOnChange** is set.
   */
  onValueChange?: ({
    newValue,
    context
  }: PickerOnValueChangeProps<DateValidationError>) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  customIds?: CustomComponentIds;
} & StaticDatePickerInputProps;

const RHFStaticDatePickerInner = forwardRef(function RHFStaticDatePicker<
  T extends FieldValues
>(
  {
    fieldName,
    control,
    registerOptions,
    required,
    onChange: muiOnChange,
    onAccept: muiOnAccept,
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
    slotProps: muiSlotProps,
    customIds,
    ...rest
  }: RHFStaticDatePickerProps<T>,
  ref: Ref<HTMLDivElement>
) {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if (!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFStaticDatePicker'));
  }

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  return (
    <LocalizationProvider dateAdapter={dateAdapter}>
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({
          field: {
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
              <div
                id={fieldId}
                role="group"
                aria-labelledby={
                  !hideLabel && isLabelAboveFormField ? labelId : undefined
                }
                aria-label={
                  hideLabel && typeof fieldLabel === 'string'
                    ? fieldLabel
                    : undefined
                }
                aria-describedby={
                  showHelperTextElement
                    ? isError
                      ? errorId
                      : helperTextId
                    : undefined
                }
              >
                <MuiStaticDatePicker
                  ref={mergeRefs(rhfRef, ref)}
                  value={rhfValue ?? null}
                  disabled={muiDisabled || rhfDisabled}
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
                  slotProps={muiSlotProps}
                  {...rest}
                />
              </div>
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
    </LocalizationProvider>
  );
});

const RHFStaticDatePicker = RHFStaticDatePickerInner as <T extends FieldValues>(
  props: RHFStaticDatePickerProps<T> & { ref?: Ref<HTMLDivElement> }
) => JSX.Element;

export default RHFStaticDatePicker;
