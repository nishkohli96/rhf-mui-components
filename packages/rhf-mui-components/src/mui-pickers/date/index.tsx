import { useContext, ReactNode } from 'react';
import {
  FieldValues,
  Controller,
  Control,
  RegisterOptions,
  Path
} from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
  PickerValidDate,
  DateValidationError,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';

export type RHFDatePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    newValue: PickerValidDate | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & Omit<DatePickerProps<PickerValidDate>, 'value' | 'onChange'>;

const RHFDatePicker = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...rest
}: RHFDatePickerProps<T>) => {
  const { dateAdapter, allLabelsAboveFormField } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFormField
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <LocalizationProvider dateAdapter={dateAdapter}>
        <Controller
          name={fieldName}
          control={control}
          rules={registerOptions}
          render={({ field: { value, onChange } }) => (
            <MuiDatePicker
              {...rest}
              value={value ?? null}
              onChange={(newValue, context) => {
                onChange(newValue);
                onValueChange?.(newValue, context);
              }}
              label={!isLabelAboveFormField ? fieldLabel : undefined}
            />
          )}
        />
      </LocalizationProvider>
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFDatePicker;
