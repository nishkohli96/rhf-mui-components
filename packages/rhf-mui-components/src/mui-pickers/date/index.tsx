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
  DatePicker,
  MobileDatePicker,
  StaticDatePicker,
  DesktopDatePicker,
  type DatePickerProps,
  type DesktopDatePickerProps,
  type MobileDatePickerProps,
  type StaticDatePickerProps,
  type PickerValidDate,
  type DateValidationError,
  type PickerChangeHandlerContext
} from '@mui/x-date-pickers';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormLabelText, FormHelperText } from '@/mui/common';
import {
  MuiDateTimePickerView,
  type FormLabelProps,
  type FormHelperTextProps,
} from '@/types';
import {
  fieldNameToLabel,
  generateDateAdapterErrMsg,
  keepLabelAboveFormField,
} from '@/utils';

type ViewSpecificProps =
  | {
      pickerView: MuiDateTimePickerView.DESKTOP;
      pickerProps?: Omit<
        DesktopDatePickerProps<PickerValidDate>,
        'value' | 'onChange' | 'label'
      >;
    }
  | {
      pickerView: MuiDateTimePickerView.MOBILE;
      pickerProps?: Omit<
        MobileDatePickerProps<PickerValidDate>,
        'value' | 'onChange' | 'label'
      >;
    }
  | {
      pickerView: MuiDateTimePickerView.STATIC;
      pickerProps?: Omit<StaticDatePickerProps, 'value' | 'onChange'>;
    }
  | {
      pickerView?: MuiDateTimePickerView.RESPONSIVE;
      pickerProps?: Omit<
        DatePickerProps<PickerValidDate>,
        'value' | 'onChange' | 'label'
      >;
    };

export type RHFDatePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  onValueChange?: (
    newValue: PickerValidDate,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & ViewSpecificProps;

const RHFDatePicker = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  required,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  pickerView = MuiDateTimePickerView.RESPONSIVE,
  pickerProps = {},
}: RHFDatePickerProps<T>) => {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if(!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFDatePicker'));
  }

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const PickerComponent = {
    desktop: DesktopDatePicker,
    mobile: MobileDatePicker,
    static: StaticDatePicker,
    responsive: DatePicker
  }[pickerView];

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
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <PickerComponent
              {...pickerProps}
              {...fieldProps}
              value={value ?? null}
              onChange={(newValue, context) => {
                onChange(newValue);
                onValueChange?.(newValue, context);
              }}
              label={
                !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={required} />
                  )
                  : undefined
              }
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
