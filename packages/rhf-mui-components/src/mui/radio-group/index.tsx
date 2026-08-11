'use client';

import {
  useContext,
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
import { type RadioGroupProps } from '@mui/material/RadioGroup';
import MUIRadioGroup from '@nish1896/mui-components/mui/radio-group';
import type { StrNumObjOption, CustomComponentIds } from '@nish1896/mui-components/types';
import {
  type FormLabelProps,
  type FormControlLabelProps,
  type FormHelperTextProps,
  type RadioProps,
  type CustomOnChangeProps,
  type OptionValue,
  type OptionRenderState
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
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
  newValue: OptionValue<Option, ValueKey>;
  event: ChangeEvent<HTMLInputElement>;
};

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
   * List of options to render as radio buttons. Best suited for smaller datasets, with
   * upto 10 options. For larger datasets, consider using `RHFAutocomplete`.
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
   * Overrides the default radio group change handling.
   * Receives the normalized selected option value and the original radio change event.
   * Call `rhfOnChange` with the selected value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the selected radio value.
   * @param newValue - Normalized selected option value, using `valueKey` for object options when provided.
   * @param event - Original radio change event.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<
    OnValueChangeProps<Option, ValueKey>,
    OptionValue<Option, ValueKey>
  >) => void;
  /**
   * Called after the default radio group handler stores the normalized selected value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Normalized selected option value, using `valueKey` for object options when provided.
   * @param event - Original radio change event.
   */
  onValueChange?: ({
    newValue,
    event
  }: OnValueChangeProps<Option, ValueKey>) => void;
  /**
   * Function to customize the label for each radio button.
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
  /**
   * Renders the label above the component.
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
   * Props to pass down to each Radio component. Can be used to set
   * a custom color, size, etc. for all radios in the group.
   */
  radioProps?: RadioProps;
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
   * Custom ids for generated field, label, helper text, and error elements.
   */
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
  labelKey,
  valueKey,
  customOnChange,
  onValueChange,
  onBlur: muiOnBlur,
  disabled: muiDisabled,
  renderOptionLabel,
  getOptionDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  radioProps,
  formControlLabelProps,
  required,
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  customIds,
  ...otherRadioGroupProps
}: RHFRadioGroupProps<T, Option, LabelKey, ValueKey>) => {
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

  const { sx: formLabelSx, ...otherFormLabelProps } = formLabelProps ?? {};
  const { sx: formHelperTextSx, ...otherFormHelperTextProps }
    = formHelperTextProps ?? {};
  const { sx: formControlLabelSx, ...otherFormControlLabelProps }
    = formControlLabelProps ?? {};

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

        return (
          <MUIRadioGroup
            {...otherRadioGroupProps}
            fieldName={rhfFieldName}
            options={options}
            labelKey={labelKey}
            valueKey={valueKey}
            value={rhfValue}
            onValueChange={({ newValue, event }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, event });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, event });
            }}
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent);
            }}
            disabled={isDisabled}
            renderOptionLabel={renderOptionLabel}
            getOptionDisabled={getOptionDisabled}
            label={label}
            showLabelAboveFormField={isLabelAboveControl}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            radioProps={radioProps}
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

export default RHFRadioGroup;
