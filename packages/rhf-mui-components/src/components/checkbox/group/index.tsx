import { Fragment, ReactNode, ChangeEvent } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig, OptionType } from '../../../types';
import { fieldNameToLabel, validateArray, isKeyValueOption } from '../../../utils';

export type RHFCheckboxGroupProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>, newValue: string) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  formControlLabelProps?: Omit<
    FormControlLabelProps,
    'control' | 'label' | 'value'
  >;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
  checkboxProps?: CheckboxProps;
};

function CheckboxGroup<T extends FieldValues>({
  fieldName,
  control,
  options,
  labelKey,
  valueKey,
  onValueChange,
  label,
  showLabelAboveFormField,
  helperText,
  errorMessage,
  hideErrorMessage,
  formLabelProps,
  formHelperTextProps,
  formControlLabelProps,
  checkboxProps,
  defaultFormLabelSx,
  defaultFormHelperTextSx
}: RHFCheckboxGroupProps<T> & RHFMuiConfig) {
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);
  validateArray('RHFCheckboxGroup', options, labelKey, valueKey)

  return (
    <Controller
      name={fieldName}
      control={control}
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
          onValueChange && onValueChange(event, event.target.value);
        };
        return (
          <FormControl error={isError}>
            <FormLabel
              label={fieldLabel}
              isVisible={showLabelAboveFormField}
              error={isError}
              formLabelProps={formLabelProps}
              defaultFormLabelSx={defaultFormLabelSx}
            />
            <Fragment>
              {options.map((option, idx) => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = isObject ? `${option[valueKey ?? '']}` : option;
                const opnLabel = isObject ? `${option[labelKey ?? '']}` : option;
                return (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        {...checkboxProps}
                        checked={(
                          (value as (string | number)[]) ?? []
                        ).includes(opnValue)}
                        onChange={(e) => handleChange(e, e.target.checked)}
                        value={opnValue}
                      />
                    }
                    label={`${opnLabel}`}
                    {...formControlLabelProps}
                  />
                );
              })}
            </Fragment>
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

export const RHFCheckboxGroup = withConfigHOC(CheckboxGroup);
