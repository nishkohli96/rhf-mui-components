'use client';

import {
  useContext,
  type FocusEvent,
  type ReactNode,
  type ChangeEvent
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MUICheckboxGroup from '@nish1896/mui-components/mui/checkbox-group';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type FormControlLabelProps,
  type CheckboxProps,
  type CustomOnChangeProps,
  type OptionValue,
  type OptionRenderState
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { StrNumObjOption, CustomComponentIds } from '@nish1896/mui-components/types';
import {
  mergeSx,
  resolveLabelAboveControl,
  resolveRequired
} from '@/utils';

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
   * Function to customize the label for each checkbox.
   * When not provided, the option label derived from `labelKey` (or the
   * option value itself for primitive options) is rendered.
   *
   * @param option - The option being rendered.
   * @returns Custom React content to display for the option.
   */
  renderOptionLabel?: (option: Option, state: OptionRenderState) => ReactNode;
  /**
   * Function to dynamically disable specific option(s).
   *
   * Return `true` to disable the option and prevent it from being checked.
   *
   * @param option - The option being evaluated.
   */
  getOptionDisabled?: (option: Option) => boolean;
  /**
   * When true, disables the field and associated controls.
   */
  disabled?: boolean;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /*
   * Whether the field label renders above the checkbox group. The group has no
   * built-in inline label, so this defaults to `true`; pass `false` to hide the
   * visible label (the accessible name is still applied).
   *
   * @default true
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
   * Custom renderer for the React Hook Form field error.
   * Receives the current field error and must return renderable content, such as `error.message` or a custom element.
   *
   * @param error - React Hook Form field error for this field.
   */
  renderError?: (error: FieldError) => ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
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
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  onBlur: muiOnBlur,
  customIds
}: RHFCheckboxGroupProps<T, Option, LabelKey, ValueKey>) => {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx,
    defaultFormControlLabelSx
  } = useContext(RHFMuiConfigContext);

  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const isFieldRequired = resolveRequired(required, registerOptions?.required);

  const {
    sx: formLabelSx,
    ...otherFormLabelProps
  } = formLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};
  const {
    sx: formControlLabelSx,
    ...otherFormControlLabelProps
  } = formControlLabelProps ?? {};

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

        return (
          <MUICheckboxGroup
            fieldName={fieldName}
            options={options}
            labelKey={labelKey}
            valueKey={valueKey}
            value={rhfValue}
            onValueChange={({ event, newValue, toggledValue, checked }) => {
              if (customOnChange) {
                customOnChange({
                  rhfOnChange,
                  toggledValue,
                  checked,
                  currentValue: rhfValue,
                  event
                });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ toggledValue, newValue, event, checked });
            }}
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent);
            }}
            renderOptionLabel={renderOptionLabel}
            getOptionDisabled={getOptionDisabled}
            disabled={isDisabled}
            label={label}
            showLabelAboveFormField={isLabelAboveControl}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            checkboxProps={checkboxProps}
            formControlLabelProps={{
              ...otherFormControlLabelProps,
              sx: mergeSx(defaultFormControlLabelSx, formControlLabelSx)
            }}
            required={isFieldRequired}
            errorMessage={fieldStateError?.message?.toString()}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            hideErrorMessage={hideErrorMessage}
            helperText={helperText}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
            customIds={customIds}
          />
        );
      }}
    />
  );
};

export default RHFCheckboxGroup;
