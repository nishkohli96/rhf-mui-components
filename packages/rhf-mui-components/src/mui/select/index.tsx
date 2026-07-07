'use client';

import {
  useContext,
  forwardRef,
  Fragment,
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
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue,
  MUISELECT_OPTIONS_THRESHOLD,
  type FormLabelProps,
  type FormHelperTextProps,
  type SelectProps,
  type CustomOnChangeProps,
  type OptionValue
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { StrNumObjOption, CustomComponentIds } from '@/types';
import {
  fieldNameToLabel,
  isKeyValueOption,
  keepLabelAboveFormField,
  getOptionValue,
  normalizeSelectValue,
  useFieldIds,
  getDisplayLabelForSelectValue,
  mergeRefs,
  generateLargeOptionsErrMsg
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

const componentName = 'RHFSelect';

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
    onBlur,
    autoComplete = defaultAutocompleteValue,
    renderValue,
    placeholder,
    customIds,
    inputProps: muiSelectInputProps,
    ...otherSelectProps
  }: RHFSelectProps<T, Option, LabelKey, ValueKey, Multiple>,
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

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const defaultFieldLabel = fieldNameToLabel(fieldName);
  const fieldLabelText = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? defaultFieldLabel;
  const accessibleFieldLabel = typeof fieldLabel === 'string'
    ? fieldLabel
    : defaultFieldLabel;

  const SelectFormLabel = (
    <FormLabelText label={fieldLabel} required={required} />
  );

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
        const isValueEmpty
          = rhfValue === undefined
            || rhfValue === null
            || rhfValue === ''
            || (multiple && Array.isArray(rhfValue) && !rhfValue.length);
        const showPlaceholder = isValueEmpty && !!placeholder;
        const selectLabelValue
          = hideLabel || isLabelAboveFormField || showPlaceholder || isValueEmpty
            ? undefined
            : SelectFormLabel;
        const selectLabelId = isLabelAboveFormField || hideLabel
          ? undefined
          : labelId;

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
          <FormControl error={isError} disabled={isDisabled}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
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
            {!hideLabel && !isLabelAboveFormField && !showPlaceholder && (
              <InputLabel
                id={labelId}
                htmlFor={fieldId}
                shrink={!isValueEmpty}
                disabled={isDisabled}
              >
                {SelectFormLabel}
              </InputLabel>
            )}
            <MuiSelect
              {...otherSelectProps}
              inputProps={{
                ...muiSelectInputProps,
                id: fieldId
              }}
              name={rhfFieldName}
              autoComplete={autoComplete}
              inputRef={mergeRefs(rhfRef, ref)}
              labelId={selectLabelId}
              aria-required={required}
              aria-invalid={isError}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              aria-label={hideLabel ? accessibleFieldLabel : undefined}
              label={selectLabelValue}
              value={rhfValue ?? (multiple ? [] : '')}
              error={isError}
              multiple={multiple}
              displayEmpty={isValueEmpty}
              disabled={isDisabled}
              onChange={(event, child) => {
                const selectEvent = event as SelectChangeEvent<
                  SelectValue<OptionValue<Option, ValueKey>, Multiple>
                >;
                const selectedValue = selectEvent.target.value;
                const normalizedValue = normalizeSelectValue(
                  selectedValue,
                  options,
                  labelKey,
                  valueKey
                ) as SelectValue<OptionValue<Option, ValueKey>, Multiple>;
                if (customOnChange) {
                  customOnChange({
                    rhfOnChange,
                    newValue: normalizedValue,
                    event: selectEvent,
                    child
                  });
                  return;
                }
                rhfOnChange(normalizedValue);
                onValueChange?.({
                  newValue: normalizedValue,
                  event: selectEvent,
                  child
                });
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              renderValue={value => {
                if (showPlaceholder) {
                  return (
                    <span
                      aria-hidden="true"
                      style={{ opacity: 0.6, color: 'inherit' }}
                    >
                      {placeholder}
                    </span>
                  );
                }
                /* For multiple options */
                if (Array.isArray(value)) {
                  const labels = value
                    .map(val =>
                      getDisplayLabelForSelectValue(
                        val,
                        options,
                        labelKey,
                        valueKey
                      ))
                    .filter(
                      (node): node is Exclude<typeof node, ''> =>
                        node !== '' && node !== null && node !== undefined
                    );
                  return (
                    <Fragment>
                      {renderValue?.(value) ?? labels.join(', ')}
                    </Fragment>
                  );
                }
                /* For single option */
                const optionLabel = getDisplayLabelForSelectValue(
                  value,
                  options,
                  labelKey,
                  valueKey
                );
                return (
                  <Fragment>
                    {renderValue?.(value) ?? optionLabel}
                  </Fragment>
                );
              }}
            >
              {showDefaultOption && (
                <MenuItem value="" disabled={required}>
                  {defaultOptionText ?? `Select ${fieldLabelText}`}
                </MenuItem>
              )}
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
                  <MenuItem
                    key={`${opnValue}-${index}`}
                    value={opnValue}
                    disabled={isOptionDisabled}
                  >
                    {renderOptionLabel?.(option) ?? opnLabel}
                  </MenuItem>
                );
              })}
            </MuiSelect>
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
