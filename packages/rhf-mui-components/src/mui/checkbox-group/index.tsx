import { useContext, Fragment, ReactNode, ChangeEvent } from 'react';
import {
  FieldValues,
  Controller,
  Control,
  RegisterOptions,
  Path
} from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import {
  FormLabelProps,
  FormHelperTextProps,
  FormControlLabelProps,
  OptionType
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
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  onValueChange?: (
    selectedItemValue: string,
    newValue: string,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
};

const RHFCheckboxGroup = <T extends FieldValues>({
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
  checkboxProps,
  formControlLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps
}: RHFCheckboxGroupProps<T>) => {
  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };

  validateArray('RHFCheckboxGroup', options, labelKey, valueKey);

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
          const { value, onChange } = field;
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
                return (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        {...checkboxProps}
                        checked={(
                          (value as (string | number)[]) ?? []
                        ).includes(opnValue)}
                        onChange={e => handleChange(e, e.target.checked)}
                        value={opnValue}
                      />
                    }
                    label={`${opnLabel}`}
                    sx={appliedFormControlLabelSx}
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
