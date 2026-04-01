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
  MobileTimePicker as MuiMobileTimePicker,
  type MobileTimePickerProps,
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

type MobileTimePickerInputProps = Omit<
  MobileTimePickerProps<PickerValidDate>,
  'name' | 'value' | 'onChange' | 'inputRef'
>;

export type RHFMobileTimePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  onValueChange?: (
    newValue: PickerValidDate,
    context: PickerChangeHandlerContext<TimeValidationError>
  ) => void;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  customIds?: CustomComponentIds;
} & MobileTimePickerInputProps;

const RHFMobileTimePicker = forwardRef(function RHFMobileTimePicker<
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
  }: RHFMobileTimePickerProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if (!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFMobileTimePicker'));
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
              <MuiMobileTimePicker
                name={rhfFieldName}
                inputRef={mergeRefs(rhfRef, ref)}
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
}) as <T extends FieldValues>(
  props: RHFMobileTimePickerProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFMobileTimePicker;
