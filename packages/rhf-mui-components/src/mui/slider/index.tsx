import { Fragment, ReactNode } from 'react';
import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import MuiSlider, { SliderProps } from '@mui/material/Slider';
import { fieldNameToLabel } from '@/utils';
import { FormLabel, FormHelperText } from '../common';

export type RHFSliderProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    value: number | number[],
    activeThumb: number,
    event: Event,
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<SliderProps, 'name' | 'value' | 'onChange'>;

const RHFSlider = <T extends FieldValues>({
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
}: RHFSliderProps<T>) => {
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  return (
    <Fragment>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value, ...otherFieldProps } }) => (
          <MuiSlider
            {...otherFieldProps}
            {...rest}
            value={value ?? 0}
            onChange={(event, value, activeThumb) => {
              onChange(value);
              if (onValueChange) {
                onValueChange(value, activeThumb, event);
              }
            }}
          />
        )}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </Fragment>
  );
};

export default RHFSlider;
