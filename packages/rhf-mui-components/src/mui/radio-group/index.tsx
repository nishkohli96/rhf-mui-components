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
  OptionValue,
  CustomComponentIds
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  normalizeSelectValue,
  getOptionValue,
  useFieldIds,
  resolveLabelAboveControl
} from '@/utils';

type RadioGroupInputProps = Omit<
  RadioGroupProps,
  'name' | 'value' | 'onChange'
>;

export type RHFRadioGroupProps<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
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
    rhfOnChange: (value: OptionValue<Option, string>) => void,
    selectedValue: OptionValue<Option, string>,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  onValueChange?: (
    selectedValue: OptionValue<Option, string>,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  disabled?: boolean;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  radioProps?: RadioProps;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  required?: boolean;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  customIds?: CustomComponentIds;
} & RadioGroupInputProps;

const RHFRadioGroup = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
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
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  hideLabel,
  formLabelProps,
  radioProps,
  formControlLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
  customIds,
  ...rest
}: RHFRadioGroupProps<T, Option, LabelKey, ValueKey>) => {
  const {
    defaultFormControlLabelSx,
    allLabelsAboveFields,
    skipValidationInEnvs
  } = useContext(RHFMuiConfigContext);
  if (!skipValidationInEnvs.includes(process.env.NODE_ENV ?? 'production')) {
    validateArray('RHFRadioGroup', options, labelKey, valueKey);
  }

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );

  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };

  return (
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
        },
        fieldState: { error: fieldStateError }
      }) => {
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        return (
          <FormControl component="fieldset" error={isError}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveControl}
                required={required}
                error={isError}
                formLabelProps={{
                  id: labelId,
                  component: 'legend',
                  ...formLabelProps
                }}
              />
            )}
            <MuiRadioGroup
              id={fieldId}
              name={rhfFieldName}
              value={rhfValue ?? ''}
              onChange={(event, selectedValue) => {
                const normalizedValue = normalizeSelectValue(
                  selectedValue,
                  options,
                  labelKey,
                  valueKey
                ) as OptionValue<Option, string>;
                if (customOnChange) {
                  customOnChange(rhfOnChange, normalizedValue, event);
                  return;
                }
                rhfOnChange(normalizedValue);
                onValueChange?.(normalizedValue, event);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              aria-required={required || undefined}
              aria-labelledby={!hideLabel ? labelId : undefined}
              aria-label={hideLabel ? String(fieldLabel) : undefined}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              {...rest}
            >
              {options.map(option => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = getOptionValue<Option, ValueKey>(
                  option,
                  valueKey
                );
                const opnLabel = isObject
                  ? String(option[labelKey!])
                  : String(option);
                const isOptionDisabled
                  = getOptionDisabled?.(option) || rhfDisabled || false;
                return (
                  <FormControlLabel
                    key={opnValue}
                    control={
                      <Radio id={`${fieldId}-${opnValue}`} {...radioProps} />
                    }
                    value={opnValue}
                    label={renderOption?.(option) ?? opnLabel}
                    disabled={isOptionDisabled}
                    sx={appliedFormControlLabelSx}
                    {...otherFormControlLabelProps}
                  />
                );
              })}
            </MuiRadioGroup>
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              showHelperTextElement={showHelperTextElement}
              formHelperTextProps={{
                id: isError ? errorId : helperTextId,
                ...formHelperTextProps
              }}
            />
          </FormControl>
        );
      }}
    />
  );
};

export default RHFRadioGroup;
