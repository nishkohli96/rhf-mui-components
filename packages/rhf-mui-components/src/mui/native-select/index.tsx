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
  MUISELECT_OPTIONS_THRESHOLD
} from '@/common';
import type {
  CustomComponentIds,
  FormHelperTextProps,
  FormLabelProps,
  OptionValue,
  StrNumObjOption,
  CustomOnChangeProps
} from '@/types';
import {
  fieldNameToLabel,
  getOptionValue,
  isKeyValueOption,
  normalizeSelectValue,
  validateArray,
  useFieldIds,
  generateLargeOptionsErrMsg,
  mergeRefs,
  resolveLabelAboveControl
} from '@/utils';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';

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
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * List of options to display in the dropdown.
   * Note:
   * - Works best for small to moderate datasets.
   * - If options exceed ~20 items, `RHFAutocomplete` or `RHFMultiAutocomplete` is
   *   recommended for improved searchability, keyboard navigation, and performance.
   */
  options: Option[];
  labelKey?: LabelKey;
  valueKey?: ValueKey;
  renderOption?: (option: Option) => ReactNode;
  getOptionDisabled?: (option: Option) => boolean;
  /**
   * Custom change handler that overrides the default native select update.
   *
   * Use when you need to intercept or transform the selected value before
   * updating React Hook Form state.
   *
   * ⚠️ Important: Call `rhfOnChange` manually to update the form state.
   * `onValueChange` is not invoked when this callback is provided.
   *
   * @param rhfOnChange - React Hook Form field change handler
   * @param newValue - option value from the selection
   * @param event - Change event from the `<select>` element
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
  defaultOptionText?: string;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  hideLabel?: boolean;
  helperText?: ReactNode;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * This prop is no longer needed.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
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
    renderOption,
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
    helperText,
    errorMessage,
    hideErrorMessage,
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
  const {
    allLabelsAboveFields,
    skipValidationInEnvs
  } = useContext(RHFMuiConfigContext);
  if (
    options.length
    && !skipValidationInEnvs.includes(process?.env?.NODE_ENV ?? 'production')
  ) {
    validateArray(componentName, options, labelKey, valueKey);
    if (options.length > MUISELECT_OPTIONS_THRESHOLD) {
      console.warn(generateLargeOptionsErrMsg(componentName, options.length));
    }
  }

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
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
          ref: rhfRef
        },
        fieldState: { error: fieldStateError }
      }) => {
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        return (
          <FormControl fullWidth error={isError}>
            {!hideLabel && isLabelAboveControl && (
              <FormLabel
                label={fieldLabel}
                isVisible
                required={required}
                error={isError}
                formLabelProps={{
                  id: labelId,
                  htmlFor: fieldId,
                  ...formLabelProps
                }}
              />
            )}
            <NativeSelect
              id={fieldId}
              name={rhfFieldName}
              inputRef={mergeRefs(rhfRef, ref)}
              autoComplete={autoComplete}
              aria-required={required}
              aria-invalid={isError}
              aria-labelledby={
                !hideLabel && !isLabelAboveControl ? labelId : undefined
              }
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              value={rhfValue ?? ''}
              disabled={muiDisabled}
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
              {...otherNativeSelectProps}
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
                    aria-disabled={isOptionDisabled}
                  >
                    {renderOption?.(option) ?? opnLabel}
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
