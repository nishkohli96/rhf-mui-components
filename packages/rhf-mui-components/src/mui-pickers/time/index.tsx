'use client';

import { useContext, type ReactNode } from 'react';
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
import { FormControl, FormLabel, FormLabelText, FormHelperText } from '@/common';
import type { FormLabelProps, FormHelperTextProps } from '@/types';
import {
  fieldNameToLabel,
  generateDateAdapterErrMsg,
  keepLabelAboveFormField,
  useFieldIds
} from '@/utils';

type TimePickerInputProps = Omit<
  TimePickerProps<PickerValidDate>,
  | 'name'
  | 'value'
>;

export type RHFTimePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  onValueChange?: (
    newValue: PickerValidDate,
    context: PickerChangeHandlerContext<TimeValidationError>
  ) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & TimePickerInputProps;

const RHFTimePicker = <T extends FieldValues>({
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
  onChange: muiOnChange,
  onAccept: muiOnAccept,
  slotProps: muiSlotProps,
  ...rest
}: RHFTimePickerProps<T>) => {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if(!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFTimePicker'));
  }

  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);
  const {
    textField: textFieldSlotProps,
    ...otherSlotProps
  } = muiSlotProps ?? {};

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = !!errorMessage;
  const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

  return (
    <FormControl error={isError}>
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
            }
          }) => {
            return (
              <MuiTimePicker
                name={rhfFieldName}
                inputRef={rhfRef}
                value={rhfValue || null}
                disabled={rhfDisabled}
                onChange={muiOnChange}
                onAccept={(newValue, context) => {
                  rhfOnChange(newValue);
                  onValueChange?.(newValue, context);
                  muiOnAccept?.(newValue, context);
                }}
                label={
                  !isLabelAboveFormField
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
                      'aria-labelledby': isLabelAboveFormField
                        ? labelId
                        : undefined,
                      'aria-describedby': showHelperTextElement
                        ? isError
                          ? errorId
                          : helperTextId
                        : undefined,
                    },
                    ...textFieldSlotProps,
                  }
                }}
                {...rest}
              />
            );
          }}
        />
      </LocalizationProvider>
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
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
};

export default RHFTimePicker;
