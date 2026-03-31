'use client';

import {
  useContext,
  useMemo,
  forwardRef,
  type Ref,
  type JSX,
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
  StrNumObjOption
} from '@/types';
import {
  fieldNameToLabel,
  getOptionValue,
  isKeyValueOption,
  normalizeSelectValue,
  validateArray,
  useFieldIds,
  generateLargeOptionsErrMsg,
  mergeRefs
} from '@/utils';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';

type InputNativeSelectProps = Omit<
  NativeSelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value' | 'ref'
>;

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
  options: Option[];
  labelKey?: LabelKey;
  valueKey?: ValueKey;
  renderOption?: (option: Option) => ReactNode;
  getOptionDisabled?: (option: Option) => boolean;
  customOnChange?: (
    rhfOnChange: (value: OptionValue<Option, ValueKey>) => void,
    value: OptionValue<Option, ValueKey>,
    event: ChangeEvent<HTMLSelectElement>
  ) => void;
  onValueChange?: (
    value: OptionValue<Option, ValueKey>,
    event: ChangeEvent<HTMLSelectElement>
  ) => void;
  defaultOptionText?: string;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  label?: ReactNode;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  customIds?: CustomComponentIds;
} & InputNativeSelectProps;

const componentName = 'RHFNativeSelect';

const RHFNativeSelect = forwardRef(function RHFNativeSelect<
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
    showLabelAboveFormField,
    hideLabel,
    formLabelProps,
    label,
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
  const { skipValidationInEnvs } = useContext(RHFMuiConfigContext);

  if (!skipValidationInEnvs.includes(process.env.NODE_ENV ?? 'production')) {
    validateArray(componentName, options, labelKey, valueKey);
    if (options.length > MUISELECT_OPTIONS_THRESHOLD) {
      console.warn(generateLargeOptionsErrMsg(componentName, options.length));
    }
  }

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );

  const fieldLabel = useMemo(
    () => label ?? fieldNameToLabel(fieldName),
    [label, fieldName]
  );
  const blankOptionText = defaultOptionText ?? placeholder ?? '';

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
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        return (
          <FormControl fullWidth error={isError}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={showLabelAboveFormField ?? true}
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
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              value={rhfValue ?? ''}
              disabled={rhfDisabled}
              onChange={event => {
                const selectedValue = event.target.value;
                const normalizedValue = normalizeSelectValue(
                  selectedValue,
                  options,
                  labelKey,
                  valueKey
                ) as OptionValue<Option, ValueKey>;
                if (customOnChange) {
                  customOnChange(rhfOnChange, normalizedValue, event);
                  return;
                }
                rhfOnChange(normalizedValue);
                onValueChange?.(normalizedValue, event);
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
                {blankOptionText}
              </option>
              {options.map(option => {
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
                  <option
                    key={opnValue}
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
}) as <
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
