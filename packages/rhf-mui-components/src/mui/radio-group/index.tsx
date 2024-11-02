import { useContext, ReactNode, ChangeEvent } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import Radio, { RadioProps } from '@mui/material/Radio';
import MuiRadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { OptionType } from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption
} from '@/utils';
import { FormControl, FormLabel, FormHelperText } from '../common';

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

const RHFRadioGroup = <T extends FieldValues>({
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
}: RHFRadioGroupProps<T>) => {
  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx,
  };

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
            />
            <MuiRadioGroup
              {...rest}
              {...otherFieldParams}
              onChange={(e, value) => {
                onChange(e);
                if(onValueChange) {
                  onValueChange(e, value);
                }
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
                    sx={appliedFormControlLabelSx}
                    {...otherFormControlLabelProps}
                  />
                );
              })}
            </MuiRadioGroup>
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              formHelperTextProps={formHelperTextProps}
            />
          </FormControl>
        );
      }}
    />
  );
}

export default RHFRadioGroup;
