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
  StaticTimePicker as MuiStaticTimePicker,
  type PickerValidDate,
  type TimeValidationError,
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

type StaticTimePickerInputProps = Omit<
  ComponentProps<typeof MuiStaticTimePicker>,
  'value' | 'onChange' | 'ref'
>;

export type RHFStaticTimePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  onValueChange?: (
    newValue: PickerValidDate,
    context: PickerChangeHandlerContext<TimeValidationError>
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
} & StaticTimePickerInputProps;

const RHFStaticTimePickerInner = forwardRef(function RHFStaticTimePicker<
  T extends FieldValues
>(
  {
    fieldName,
    control,
    registerOptions,
    required,
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
  }: RHFStaticTimePickerProps<T>,
  ref: Ref<HTMLDivElement>
) {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if (!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFStaticTimePicker'));
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
                <MuiStaticTimePicker
                  ref={mergeRefs(rhfRef, ref)}
                  value={rhfValue ?? null}
                  disabled={rhfDisabled}
                  onChange={(newValue, context) => {
                    rhfOnChange(newValue);
                    onValueChange?.(newValue, context);
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
});

const RHFStaticTimePicker = RHFStaticTimePickerInner as <T extends FieldValues>(
  props: RHFStaticTimePickerProps<T> & { ref?: Ref<HTMLDivElement> }
) => JSX.Element;

export default RHFStaticTimePicker;
