import {
  useContext,
  Fragment,
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
  StrObjOption,
  StringArr
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption
} from '@/utils';

export type RHFCheckboxGroupProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: StrObjOption[];
  labelKey?: string;
  valueKey?: string;
  shouldDisableOption?: (option: StrObjOption) => boolean;
  onValueChange?: (
    selectedItemValue: string,
    newValue: string[],
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
  onBlur?: (event: React.FocusEvent<HTMLButtonElement, Element>) => void;
};

const RHFCheckboxGroup = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  shouldDisableOption,
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
  onBlur,
}: RHFCheckboxGroupProps<T>) => {
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
          const { value, onChange, onBlur: rhfOnBlur } = field;
          const handleChange = (
            event: ChangeEvent<HTMLInputElement>,
            checked: boolean
          ) => {
            const newValue = checked
              ? [...(value ?? []), event.target.value]
              : value!.filter((v: string) => v !== event.target.value);
            onChange(newValue);
            if(onValueChange) {
              onValueChange(event.target.value, newValue, event);
            }
          };
          return (
            <Fragment>
              {options.map((option, idx) => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = isObject
                  ? `${option[valueKey ?? '']}`
                  : option;
                const opnLabel = isObject
                  ? `${option[labelKey ?? '']}`
                  : option;
                const isOptionChecked = ((value as StringArr) ?? []).includes(opnValue);
                const isOptionDisabled = shouldDisableOption?.(option);
                return (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        {...checkboxProps}
                        name={fieldName}
                        value={opnValue}
                        checked={isOptionChecked}
                        aria-checked={isOptionChecked}
                        disabled={isOptionDisabled}
                        aria-disabled={isOptionDisabled}
                        onChange={e => handleChange(e, e.target.checked)}
                        onBlur={blurEvent => {
                          rhfOnBlur();
                          onBlur?.(blurEvent);
                        }}
                      />
                    }
                    label={`${opnLabel}`}
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
