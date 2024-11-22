import { useContext, ReactNode, ChangeEvent } from 'react';
import { Controller, Control, FieldValues, RegisterOptions, Path } from 'react-hook-form';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import Radio, { RadioProps } from '@mui/material/Radio';
import MuiRadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormLabelProps, OptionType } from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption
} from '@/utils';
import { FormControl, FormLabel, FormHelperText } from '../common';

export type RHFRadioGroupProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  onValueChange?: (
    selectedValue: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
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
  registerOptions,
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
    <FormControl error={isError}>
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
        render={({ field }) => {
          const { onChange, ...otherFieldParams } = field;
          return (
            <MuiRadioGroup
              {...rest}
              {...otherFieldParams}
              value={field.value ?? ''}
              onChange={(event, selectedValue) => {
                onChange(event);
                if(onValueChange) {
                  onValueChange(selectedValue, event);
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

          );
        }}
      />
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

export default RHFRadioGroup;
