import { useContext, ReactNode, ChangeEvent } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import Radio, { RadioProps } from '@mui/material/Radio';
import MuiRadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import { RHFMuiConfigContext } from '../../../config/ConfigProvider';
import { OptionType } from '../../../types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption
} from '../../../utils';

export type RHFRadioGroupProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  radioProps?: RadioProps;
  formControlLabelProps?: Omit<
    FormControlLabelProps,
    'control' | 'label' | 'value'
  >;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<RadioGroupProps, 'name' | 'value' | 'onChange'>;

export function RHFRadioGroup<T extends FieldValues>({
  fieldName,
  control,
  options,
  labelKey,
  valueKey,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  radioProps,
  formControlLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...rest
}: RHFRadioGroupProps<T>) {
  const { defaultFormLabelSx, defaultFormHelperTextSx } = useContext(RHFMuiConfigContext);
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
                const opnValue = isObject
                  ? `${option[valueKey ?? '']}`
                  : option;
                const opnLabel = isObject
                  ? `${option[labelKey ?? '']}`
                  : option;
                return (
                  <FormControlLabel
                    key={idx}
                    control={<Radio {...radioProps} />}
                    value={opnValue}
                    label={opnLabel}
                    {...formControlLabelProps}
                  />
                );
              })}
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
