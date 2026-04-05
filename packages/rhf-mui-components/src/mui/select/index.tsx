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
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { MUISELECT_OPTIONS_THRESHOLD } from '@/common/constants';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue
} from '@/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  SelectProps,
  StrNumObjOption,
  OptionValue,
  CustomComponentIds,
  CustomOnChangeProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
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
  Option extends StrNumObjOption,
  ValueKey extends Extract<keyof Option, string>,
  Multiple extends boolean
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
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * List of options to display in the dropdown.
   *
   * Note:
   * - Works best for small to moderate datasets.
   * - If options exceed ~20 items, `RHFAutocomplete` or `RHFMuiAutocomplete` is
   *   recommended for improved searchability, keyboard navigation, and performance.
   */
  options: Option[];
  labelKey?: LabelKey;
  valueKey?: ValueKey;
  renderOption?: (option: Option) => ReactNode;
  getOptionDisabled?: (option: Option) => boolean;
  multiple?: Multiple;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  /**
   * Custom change handler that overrides the default value update behavior.
   *
   * Use this when you need full control over how the selected value is processed
   * before updating React Hook Form state.
   *
   * ⚠️ Important: You must call `rhfOnChange` manually to update the form state.
   * `onValueChange` is not invoked when using `customOnChange`.
   *
   * @param rhfOnChange - React Hook Form's internal change handler
   * @param newValue - Normalized selected value (single or multiple based on `multiple`)
   * @param event - Original MUI Select change event
   * @param child - The selected option element
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
  onValueChange?: ({
    newValue,
    event,
    child
  }: OnValueChangeProps<Option, ValueKey, Multiple>) => void;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  placeholder?: string;
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
    renderOption,
    getOptionDisabled,
    multiple,
    showDefaultOption,
    defaultOptionText,
    customOnChange,
    onValueChange,
    disabled: muiDisabled,
    label,
    showLabelAboveFormField,
    hideLabel,
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
    customIds,
    ...otherSelectProps
  }: RHFSelectProps<T, Option, LabelKey, ValueKey, Multiple>,
  ref: Ref<HTMLInputElement>
) {
  const {
    allLabelsAboveFields,
    skipValidationInEnvs
  } = useContext(RHFMuiConfigContext);

  if(!skipValidationInEnvs.includes(process.env.NODE_ENV ?? 'production')) {
    validateArray(componentName, options, labelKey, valueKey);
    if(options.length > MUISELECT_OPTIONS_THRESHOLD) {
      console.warn(generateLargeOptionsErrMsg(componentName, options.length));
    }
  }

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabelText = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const SelectFormLabel = (
    <FormLabelText label={fieldLabel} required={required} />
  );

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      disabled={muiDisabled}
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
        const selectLabelProp
          = hideLabel || isLabelAboveFormField || isValueEmpty
            ? undefined
            : SelectFormLabel;
        const selectLabelId = isLabelAboveFormField ? undefined : labelId;

        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        return (
          <FormControl error={isError}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
                required={required}
                error={isError}
                formLabelProps={{
                  id: labelId,
                  htmlFor: fieldId,
                  ...formLabelProps
                }}
              />
            )}
            {!isLabelAboveFormField && !showPlaceholder && (
              <InputLabel id={labelId} shrink={!isValueEmpty}>
                {SelectFormLabel}
              </InputLabel>
            )}
            <MuiSelect
              id={fieldId}
              name={rhfFieldName}
              autoComplete={autoComplete}
              inputRef={mergeRefs(rhfRef, ref)}
              labelId={selectLabelId}
              aria-label={hideLabel ? fieldLabel : undefined}
              aria-required={required}
              aria-invalid={isError}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              label={selectLabelProp}
              value={rhfValue ?? (multiple ? [] : '')}
              error={isError}
              multiple={multiple}
              aria-multiselectable={multiple || undefined}
              displayEmpty={isValueEmpty}
              disabled={rhfDisabled}
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
              {...otherSelectProps}
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
                const isOptionDisabled = getOptionDisabled?.(option);
                return (
                  <MenuItem
                    key={`${opnValue}-${index}`}
                    value={opnValue}
                    disabled={isOptionDisabled}
                  >
                    {renderOption?.(option) ?? opnLabel}
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
                id: isError ? errorId : helperTextId,
                ...formHelperTextProps
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
