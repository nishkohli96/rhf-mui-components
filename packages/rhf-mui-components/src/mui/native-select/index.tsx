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
import FormControl from '@mui/material/FormControl';
import NativeSelect, {
  type NativeSelectProps
} from '@mui/material/NativeSelect';
import {
  FormLabel,
  FormHelperText,
  defaultAutocompleteValue,
  MUISELECT_OPTIONS_THRESHOLD,
  type FormHelperTextProps,
  type FormLabelProps,
  type CustomOnChangeProps,
  type OptionValue
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds, StrNumObjOption } from '@/types';
import {
  fieldNameToLabel,
  getOptionValue,
  isKeyValueOption,
  normalizeSelectValue,
  useFieldIds,
  generateLargeOptionsErrMsg,
  mergeRefs,
  resolveLabelAboveControl
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
   * @returns Custom React content to display for the option.
   */
  renderOptionLabel?: (option: Option) => ReactNode;
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
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   *
   * Use `renderError` to customize how the field error is rendered.
   */
  errorMessage?: ReactNode;
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

const componentName = 'RHFNativeSelect';

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
    disabled: muiDisabled,
    defaultOptionText,
    label,
    showLabelAboveFormField,
    formLabelProps,
    hideLabel,
    required,
    errorMessage,
    renderError,
    hideErrorMessage,
    helperText,
    formHelperTextProps,
    sx,
    onBlur,
    autoComplete = defaultAutocompleteValue,
    placeholder,
    customIds,
    ...otherNativeSelectProps
  }: RHFNativeSelectProps<T, Option, LabelKey, ValueKey>,
  ref: Ref<HTMLInputElement>
) {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if (options.length > MUISELECT_OPTIONS_THRESHOLD) {
    console.warn(generateLargeOptionsErrMsg(componentName, options.length));
  }

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );

  const defaultFieldLabel = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? defaultFieldLabel;
  const accessibleFieldLabel = typeof fieldLabel === 'string'
    ? fieldLabel
    : defaultFieldLabel;

  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const defaultOptionLabel = defaultOptionText ?? placeholder ?? '';

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
        const fieldErrorMessage = fieldStateError
          ? (renderError?.(fieldStateError) ?? errorMessage ?? fieldStateError.message?.toString())
          : undefined;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        return (
          <FormControl
            error={isError}
            disabled={isDisabled}
            fullWidth
          >
            {!hideLabel && isLabelAboveControl && (
              <FormLabel
                label={fieldLabel}
                isVisible
                required={required}
                error={isError}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  htmlFor: fieldId
                }}
              />
            )}
            <NativeSelect
              {...otherNativeSelectProps}
              id={fieldId}
              name={rhfFieldName}
              inputRef={mergeRefs(rhfRef, ref)}
              autoComplete={autoComplete}
              aria-required={required}
              aria-invalid={isError}
              aria-labelledby={
                !hideLabel && !isLabelAboveControl ? labelId : undefined
              }
              aria-label={hideLabel ? accessibleFieldLabel : undefined}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              value={rhfValue ?? ''}
              disabled={isDisabled}
              onChange={event => {
                const selectedValue = event.target.value;
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
              sx={{
                ...sx,
                '&.MuiNativeSelect-root': {
                  margin: 0
                }
              }}
            >
              <option value="" disabled={required}>
                {defaultOptionLabel}
              </option>
              {options.map((option, index) => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = getOptionValue<Option, ValueKey>(
                  option,
                  valueKey
                );
                const opnLabel = isObject
                  ? String(option[labelKey!])
                  : String(option);
                const isOptionDisabled = getOptionDisabled?.(option) ?? false;
                return (
                  <option
                    key={`${opnValue}-${index}`}
                    value={opnValue}
                    disabled={isOptionDisabled}
                  >
                    {renderOptionLabel?.(option) ?? opnLabel}
                  </option>
                );
              })}
            </NativeSelect>
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
});

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
