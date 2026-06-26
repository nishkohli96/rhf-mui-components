'use client';

import {
  useContext,
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
  event: ChangeEvent<HTMLInputElement>;
  newValue: OptionValue<Option, ValueKey>[];
  toggledValue: OptionValue<Option, ValueKey>;
  checked: boolean;
};

type CheckboxGroupCustomOnChangeProps<
  Option extends StrNumObjOption = StrNumObjOption,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >
> = {
  toggledValue: OptionValue<Option, ValueKey>;
  checked: boolean;
  currentValue: OptionValue<Option, ValueKey>[];
  event: ChangeEvent<HTMLInputElement>;
};
import {
  fieldNameToLabel,
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
  /**
   * Name/path of the React Hook Form field this component controls.
   */
  fieldName: Path<T>;
  /**
   * React Hook Form control object returned by `useForm`.
   */
  control: Control<T>;
  /**
   * Validation rules passed to React Hook Form for this field.
   */
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * List of options to render as checkboxes. Best suited for smaller datasets, with
   * upto 10 options. For larger datasets, consider using `RHFMultiAutocomplete`.
   */
  options: Option[];
  /**
   * Object key used to read the display label from each option.
   */
  labelKey?: LabelKey;
  /**
   * Object key used to derive the stored field value when options are an array of objects.
   */
  valueKey?: ValueKey;
  /**
   * Function to customize the label for each checkbox.
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
   * Overrides the default checkbox group toggle handling.
   * Receives the current array value, the toggled option value, and the next checked state for that option.
   * Build the next array and call `rhfOnChange` with the value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the checkbox group array.
   * @param event - Original checkbox change event.
   * @param currentValue - Current checkbox group value before the toggle is applied.
   * @param toggledValue - Option value for the checkbox that was toggled.
   * @param checked - Checked state after the toggle.
   */
  customOnChange?: ({
    rhfOnChange,
    event,
    currentValue,
    toggledValue,
    checked
  }: CustomOnChangeProps<
    CheckboxGroupCustomOnChangeProps<Option, ValueKey>,
    OptionValue<Option, ValueKey>[]
  >) => void;
  /**
   * Called after the default checkbox group handler stores the next array value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param event - Original checkbox change event.
   * @param newValue - Next checkbox group array value.
   * @param toggledValue - Option value for the checkbox that was toggled.
   * @param checked - Checked state after the toggle.
   */
  onValueChange?: ({
    event,
    newValue,
    toggledValue,
    checked
  }: OnValueChangeProps<Option, ValueKey>) => void;
  /**
   * When true, disables the field and associated controls.
   */
  disabled?: boolean;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
  /**
   * Props to pass down to each Checkbox component. Can be used to set
   * a custom color, size, etc. for all checkboxes in the group.
   */
  checkboxProps?: CheckboxProps;
  /**
   * Props forwarded to each internal MUI `FormControlLabel`.
   */
  formControlLabelProps?: FormControlLabelProps;
  /**
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Callback fired when focus leaves the checkbox group.
   */
  onBlur?: (event: FocusEvent<HTMLDivElement, Element>) => void;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
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
  renderOptionLabel,
  getOptionDisabled,
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  checkboxProps,
  formControlLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur: muiOnBlur,
  customIds
}: RHFCheckboxGroupProps<T, Option, LabelKey, ValueKey>) => {
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
        field,
        fieldState: { error: fieldStateError }
      }) => {
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
        const isDisabled = muiDisabled || rhfDisabled;
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
            customOnChange({
              rhfOnChange,
              toggledValue: normalizedValue,
              checked,
              currentValue: rhfValue,
              event
            });
            return;
          }
          const newValue = checked
            ? rhfValue.includes(normalizedValue)
              ? rhfValue
              : [...rhfValue, normalizedValue]
            : rhfValue.filter(v => v !== normalizedValue);
          rhfOnChange(newValue);
          onValueChange?.({
            toggledValue: normalizedValue,
            newValue,
            event,
            checked
          });
        };

        return (
          <FormControl
            component="fieldset"
            aria-labelledby={!hideLabel ? labelId : undefined}
            aria-label={hideLabel ? String(fieldLabel) : undefined}
            error={isError}
            disabled={isDisabled}
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
                muiOnBlur?.(e);
              }
            }}
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
                = isDisabled || getOptionDisabled?.(option) || false;
              return (
                <FormControlLabel
                  {...otherFormControlLabelProps}
                  key={`${opnValue}-${idx}`}
                  control={
                    <Checkbox
                      {...checkboxProps}
                      id={`${fieldId}-${opnValue}`}
                      name={fieldName}
                      value={opnValue}
                      checked={checked}
                      disabled={isOptionDisabled}
                      onChange={e =>
                        handleChange(e, e.target.checked, opnValue)}
                    />
                  }
                  label={renderOptionLabel?.(option) ?? opnLabel}
                  sx={appliedFormControlLabelSx}
                  disabled={isOptionDisabled}
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

export default RHFCheckboxGroup;
