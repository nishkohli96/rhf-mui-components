import { Fragment, ReactNode } from 'react';
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
import withConfigHOC from '../../config/withConfig';
import { RHFMuiConfig } from '../../types';
import { fieldNameToLabel } from '../../utils';

export type RHFSliderProps<T extends FieldValues> = {
  fieldName: Path<T>;
  defaultValue: number | number[];
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions;
  onValueChange?: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  errorMsg?: ReactNode;
  hideErrorMsg?: boolean;
  helperText?: ReactNode;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<SliderProps, 'name' | 'defaultValue'>;

function Slider<T extends FieldValues>(
  props: RHFSliderProps<T> & RHFMuiConfig
) {
  const {
    fieldName,
    defaultValue,
    register,
    registerOptions,
    onValueChange,
    label,
    showLabelAboveFormField,
    errorMsg,
    hideErrorMsg,
    helperText,
    formLabelProps,
    formHelperTextProps,
    defaultFormLabelSx,
    defaultFormHelperTextSx,
    min,
    max,
    ...rest
  } = props;
  const isError = Boolean(errorMsg);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

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
        errorMsg={errorMsg}
        hideErrorMsg={hideErrorMsg}
        helperText={helperText}
        defaultFormHelperTextSx={defaultFormHelperTextSx}
        formHelperTextProps={formHelperTextProps}
      />
    </Fragment>
  );
}

export const RHFSlider = withConfigHOC(Slider);
