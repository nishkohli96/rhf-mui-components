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
  CustomComponentIds,
  CustomOnChangeProps
} from '@/types';

type OnValueChangeProps<
  Option extends StrNumObjOption = StrNumObjOption,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >
> = {
  newValue: OptionValue<Option, ValueKey>;
  event: ChangeEvent<HTMLInputElement>;
};
import {
  fieldNameToLabel,
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
  /**
   * List of options to render as radio buttons. Best suited for smaller datasets, with
   * upto 10 options. For larger datasets, consider using `RHFAutocomplete`.
   */
  options: Option[];
  labelKey?: LabelKey;
  valueKey?: ValueKey;
  /**
   * Function to customize the label for each radio button.
   * When not provided, the option label derived from `labelKey` (or the
   * option value itself for primitive options) is rendered.
   *
   * @param option - The option being rendered.
   * @returns Custom React content to display for the option.
   */
  renderOptionLabel?: (option: Option) => ReactNode;
  /**
   * Function to dynamically disable specific option(s).
   *
   * Return `true` to disable the option and prevent it from being checked.
   *
   * @param option - The option being evaluated.
   */
  getOptionDisabled?: (option: Option) => boolean;
  /**
   * Custom change handler for radio group selection.
   *
   * Use this to intercept or transform the selected value
   * before updating React Hook Form state.
   *
   * ⚠️ Important: You must call `rhfOnChange` manually to update the form state.
   * `onValueChange` is not invoked when using `customOnChange`.
   *
   * @param rhfOnChange - React Hook Form's internal change handler
   * @param newValue - The newly selected value
   * @param event - The change event triggered by the radio input
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<
    OnValueChangeProps<Option, ValueKey>,
    OptionValue<Option, ValueKey>
  >) => void;
  onValueChange?: ({
    newValue,
    event
  }: OnValueChangeProps<Option, ValueKey>) => void;
  disabled?: boolean;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  hideLabel?: boolean;
  /**
   * Props to pass down to each Radio component. Can be used to set
   * a custom color, size, etc. for all radios in the group.
   */
  radioProps?: RadioProps;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  required?: boolean;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
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
  renderOptionLabel,
  getOptionDisabled,
  labelKey,
  valueKey,
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  radioProps,
  formControlLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
  customIds,
  ...otherRadioGroupProps
}: RHFRadioGroupProps<T, Option, LabelKey, ValueKey>) => {
  const {
    defaultFormControlLabelSx,
    allLabelsAboveFields
  } = useContext(RHFMuiConfigContext);

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
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        return (
          <FormControl
            component="fieldset"
            error={isError}
            disabled={isDisabled}
          >
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveControl}
                required={required}
                error={isError}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  component: 'legend'
                }}
              />
            )}
            <MuiRadioGroup
              {...otherRadioGroupProps}
              id={fieldId}
              name={rhfFieldName}
              value={rhfValue ?? ''}
              onChange={(event, selectedValue) => {
                const normalizedValue = normalizeSelectValue(
                  selectedValue,
                  options,
                  labelKey,
                  valueKey
                ) as OptionValue<Option, ValueKey>;
                if (customOnChange) {
                  customOnChange({
                    rhfOnChange,
                    newValue: normalizedValue,
                    event
                  });
                  return;
                }
                rhfOnChange(normalizedValue);
                onValueChange?.({ newValue: normalizedValue, event });
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
              aria-disabled={isDisabled}
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
                  = getOptionDisabled?.(option) || isDisabled || false;
                return (
                  <FormControlLabel
                    {...otherFormControlLabelProps}
                    key={opnValue}
                    control={
                      <Radio
                        {...radioProps}
                        id={`${fieldId}-${opnValue}`}
                        disabled={isOptionDisabled}
                      />
                    }
                    value={opnValue}
                    label={renderOptionLabel?.(option) ?? opnLabel}
                    disabled={isOptionDisabled}
                    sx={appliedFormControlLabelSx}
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
                ...formHelperTextProps,
                id: isError ? errorId : helperTextId
              }}
            />
          </FormControl>
        );
      }}
    />
  );
};

export default RHFRadioGroup;
