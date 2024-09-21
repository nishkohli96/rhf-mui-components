import { useContext, Fragment, ReactNode } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues
} from 'react-hook-form';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import MuiSlider, { SliderProps } from '@mui/material/Slider';
import { FormLabel, FormHelperText } from '../common';
import { RHFMuiConfigContext } from '../../config';
import { fieldNameToLabel } from '../../utils';

export type RHFSliderProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  defaultValue: number | number[];
  onValueChange?: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<SliderProps, 'name' | 'defaultValue'>;

export default function RHFSlider<T extends FieldValues>({
  fieldName,
  defaultValue,
  register,
  registerOptions,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  min,
  max,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...rest
}: RHFSliderProps<T>
) {
  const { defaultFormLabelSx, defaultFormHelperTextSx } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const { onChange, name } = register(fieldName, registerOptions);

  return (
    <Fragment>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        error={isError}
        formLabelProps={formLabelProps}
        defaultFormLabelSx={defaultFormLabelSx}
      />
      <MuiSlider
        min={Number(min)}
        max={Number(max)}
        defaultValue={defaultValue}
        name={name}
        {...rest}
        onChange={(event, value, activeThumb) => {
          onChange(event);
          onValueChange && onValueChange(event, value, activeThumb);
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        defaultFormHelperTextSx={defaultFormHelperTextSx}
        formHelperTextProps={formHelperTextProps}
      />
    </Fragment>
  );
}
