'use client';

import {
  useContext,
  forwardRef,
  type Ref,
  type ReactNode,
  type ComponentProps
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
  StaticDateTimePicker as MuiStaticDateTimePicker,
  type PickerValidDate,
  type DateTimeValidationError,
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

type StaticDateTimePickerInputProps = Omit<
  ComponentProps<typeof MuiStaticDateTimePicker>,
  'value' | 'onChange' | 'ref'
>;

/**
 * Without `customOnChange`, **rhfOnChange** runs on every picker change; **onValueChange** runs
 * only when `context.validationError === null`.
 */
export type RHFStaticDateTimePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  /**
   * Override the default picker value update. Call **rhfOnChange** with the value to store in
   * the form (including `null` when cleared). Use **context.validationError** if you need the
   * same “only commit when valid” rule as **onValueChange**.
   *
   * ⚠️ Important: `onValueChange` is not invoked when this callback is provided.
   */
  customOnChange?: (
    rhfOnChange: (value: PickerValidDate) => void,
    newValue: PickerValidDate,
    context: PickerChangeHandlerContext<DateTimeValidationError>
  ) => void;
  /**
   * Fired only when **context.validationError** is `null`. Not invoked when **customOnChange** is set.
   */
  onValueChange?: (
    newValue: PickerValidDate,
    context: PickerChangeHandlerContext<DateTimeValidationError>
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
} & StaticDateTimePickerInputProps;

const RHFStaticDateTimePickerInner = forwardRef(
  function RHFStaticDateTimePicker<T extends FieldValues>(
    {
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
      slotProps: muiSlotProps,
      customIds,
      onAccept,
      ...rest
    }: RHFStaticDateTimePickerProps<T>,
    ref: Ref<HTMLDivElement>
  ) {
    const { dateAdapter, allLabelsAboveFields }
      = useContext(RHFMuiConfigContext);
    if (!dateAdapter) {
      throw new Error(generateDateAdapterErrMsg('RHFStaticDateTimePicker'));
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
          disabled={muiDisabled}
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
                  <MuiStaticDateTimePicker
                    ref={mergeRefs(rhfRef, ref)}
                    value={rhfValue ?? null}
                    disabled={rhfDisabled}
                    onChange={(newValue, context) => {
                      if (customOnChange) {
                        customOnChange(rhfOnChange, newValue, context);
                        return;
                      }
                      rhfOnChange(newValue);
                      if (context.validationError === null) {
                        onValueChange?.(newValue, context);
                      }
                    }}
                    onAccept={(newValue, context) => {
                      onAccept?.(newValue, context);
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
  }
);

const RHFStaticDateTimePicker = RHFStaticDateTimePickerInner as <
  T extends FieldValues
>(
  props: RHFStaticDateTimePickerProps<T> & { ref?: Ref<HTMLDivElement> }
) => JSX.Element;

export default RHFStaticDateTimePicker;
