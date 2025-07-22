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
  DateTimePicker,
  MobileDateTimePicker,
  DesktopDateTimePicker,
  StaticDateTimePicker,
  type DateTimePickerProps,
  type MobileDateTimePickerProps,
  type DesktopDateTimePickerProps,
  type StaticDateTimePickerProps,
  type PickerValidDate,
  type DateTimeValidationError,
  type PickerChangeHandlerContext
} from '@mui/x-date-pickers';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormLabelText, FormHelperText } from '@/mui/common';
import { MuiDateTimePickerView, type FormLabelProps, type FormHelperTextProps } from '@/types';
import {
  fieldNameToLabel,
  generateDateAdapterErrMsg,
  keepLabelAboveFormField
} from '@/utils';

type ViewSpecificProps =
  | {
      pickerView: MuiDateTimePickerView.DESKTOP;
      pickerProps?: Omit<
        DesktopDateTimePickerProps<PickerValidDate>,
        'value' | 'onChange' | 'label'
      >;
    }
  | {
      pickerView: MuiDateTimePickerView.MOBILE;
      pickerProps?: Omit<
        MobileDateTimePickerProps<PickerValidDate>,
        'value' | 'onChange' | 'label'
      >;
    }
  | {
      pickerView: MuiDateTimePickerView.STATIC;
      pickerProps?: Omit<StaticDateTimePickerProps, 'value' | 'onChange'>;
    }
  | {
      pickerView?: MuiDateTimePickerView.RESPONSIVE;
      pickerProps?: Omit<
        DateTimePickerProps<PickerValidDate>,
        'value' | 'onChange' | 'label'
      >;
    };

export type RHFDateTimePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  onValueChange?: (
    newValue: PickerValidDate,
    context: PickerChangeHandlerContext<DateTimeValidationError>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & ViewSpecificProps;

const RHFDateTimePicker = <T extends FieldValues>({
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
}: RHFDateTimePickerProps<T>) => {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if(!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFDateTimePicker'));
  }

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const PickerComponent = {
    desktop: DesktopDateTimePicker,
    mobile: MobileDateTimePicker,
    static: StaticDateTimePicker,
    responsive: DateTimePicker
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
          render={({ field: { onChange, value, ...fieldProps } }) => (
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

export default RHFDateTimePicker;
