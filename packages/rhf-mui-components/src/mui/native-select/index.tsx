'use client';

import {
  useContext,
  forwardRef,
  type JSX,
  type ReactNode,
  type Ref,
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
import { type NativeSelectProps } from '@mui/material/NativeSelect';
import MUINativeSelect from '@nish1896/mui-components/mui/native-select';
import type { CustomComponentIds, StrNumObjOption } from '@nish1896/mui-components/types';
import {
  type FormHelperTextProps,
  type FormLabelProps,
  type CustomOnChangeProps,
  type OptionValue,
  type OptionRenderState
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  mergeRefs,
  mergeSx,
  resolveLabelAboveControl,
  resolveRequired
} from '@/utils';

type InputNativeSelectProps = Omit<
  NativeSelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value' | 'ref'
>;

type OnValueChangeProps<
  Option extends StrNumObjOption = StrNumObjOption,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >
> = {
  newValue: OptionValue<Option, ValueKey>;
  event: ChangeEvent<HTMLSelectElement>;
};

export type RHFNativeSelectProps<
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
   * List of options to display in the dropdown.
   * Note:
   * - Works best for small to moderate datasets.
   * - If options exceed ~20 items, `RHFAutocomplete` or `RHFMultiAutocomplete` is
   *   recommended for improved searchability, keyboard navigation, and performance.
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
   * Custom renderer for dropdown options.
   *
   * Use this prop to customize how each option is displayed in the `<option>` element.
   * When not provided, the option label derived from `labelKey` (or the
   * option value itself for primitive options) is rendered.
   *
   * @param option - The option being rendered.
   * @param state - Current status of the option (`disabled`, `selected`), so the
   *   label can react to it — e.g. dim a disabled option.
   * @returns Custom React content to display for the option.
   */
  renderOptionLabel?: (option: Option, state: OptionRenderState) => ReactNode;
  /**
   * Function to dynamically disable specific option(s).
   *
   * Return `true` to disable the option and prevent it from being selected.
   *
   * @param option - The option being evaluated.
   */
  getOptionDisabled?: (option: Option) => boolean;
  /**
   * Overrides the default native select change handling.
   * Receives the normalized selected value and the original native select change event.
   * Call `rhfOnChange` with the value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the selected value.
   * @param newValue - Normalized selected value, using `valueKey` for object options when provided.
   * @param event - Original native select change event.
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
   * Called after the default native select handler stores the normalized selected value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Normalized selected value, using `valueKey` for object options when provided.
   * @param event - Original native select change event.
   */
  onValueChange?: ({
    newValue,
    event
  }: OnValueChangeProps<Option, ValueKey>) => void;
  /**
   * Custom text displayed for the default option when
   * `showDefaultOption` is enabled.
   *
   * @default `Select ${fieldLabel}`
   */
  defaultOptionText?: string;
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
} & InputNativeSelectProps;

const RHFNativeSelectInner = forwardRef(function RHFNativeSelect<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>
>(
  {
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
    onBlur: muiOnBlur,
    disabled: muiDisabled,
    defaultOptionText,
    label,
    showLabelAboveFormField,
    formLabelProps,
    hideLabel,
    required,
    renderError,
    hideErrorMessage,
    helperText,
    formHelperTextProps,
    sx: muiSx,
    autoComplete,
    placeholder,
    customIds,
    ...otherNativeSelectProps
  }: RHFNativeSelectProps<T, Option, LabelKey, ValueKey>,
  ref: Ref<HTMLInputElement>
) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
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
          ref: rhfRef,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;

        return (
          <MUINativeSelect
            {...otherNativeSelectProps}
            fieldName={rhfFieldName}
            inputRef={mergeRefs(rhfRef, ref)}
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
            renderOptionLabel={renderOptionLabel}
            getOptionDisabled={getOptionDisabled}
            disabled={isDisabled}
            defaultOptionText={defaultOptionText}
            label={label}
            showLabelAboveFormField={isLabelAboveControl}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
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
            sx={muiSx}
            autoComplete={autoComplete}
            placeholder={placeholder}
            customIds={customIds}
          />
        );
      }}
    />
  );
});

/**
 * Controlled Material UI native `<select>`, wired to a React Hook Form field
 * via `control`.
 *
 * A lightweight dropdown alternative to `RHFSelect`, well suited for mobile.
 *
 * Docs: [RHFNativeSelect](https://rhf-mui-components.vercel.app/components/mui/RHFNativeSelect)
 *
 * API: [RHFNativeSelectProps](https://rhf-mui-components.vercel.app/components/mui/RHFNativeSelect#api)
 */
const RHFNativeSelect = RHFNativeSelectInner as <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>
>(
  props: RHFNativeSelectProps<T, Option, LabelKey, ValueKey> & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFNativeSelect;
