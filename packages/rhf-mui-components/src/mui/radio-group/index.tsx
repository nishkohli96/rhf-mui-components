import { useContext, type ReactNode, type ChangeEvent } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import MuiRadioGroup, { type RadioGroupProps } from '@mui/material/RadioGroup';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/common';
import type {
  FormLabelProps,
  FormControlLabelProps,
  FormHelperTextProps,
  StrNumObjOption,
  RadioProps,
  OptionValue
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  normalizeSelectValue,
  getOptionValue
} from '@/utils';

type RadioGroupInputProps = Omit<
  RadioGroupProps,
  | 'name'
  | 'value'
  | 'onChange'
>;

export type RHFRadioGroupProps<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  labelKey?: LabelKey;
  valueKey?: ValueKey;
  onValueChange?: (
    selectedValue: string,
    event: ChangeEvent<HTMLInputElement>
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

const RHFRadioGroup = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>
>({
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
    onBlur,
    ...rest
  }: RHFRadioGroupProps<T, Option, LabelKey, ValueKey>) => {
  validateArray('RHFRadioGroup', options, labelKey, valueKey);

  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
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
          const {
            value,
            onChange,
            onBlur: rhfOnBlur,
            ...otherFieldParams
          } = field;
          return (
            <MuiRadioGroup
              {...rest}
              {...otherFieldParams}
              value={value ?? ''}
              onChange={(event, selectedValue) => {
                const normalizedValue = normalizeSelectValue(
                  selectedValue,
                  options,
                  labelKey,
                  valueKey
                ) as OptionValue<Option, string>;
                onChange(normalizedValue);
                if (onValueChange) {
                  onValueChange(normalizedValue, event);
                }
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              aria-disabled={disabled}
            >
              {options.map((option, idx) => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = getOptionValue<Option, ValueKey>(option, valueKey);
                const opnLabel = isObject
                  ? String(option[labelKey!])
                  : String(option);
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
