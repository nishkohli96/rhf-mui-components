'use client';

import { useContext, Fragment, type ReactNode } from 'react';
import {
  Controller,
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
  FormLabelProps,
  FormHelperTextProps,
  SelectProps,
  OptionValue
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { StrNumObjOption } from '@/types';
import {
  fieldNameToLabel,
  isKeyValueOption,
  keepLabelAboveFormField,
  getOptionValue,
  normalizeSelectValue,
  useFieldIds,
  getDisplayLabelForSelectValue,
} from '@/utils';

type SelectValue<Value, Multiple extends boolean>
  = Multiple extends true ? Value[] : Value;

export type RHFSelectProps<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false,
  Value = OptionValue<Option, ValueKey>
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
   * When `true`, allows multiple options to be selected.
   *
   * The field value is returned as an array of selected values instead of
   * a single value.
   *
   * @default false
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
   * Callback fired after the selected value is normalized and stored in the field.
   * @param newValue - Normalized selected value, or an array of values when `multiple` is true.
   * @param event - MUI select change event.
   * @param child - Selected child node passed by MUI Select.
   */
  onValueChange?: (
    newValue: SelectValue<Value, Multiple>,
    event: SelectChangeEvent<SelectValue<Value, Multiple>>,
    child: ReactNode
  ) => void;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Validation error message displayed in the `FormHelperText` component.
   * When provided, it takes precedence over `helperText` unless
   * `hideErrorMessage` is set to `true`.
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
   * Placeholder text displayed when no option is selected.
   *
   * Unlike the default option, the placeholder is displayed in the select
   * input itself and is not rendered as a selectable menu item.
   */
  placeholder?: string;
} & SelectProps;

const RHFSelect = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false
>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  multiple,
  showDefaultOption,
  defaultOptionText,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
  autoComplete = defaultAutocompleteValue,
  renderValue,
  placeholder,
  ...otherSelectProps
}: RHFSelectProps<T, Option, LabelKey, ValueKey, Multiple>) => {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabelText = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? fieldLabelText;
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
        }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const isError = !!errorMessage;
        const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

        const isValueEmpty
          = !rhfValue
            || rhfValue === ''
            || (multiple && Array.isArray(rhfValue) && !rhfValue.length);
        const showPlaceholder = isValueEmpty && !!placeholder;
        const selectLabelProp
          = isLabelAboveFormField || isValueEmpty ? undefined : SelectFormLabel;
        const selectLabelId = isLabelAboveFormField ? undefined : labelId;

        return (
          <FormControl error={isError} disabled={isDisabled}>
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
            <Fragment>
              {!isLabelAboveFormField && !showPlaceholder && (
                <InputLabel id={labelId} shrink={!isValueEmpty}>
                  {SelectFormLabel}
                </InputLabel>
              )}
              <MuiSelect
                {...otherSelectProps}
                id={fieldId}
                name={rhfFieldName}
                autoComplete={autoComplete}
                labelId={selectLabelId}
                aria-required={required}
                aria-describedby={
                  showHelperTextElement
                    ? (isError ? errorId : helperTextId)
                    : undefined
                }
                label={selectLabelProp}
                value={rhfValue ?? (multiple ? [] : '')}
                error={isError}
                multiple={multiple}
                displayEmpty={isValueEmpty}
                inputRef={rhfRef}
                disabled={isDisabled}
                onChange={(event, child) => {
                  const selectedValue = event.target.value;
                  const normalizedValue = normalizeSelectValue(
                    selectedValue,
                    options,
                    labelKey,
                    valueKey
                  ) as SelectValue<OptionValue<Option, ValueKey>, Multiple>;
                  rhfOnChange(normalizedValue);
                  onValueChange?.(
                    normalizedValue,
                    event as SelectChangeEvent<
                      SelectValue<OptionValue<Option, ValueKey>, Multiple>
                    >,
                    child
                  );
                }}
                onBlur={blurEvent => {
                  rhfOnBlur();
                  onBlur?.(blurEvent);
                }}
                renderValue={value => {
                  if (showPlaceholder) {
                    return (
                      <span style={{ opacity: 0.6, color: 'inherit' }}>
                        {placeholder}
                      </span>
                    );
                  }
                  /* For multiple options */
                  if (Array.isArray(value)) {
                    const labels = value
                      .map(val =>
                        getDisplayLabelForSelectValue(val, options, labelKey, valueKey))
                      .filter(
                        (node): node is Exclude<typeof node, ''> =>
                          node !== '' && node !== null && node !== undefined,
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
                {options.map(option => {
                  const isObject = isKeyValueOption(option, labelKey, valueKey);
                  const opnValue = getOptionValue<Option, ValueKey>(
                    option,
                    valueKey
                  );
                  const opnLabel = isObject
                    ? String(option[labelKey!])
                    : String(option);
                  return (
                    <MenuItem key={opnValue} value={opnValue}>
                      {opnLabel}
                    </MenuItem>
                  );
                })}
              </MuiSelect>
            </Fragment>
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
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

export default RHFSelect;
