import { ReactNode, ChangeEvent } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import Radio, { RadioProps } from '@mui/material/Radio';
import MuiRadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig, OptionType } from '../../../types';
import { fieldNameToLabel, validateArray, isKeyValueOption } from '../../../utils';

export type RHFRadioGroupProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  formControlLabelProps?: Omit<
    FormControlLabelProps,
    'control' | 'label' | 'value'
  >;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
  radioProps?: RadioProps;
} & Omit<RadioGroupProps, 'name' | 'value' | 'onChange'>;

function RadioGroup<T extends FieldValues>({
  fieldName,
  control,
  options,
  labelKey,
  valueKey,
  onValueChange,
  label,
  showLabelAboveFormField,
  helperText,
  errorMessage,
  hideErrorMessage,
  formLabelProps,
  formControlLabelProps,
  formHelperTextProps,
  radioProps,
  defaultFormLabelSx,
  defaultFormHelperTextSx,
  ...rest
}: RHFRadioGroupProps<T> & RHFMuiConfig) {
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);
  validateArray('RHFRadioGroup', options, labelKey, valueKey);

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => {
        const { onChange, ...otherFieldParams } = field;
        return (
          <FormControl error={isError}>
            <FormLabel
              label={fieldLabel}
              isVisible={showLabelAboveFormField ?? true}
              error={isError}
              formLabelProps={formLabelProps}
              defaultFormLabelSx={defaultFormLabelSx}
            />
            <MuiRadioGroup
              {...rest}
              {...otherFieldParams}
              onChange={(e, value) => {
                onChange(e);
                onValueChange && onValueChange(e, value);
              }}
            >
              {options.map((option, idx) => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = isObject ? `${option[valueKey ?? '']}` : option;
                const opnLabel = isObject ? `${option[labelKey ?? '']}` : option;
                return (
                <FormControlLabel
                  key={idx}
                  control={<Radio {...radioProps} />}
                  value={opnValue}
                  label={opnLabel}
                  {...formControlLabelProps}
                />
              )})}
            </MuiRadioGroup>
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              defaultFormHelperTextSx={defaultFormHelperTextSx}
              formHelperTextProps={formHelperTextProps}
            />
          </FormControl>
        );
      }}
    />
  );
}

export const RHFRadioGroup = withConfigHOC(RadioGroup);
