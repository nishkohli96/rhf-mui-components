'use client';

import { useContext, forwardRef, type Ref, type ReactNode } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DateTimePicker as MuiDateTimePicker,
  type DateTimePickerProps,
  type PickerValidDate,
  type DateTimeValidationError,
  type PickerChangeHandlerContext
} from '@mui/x-date-pickers';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText
} from '@/common';
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

type DateTimePickerInputProps = Omit<
  DateTimePickerProps<PickerValidDate>,
  'name' | 'value' | 'onChange' | 'inputRef'
>;

/**
 * Without `customOnChange`, **rhfOnChange** runs on every picker change; **onValueChange** runs
 * only when `context.validationError === null`.
 */
export type RHFDateTimePickerProps<T extends FieldValues> = {
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
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  customIds?: CustomComponentIds;
} & DateTimePickerInputProps;

const RHFDateTimePickerInner = forwardRef(function RHFDateTimePicker<
  T extends FieldValues
>(
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
  }: RHFDateTimePickerProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if (!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFDateTimePicker'));
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

  return (
    <LocalizationProvider dateAdapter={dateAdapter}>
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
              <MuiDateTimePicker
                name={rhfFieldName}
                inputRef={mergeRefs(rhfRef, ref)}
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
                label={
                  !hideLabel && !isLabelAboveFormField
                    ? (
                      <FormLabelText label={fieldLabel} required={required} />
                    )
                    : undefined
                }
                slotProps={{
                  ...otherSlotProps,
                  textField: {
                    id: fieldId,
                    error: isError,
                    onBlur: rhfOnBlur,
                    inputProps: {
                      'aria-labelledby':
                        !hideLabel && isLabelAboveFormField
                          ? labelId
                          : undefined,
                      'aria-label': hideLabel
                        ? typeof fieldLabel === 'string'
                          ? fieldLabel
                          : undefined
                        : undefined,
                      'aria-describedby': showHelperTextElement
                        ? isError
                          ? errorId
                          : helperTextId
                        : undefined,
                      'aria-invalid': isError || undefined,
                      'aria-required': required || undefined
                    },
                    ...textFieldSlotProps
                  }
                }}
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
    </LocalizationProvider>
  );
});

const RHFDateTimePicker = RHFDateTimePickerInner as <T extends FieldValues>(
  props: RHFDateTimePickerProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFDateTimePicker;
