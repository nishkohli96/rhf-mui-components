'use client';

import { useContext, forwardRef, type Ref, type ReactNode, type JSX } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  TimePicker as MuiTimePicker,
  type TimePickerProps,
  type PickerValidDate,
  type TimeValidationError,
  type PickerChangeHandlerContext
} from '@mui/x-date-pickers';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText
} from '@/common';
import type { FormLabelProps, FormHelperTextProps, CustomComponentIds } from '@/types';
import {
  fieldNameToLabel,
  generateDateAdapterErrMsg,
  keepLabelAboveFormField,
  mergeRefs,
  useFieldIds,
} from '@/utils';

type TimePickerInputProps = Omit<
  TimePickerProps<PickerValidDate>,
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

export type RHFTimePickerProps<T extends FieldValues> = {
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
  }: PickerCustomOnChangeProps<TimeValidationError>) => void;
  /**
   * Fired when the picker value changes and **context.validationError** is `null`.
   * Not invoked when **customOnChange** is set.
   */
  onValueChange?: ({
    newValue,
    context
  }: PickerOnValueChangeProps<TimeValidationError>) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  hideLabel?: boolean;
  helperText?: ReactNode;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  customIds?: CustomComponentIds;
} & TimePickerInputProps;

const RHFTimePickerInner = forwardRef(function RHFTimePicker<T extends FieldValues>({
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
  formLabelProps,
  hideLabel,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  slotProps: muiSlotProps,
  customIds,
  ...otherTimePickerProps
}: RHFTimePickerProps<T>,
ref: Ref<HTMLInputElement>) {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if(!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFTimePicker'));
  }

  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName, customIds);
  const {
    textField: textFieldSlotProps,
    ...otherSlotProps
  } = muiSlotProps ?? {};

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
                  disabled={isDisabled}
                  formLabelProps={{
                    ...formLabelProps,
                    id: labelId,
                    htmlFor: fieldId
                  }}
                />
              )}
              <MuiTimePicker
                {...otherTimePickerProps}
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
                  textField: {
                    id: fieldId,
                    error: isError,
                    onBlur: rhfOnBlur,
                    inputProps: {
                      'aria-labelledby': !hideLabel && isLabelAboveFormField
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
                      'aria-required': required || undefined,
                    },
                    ...textFieldSlotProps,
                  },
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

const RHFTimePicker = RHFTimePickerInner as <T extends FieldValues>(
  props: RHFTimePickerProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFTimePicker;
