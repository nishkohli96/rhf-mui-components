'use client';

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
  getOptionValue,
  useFieldIds
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
  disabled: muiDisabled,
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

  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };
  const isError = !!errorMessage;

  return (
    <FormControl component="fieldset" error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        required={required}
        error={isError}
        formLabelProps={{
          id: labelId,
          component: 'legend',
          ...formLabelProps
        }}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        disabled={muiDisabled}
        render={({
          field: {
            name: rhfFieldName,
            value: rhfValue,
            onChange: rhfOnChange,
            onBlur: rhfOnBlur,
            disabled: rhfDisabled
          }
        }) => {
          const isDisabled = muiDisabled || rhfDisabled;
          return (
            <MuiRadioGroup
              id={fieldId}
              name={rhfFieldName}
              {...rest}
              value={rhfValue ?? ''}
              onChange={(event, selectedValue) => {
                const normalizedValue = normalizeSelectValue(
                  selectedValue,
                  options,
                  labelKey,
                  valueKey
                ) as OptionValue<Option, string>;
                rhfOnChange(normalizedValue);
                if (onValueChange) {
                  onValueChange(normalizedValue, event);
                }
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              aria-labelledby={labelId}
              aria-describedby={isError ? errorId : helperTextId}
            >
              {options.map(option => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = getOptionValue<Option, ValueKey>(option, valueKey);
                const opnLabel = isObject
                  ? String(option[labelKey!])
                  : String(option);
                return (
                  <FormControlLabel
                    key={opnValue}
                    control={
                      <Radio
                        id={`${fieldId}-${opnValue}`}
                        {...radioProps}
                      />
                    }
                    value={opnValue}
                    label={opnLabel}
                    disabled={isDisabled}
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
        formHelperTextProps={{
          id: isError ? errorId : helperTextId,
          ...formHelperTextProps
        }}
      />
    </FormControl>
  );
};

export default RHFRadioGroup;
