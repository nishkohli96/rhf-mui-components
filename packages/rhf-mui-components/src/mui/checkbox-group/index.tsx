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
  StrNumObjOption,
  CustomComponentIds
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  coerceValue,
  getOptionValue,
  useFieldIds,
  resolveLabelAboveControl
} from '@/utils';

export type RHFCheckboxGroupProps<
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
  /**
 * Custom change handler for checkbox group selection.
 *
 * Allows full control over how selected values are added or removed
 * from the current array before updating React Hook Form state.
 *
 * ⚠️ Important: You must call `rhfOnChange` manually to update the form state.
 * `onValueChange` is not invoked when using `customOnChange`.
 *
 * @param rhfOnChange - React Hook Form's internal change handler
 * @param optionValue - The value of the option being toggled
 * @param checked - Whether the option is checked or unchecked
 * @param currentValues - Current array of selected values
 * @param event - The change event triggered by the checkbox
 */
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
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: FormControlLabelProps;
  required?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  onBlur?: (event: FocusEvent<HTMLDivElement, Element>) => void;
  customIds?: CustomComponentIds;
};

const RHFCheckboxGroup = <
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
  labelKey,
  valueKey,
  renderOption,
  getOptionDisabled,
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  hideLabel,
  formLabelProps,
  checkboxProps,
  formControlLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
  customIds
}: RHFCheckboxGroupProps<T, Option, LabelKey, ValueKey>) => {
  const {
    defaultFormControlLabelSx,
    allLabelsAboveFields,
    skipValidationInEnvs
  } = useContext(RHFMuiConfigContext);

  if (!skipValidationInEnvs.includes(process.env.NODE_ENV ?? 'production')) {
    validateArray('RHFCheckboxGroup', options, labelKey, valueKey);
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
      render={({ field, fieldState: { error: fieldStateError } }) => {
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
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        const handleChange = (
          event: ChangeEvent<HTMLInputElement>,
          checked: boolean,
          optionValue: OptionValue<Option, ValueKey>
        ) => {
          const normalizedValue = coerceValue(event.target.value, optionValue);
          if (customOnChange) {
            customOnChange(
              rhfOnChange,
              normalizedValue,
              checked,
              rhfValue,
              event
            );
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
            aria-labelledby={!hideLabel ? labelId : undefined}
            aria-label={hideLabel ? String(fieldLabel) : undefined}
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
            {options.map((option, idx) => {
              const isObject = isKeyValueOption(option, labelKey, valueKey);
              const opnValue = getOptionValue<Option, ValueKey>(
                option,
                valueKey
              );
              const opnLabel = isObject
                ? String(option[labelKey!])
                : String(option);
              const checked = rhfValue.includes(opnValue);
              const isOptionDisabled
                = rhfDisabled || getOptionDisabled?.(option) || false;
              return (
                <FormControlLabel
                  key={`${opnValue}-${idx}`}
                  control={
                    <Checkbox
                      {...checkboxProps}
                      id={`${fieldId}-${opnValue}`}
                      name={fieldName}
                      value={opnValue}
                      checked={checked}
                      onChange={e =>
                        handleChange(e, e.target.checked, opnValue)}
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

export default RHFCheckboxGroup;
