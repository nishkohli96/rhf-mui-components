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
  StrObjOption
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
  Option extends StrObjOption = StrObjOption,
  LabelKey extends string | undefined = undefined,
  ValueKey extends string | undefined = undefined,
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  labelKey?: LabelKey;
  valueKey?: ValueKey;
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
  Option extends StrObjOption = StrObjOption,
  LabelKey extends string | undefined = undefined,
  ValueKey extends string | undefined = undefined
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
            onChange,
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
            const normalized = coerceValue(event.target.value, optionValue);
            const newValue = checked
              ? [...value, normalized]
              : value.filter(v => v !== normalized);
            onChange(newValue);
            onValueChange?.(normalized, newValue, event);
          };
          return (
            <Fragment>
              {options.map((option, idx) => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = getOptionValue<Option, ValueKey>(option, valueKey);
                const opnLabel = isObject
                  ? String(option[labelKey!])
                  : String(option);
                const checked = value.includes(opnValue);
                return (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        {...checkboxProps}
                        name={fieldName}
                        value={opnValue}
                        checked={checked}
                        onChange={e => handleChange(e, e.target.checked, opnValue)}
                        onBlur={blurEvent => {
                          rhfOnBlur();
                          onBlur?.(blurEvent);
                        }}
                      />
                    }
                    label={opnLabel}
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
