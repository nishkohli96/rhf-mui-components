import { useContext, ReactNode, ChangeEvent } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import MuiRadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import {
  FormLabelProps,
  FormControlLabelProps,
  FormHelperTextProps,
  OptionType,
  RadioProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption
} from '@/utils';

type RadioGroupInputProps = Omit<
  RadioGroupProps,
  | 'name'
  | 'value'
  | 'onChange'
>;

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
  disabled?: boolean;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  radioProps?: RadioProps;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  required?: boolean;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & RadioGroupInputProps;

const RHFRadioGroup = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  onValueChange,
  disabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  radioProps,
  formControlLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...rest
}: RHFRadioGroupProps<T>) => {
  validateArray('RHFRadioGroup', options, labelKey, valueKey);

  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx,
  };

  return (
    <FormControl error={isError}>
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
              aria-disabled={disabled}
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
                    disabled={disabled}
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
