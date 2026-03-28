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
  getOptionValue,
  useFieldIds
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
  onBlur?: (event: FocusEvent<HTMLDivElement, Element>) => void;
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
  labelKey,
  valueKey,
  renderOption,
  getOptionDisabled,
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
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

  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };
  const isError = !!errorMessage;
  const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      disabled={muiDisabled}
      render={({ field }) => {
        const {
          value,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          disabled: rhfDisabled
        } = field as {
          value: OptionValue<Option, ValueKey>[];
          onChange: (v: OptionValue<Option, ValueKey>[]) => void;
          onBlur: () => void;
          disabled: boolean;
        };
        const rhfValue = value ?? [];

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
            ? rhfValue.includes(normalizedValue)
              ? rhfValue
              : [...rhfValue, normalizedValue]
            : rhfValue.filter(v => v !== normalizedValue);
          rhfOnChange(newValue);
          onValueChange?.(normalizedValue, newValue, event);
        };

        return (
          <FormControl
            component="fieldset"
            error={isError}
            /**
             * Trigger blur event only if focus is moving OUTSIDE
             * the checkbox group, instead of calling onBlur for
             * every checkbox.
             */
            onBlur={e => {
              const currentTarget = e.currentTarget;
              const relatedTarget = e.relatedTarget as Node | null;
              if (!currentTarget.contains(relatedTarget)) {
                rhfOnBlur();
                onBlur?.(e);
              }
            }}
          >
            <Fragment>
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
              {options.map((option, idx) => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = getOptionValue<Option, ValueKey>(option, valueKey);
                const opnLabel = isObject
                  ? String(option[labelKey!])
                  : String(option);
                const checked = rhfValue.includes(opnValue);
                const isOptionDisabled = rhfDisabled || getOptionDisabled?.(option);
                return (
                  <FormControlLabel
                    key={`${opnValue}-${idx}`}
                    control={
                      <Checkbox
                        {...checkboxProps}
                        id={`${fieldId}-${opnValue}`}
                        name={`${fieldName}-${idx}`}
                        value={opnValue}
                        checked={checked}
                        onChange={e => handleChange(e, e.target.checked, opnValue)}
                      />
                    }
                    label={renderOption?.(option) ?? opnLabel}
                    sx={appliedFormControlLabelSx}
                    disabled={isOptionDisabled}
                    {...otherFormControlLabelProps}
                  />
                );
              })}
              <FormHelperText
                error={isError}
                errorMessage={errorMessage}
                hideErrorMessage={hideErrorMessage}
                helperText={helperText}
                showHelperTextElement={showHelperTextElement}
                formHelperTextProps={{
                  id: isError ? errorId : helperTextId,
                  ...formHelperTextProps
                }}
              />
            </Fragment>
          </FormControl>
        );
      }}
    />
  );
};

export default RHFCheckboxGroup;
