'use client';

import {
  useContext,
  Fragment,
  type FocusEvent,
  type ReactNode,
  type ChangeEvent
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  FormControlLabelProps,
  CheckboxProps,
  OptionValue,
  StrNumObjOption
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  coerceValue,
  getOptionValue
} from '@/utils';

export type RHFCheckboxGroupProps<
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
  renderOption?: (option: Option) => ReactNode;
  getOptionDisabled?: (option: Option) => boolean;
  customOnChange?: (
    rhfOnChange: (newValues: OptionValue<Option, ValueKey>[]) => void,
    optionValue: OptionValue<Option, ValueKey>,
    checked: boolean,
    currentValues: OptionValue<Option, ValueKey>[],
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  onValueChange?: (
    selectedItemValue: OptionValue<Option, ValueKey>,
    newValue: OptionValue<Option, ValueKey>[],
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  disabled?: boolean;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: FormControlLabelProps;
  required?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  onBlur?: (event: FocusEvent<HTMLButtonElement, Element>) => void;
};

const RHFCheckboxGroup = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>
>({
  fieldName,
  control,
  registerOptions,
  options,
  renderOption,
  getOptionDisabled,
  labelKey,
  valueKey,
  customOnChange,
  onValueChange,
  disabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  checkboxProps,
  formControlLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur
}: RHFCheckboxGroupProps<T, Option, LabelKey, ValueKey>) => {
  validateArray('RHFCheckboxGroup', options, labelKey, valueKey);

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
            value = [],
            onChange: rhfOnChange,
            onBlur: rhfOnBlur
          } = field as {
            value: OptionValue<Option, ValueKey>[];
            onChange: (v: OptionValue<Option, ValueKey>[]) => void;
            onBlur: () => void;
          };

          const handleChange = (
            event: ChangeEvent<HTMLInputElement>,
            checked: boolean,
            optionValue: OptionValue<Option, ValueKey>
          ) => {
            const normalizedValue = coerceValue(event.target.value, optionValue);
            if(customOnChange) {
              customOnChange(rhfOnChange, normalizedValue, checked, value, event);
              return;
            }
            const newValue = checked
              ? [...value, normalizedValue]
              : value.filter(v => v !== normalizedValue);
            rhfOnChange(newValue);
            onValueChange?.(normalizedValue, newValue, event);
          };

          return (
            <Fragment>
              {options.map(option => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = getOptionValue<Option, ValueKey>(option, valueKey);
                const opnLabel = isObject
                  ? String(option[labelKey!])
                  : String(option);
                const checked = value.includes(opnValue);
                const isOptionDisabled = getOptionDisabled?.(option);
                return (
                  <FormControlLabel
                    key={opnValue}
                    control={
                      <Checkbox
                        {...checkboxProps}
                        name={fieldName}
                        value={opnValue}
                        checked={checked}
                        aria-checked={checked}
                        disabled={isOptionDisabled}
                        aria-disabled={isOptionDisabled}
                        onChange={e => handleChange(e, e.target.checked, opnValue)}
                        onBlur={blurEvent => {
                          rhfOnBlur();
                          onBlur?.(blurEvent);
                        }}
                      />
                    }
                    label={renderOption?.(option) ?? opnLabel}
                    sx={appliedFormControlLabelSx}
                    disabled={disabled}
                    {...otherFormControlLabelProps}
                  />
                );
              })}
            </Fragment>
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

export default RHFCheckboxGroup;
