import type { ReactNode } from 'react';
import { Fragment } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type PathValue,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import type { SliderProps } from '@mui/material/Slider';
import MuiSlider from '@mui/material/Slider';
import { FormLabel, FormHelperText } from '@/mui/common';
import type { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel } from '@/utils';

type SliderInputProps = Omit<
  SliderProps,
  | 'name'
  | 'value'
  | 'onChange'
>;

export type RHFSliderProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  onValueChange?: (
    value: number | number[],
    activeThumb: number,
    event: Event,
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & SliderInputProps;

const RHFSlider = <T extends FieldValues>({
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
  ...rest
}: RHFSliderProps<T>) => {
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  return (
    <Fragment>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        required={required}
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
