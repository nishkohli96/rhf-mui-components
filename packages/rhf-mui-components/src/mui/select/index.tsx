'use client';

import {
  useContext,
  forwardRef,
  type JSX,
  type ReactNode,
  type Ref
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { type SelectChangeEvent } from '@mui/material/Select';
import MUISelect from '@nish1896/mui-components/mui/select';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type SelectProps,
  type CustomOnChangeProps,
  type OptionValue,
  type OptionRenderState
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { StrNumObjOption, CustomComponentIds } from '@/types';
import {
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
  resolveRequired
} from '@/utils';

type SelectValue<Value, Multiple extends boolean> = Multiple extends true
  ? Value[]
  : Value;

type OnValueChangeProps<
  Option extends StrNumObjOption = StrNumObjOption,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  Multiple extends boolean = false
> = {
  newValue: SelectValue<OptionValue<Option, ValueKey>, Multiple>;
  event: SelectChangeEvent<SelectValue<OptionValue<Option, ValueKey>, Multiple>>;
  child: ReactNode;
};

export type RHFSelectProps<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  Multiple extends boolean = false,
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
   * Use this prop to customize the label for each option in the `MenuItem` component.
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
   * When true, allows selecting multiple values.
   */
  multiple?: Multiple;
  /**
   * When `true`, displays a default placeholder option at the top of the
   * dropdown menu.
   *
   * The option uses an empty string (`''`) as its value and is automatically
   * disabled when the field is marked as required.
   *
   * @default false
   */
  showDefaultOption?: boolean;
  /**
   * Custom text displayed for the default option when
   * `showDefaultOption` is enabled.
   *
   * @default `Select ${fieldLabel}`
   */
  defaultOptionText?: string;
  /**
   * Overrides the default MUI Select change handling.
   * Receives the normalized selected value, original select event, and selected child element.
   * Call `rhfOnChange` with the value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the selected value.
   * @param newValue - Normalized selected value, using `valueKey` for object options and arrays for multiple selection.
   * @param event - Original MUI Select change event.
   * @param child - Selected option element provided by MUI Select.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event,
    child
  }: CustomOnChangeProps<
    OnValueChangeProps<Option, ValueKey, Multiple>,
    SelectValue<OptionValue<Option, ValueKey>, Multiple>
  >) => void;
  /**
   * Called after the default MUI Select handler stores the normalized selected value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Normalized selected value, using `valueKey` for object options and arrays for multiple selection.
   * @param event - Original MUI Select change event.
   * @param child - Selected option element provided by MUI Select.
   */
  onValueChange?: ({
    newValue,
    event,
    child
  }: OnValueChangeProps<Option, ValueKey, Multiple>) => void;
  /**
   * When `true`, renders the label above the component instead of within the field layout.
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
   * Placeholder text displayed when no option is selected.
   *
   * Unlike the default option, the placeholder is displayed in the select
   * input itself and is not rendered as a selectable menu item.
   */
  placeholder?: string;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
} & SelectProps;

const RHFSelectInner = forwardRef(function RHFSelect<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  Multiple extends boolean = false
>(
  {
    fieldName,
    control,
    registerOptions,
    options,
    labelKey,
    valueKey,
    renderOptionLabel,
    getOptionDisabled,
    multiple,
    showDefaultOption,
    defaultOptionText,
    customOnChange,
    onValueChange,
    onBlur: muiOnBlur,
    disabled: muiDisabled,
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
    autoComplete,
    renderValue,
    placeholder,
    customIds,
    inputProps: muiSelectInputProps,
    ...otherSelectProps
  }: RHFSelectProps<T, Option, LabelKey, ValueKey, Multiple>,
  ref: Ref<HTMLInputElement>
) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);

  const isLabelAboveFormField = keepLabelAboveFormField(
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
        const fieldErrorMessage = typeof errorMessage === 'string'
          ? errorMessage
          : fieldStateError?.message?.toString();

        return (
          <MUISelect<Option, LabelKey, ValueKey, Multiple>
            {...otherSelectProps}
            fieldName={rhfFieldName}
            inputRef={mergeRefs(rhfRef, ref)}
            options={options}
            labelKey={labelKey}
            valueKey={valueKey}
            value={rhfValue}
            onValueChange={({ newValue, event, child }) => {
              if (customOnChange) {
                customOnChange({
                  rhfOnChange,
                  newValue,
                  event,
                  child
                });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({
                newValue,
                event,
                child
              });
            }}
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent);
            }}
            renderOptionLabel={renderOptionLabel}
            getOptionDisabled={getOptionDisabled}
            multiple={multiple}
            showDefaultOption={showDefaultOption}
            defaultOptionText={defaultOptionText}
            disabled={isDisabled}
            label={label}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            required={isFieldRequired}
            errorMessage={fieldErrorMessage}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            hideErrorMessage={hideErrorMessage}
            helperText={helperText}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
            autoComplete={autoComplete}
            renderValue={renderValue}
            placeholder={placeholder}
            inputProps={muiSelectInputProps}
            customIds={customIds}
          />
        );
      }}
    />
  );
});

const RHFSelect = RHFSelectInner as <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  Multiple extends boolean = false
>(
  props: RHFSelectProps<T, Option, LabelKey, ValueKey, Multiple> & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFSelect;
