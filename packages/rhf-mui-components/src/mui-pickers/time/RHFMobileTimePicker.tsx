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
  MobileTimePicker as MuiMobileTimePicker,
  type MobileTimePickerProps,
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
  keepLabelAboveFormField
} from '@/utils';

type TimePickerInputProps = Omit<
  MobileTimePickerProps<PickerValidDate>,
  | 'value'
  | 'onChange'
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
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & TimePickerInputProps;

const RHFMobileTimePicker = <T extends FieldValues>({
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
  ...rest
}: RHFMobileTimePickerProps<T>) => {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if(!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFMobileTimePicker'));
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
          }) => {
            return (
            <MuiMobileTimePicker
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
          )}}
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

export default RHFMobileTimePicker;
