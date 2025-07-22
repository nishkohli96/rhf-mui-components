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
  MobileTimePicker,
  StaticTimePicker,
  DesktopTimePicker,
  type TimePickerProps as MuiTimePickerProps,
  type MobileTimePickerProps as MuiMobileTimePickerProps,
  type StaticTimePickerProps as MuiStaticTimePickerProps,
  type DesktopTimePickerProps as MuiDesktopTimePickerProps,
  type PickerValidDate,
  type TimeValidationError,
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

type DesktopTimePickerProps = Omit<
  MuiDesktopTimePickerProps<PickerValidDate>,
  'value' | 'onChange' | 'label'
>;

type MobileTimePickerProps = Omit<
  MuiMobileTimePickerProps<PickerValidDate>,
  'value' | 'onChange' | 'label'
>;

type StaticTimePickerProps = Omit<
  MuiStaticTimePickerProps,
  'value' | 'onChange'
>;

type TimePickerProps = Omit<
  MuiTimePickerProps<PickerValidDate>,
  'value' | 'onChange' | 'label'
>;

type ViewSpecificProps =
  | {
      pickerView: MuiDateTimePickerView.DESKTOP;
      pickerProps?: DesktopTimePickerProps;
    }
  | {
      pickerView: MuiDateTimePickerView.MOBILE;
      pickerProps?: MobileTimePickerProps;
    }
  | {
      pickerView: MuiDateTimePickerView.STATIC;
      pickerProps?: StaticTimePickerProps;
    }
  | {
      pickerView?: MuiDateTimePickerView.RESPONSIVE;
      pickerProps?: TimePickerProps;
    };

export type RHFTimePickerProps<T extends FieldValues> = {
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
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & ViewSpecificProps;

const RHFTimePicker = <T extends FieldValues>({
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
}: RHFTimePickerProps<T>) => {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if (!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFTimePicker'));
  }

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

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
          render={({ field: { onChange, value, ...fieldProps } }) => {
            const commonProps = {
              ...fieldProps,
              value: value ?? null,
              onChange: (newValue: PickerValidDate, context: PickerChangeHandlerContext<TimeValidationError>) => {
                onChange(newValue);
                onValueChange?.(newValue, context);
              },
              label: !isLabelAboveFormField
                ? <FormLabelText label={fieldLabel} required={required} />
                : undefined,
            };

            switch (pickerView) {
              case MuiDateTimePickerView.DESKTOP:
                return <DesktopTimePicker {...(pickerProps as DesktopTimePickerProps)} {...commonProps} />;
              case MuiDateTimePickerView.MOBILE:
                return <MobileTimePicker {...(pickerProps as MobileTimePickerProps)} {...commonProps} />;
              case MuiDateTimePickerView.STATIC:
                return <StaticTimePicker {...(pickerProps as StaticTimePickerProps)} {...commonProps} />;
              default:
                return <MuiTimePicker {...(pickerProps as TimePickerProps)} {...commonProps} />;
            }
          }}
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

export default RHFTimePicker;
