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
  DesktopDatePicker as MuiDesktopDatePicker,
  type DesktopDatePickerProps,
  type PickerValidDate,
  type DateValidationError,
  type PickerChangeHandlerContext
} from '@mui/x-date-pickers';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText
} from '@/common';
import type { FormLabelProps, FormHelperTextProps } from '@/types';
import {
  fieldNameToLabel,
  generateDateAdapterErrMsg,
  keepLabelAboveFormField,
} from '@/utils';

type DesktopDatePickerInputProps = Omit<
  DesktopDatePickerProps<PickerValidDate>,
  | 'value'
  | 'onChange'
>;

export type RHFDesktopDatePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  onValueChange?: (
    newValue: PickerValidDate,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & DesktopDatePickerInputProps;

const RHFDesktopDatePicker = <T extends FieldValues>({
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
  slotProps: muiSlotProps,
  ...rest
}: RHFDesktopDatePickerProps<T>) => {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if(!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFDesktopDatePicker'));
  }

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
        formLabelProps={formLabelProps}
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
          }) => (
            <MuiDesktopDatePicker
              name={rhfFieldName}
              inputRef={rhfRef}
              value={rhfValue || null}
              disabled={rhfDisabled}
              onChange={(newValue, context) => {
                rhfOnChange(newValue);
                onValueChange?.(newValue, context);
              }}
              label={
                !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={required} />
                  )
                  : undefined
              }
              {...rest}
            />
          )}
        />
      </LocalizationProvider>
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        showHelperTextElement={showHelperTextElement}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFDesktopDatePicker;
