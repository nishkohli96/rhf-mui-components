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
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
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
  StrNumObjOption,
  SelectProps,
  OptionValue
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  keepLabelAboveFormField,
  getOptionValue,
  normalizeSelectValue,
} from '@/utils';

type SelectValue<Value, Multiple extends boolean> =
  Multiple extends true ? Value[] : Value;

export type RHFSelectProps<
  T extends FieldValues,
  Option,
  LabelKey extends string | undefined = undefined,
  ValueKey extends string | undefined = undefined,
  Multiple extends boolean = false,
  Value = OptionValue<Option, ValueKey>
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  labelKey?: LabelKey;
  valueKey?: ValueKey;
  multiple?: Multiple;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  onValueChange?: (
    newValue: SelectValue<Value, Multiple>,
    event: SelectChangeEvent<SelectValue<Value, Multiple>>,
    child: ReactNode
  ) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  placeholder?: string;
} & SelectProps;

const RHFSelect = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends string | undefined = undefined,
  ValueKey extends string | undefined = undefined,
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
  validateArray('RHFSelect', options, labelKey, valueKey);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabelText = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? fieldLabelText;
  const isError = Boolean(errorMessage);

  const SelectFormLabel = (
    <FormLabelText label={fieldLabel} required={required} />
  );

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field }) => {
          const { value, onChange, onBlur: rhfOnBlur, ...otherFieldProps } = field;
          const isValueEmpty
            = !value
              || value === ''
              || (multiple && Array.isArray(value) && !value.length);
          const showPlaceholder = isValueEmpty && Boolean(placeholder);
          const selectLabelProp
            = isLabelAboveFormField || isValueEmpty ? undefined : SelectFormLabel;
          const labelId = isLabelAboveFormField ? undefined : fieldName;

          return (
            <Fragment>
              {!isLabelAboveFormField && !showPlaceholder && (
                <InputLabel id={fieldName}>
                  {SelectFormLabel}
                </InputLabel>
              )}
              <MuiSelect
                {...otherFieldProps}
                id={fieldName}
                autoComplete={autoComplete}
                labelId={labelId}
                label={selectLabelProp}
                value={value ?? (multiple ? [] : '')}
                error={isError}
                multiple={multiple}
                displayEmpty={isValueEmpty}
                onChange={(event, child) => {
                  const selectedValue = event.target.value;
                  const normalizedValue = normalizeSelectValue(
                    selectedValue,
                    options,
                    labelKey,
                    valueKey
                  ) as SelectValue<OptionValue<Option, ValueKey>, Multiple>;
                  onChange(normalizedValue);
                  onValueChange?.(
                    normalizedValue,
                    event as SelectChangeEvent<
                      SelectValue<OptionValue<Option, ValueKey>, Multiple>
                    >,
                    child
                  );
                }}
                {...otherSelectProps}
                onBlur={blurEvent => {
                  rhfOnBlur();
                  onBlur?.(blurEvent);
                }}
                // @ts-ignore
                renderValue={value => {
                  if (showPlaceholder) {
                    return placeholder;
                  }
                  /* For multiple options */
                  if (Array.isArray(value)) {
                    const labels = value.map(val => {
                      const match = options.find(op =>
                        isKeyValueOption(op, labelKey, valueKey)
                          ? `${op[valueKey!]}` === `${val}`
                          : op === val);
                      return isKeyValueOption(match!, labelKey, valueKey)
                        ? match[labelKey!]
                        : match;
                    });
                    return renderValue?.(value) ?? labels.join(', ');
                  }

                  /* For single option */
                  const match = options.find(op =>
                    isKeyValueOption(op, labelKey, valueKey)
                      ? op[valueKey!] === value
                      : op === value);
                  const optionLabel = isKeyValueOption(
                    match!,
                    labelKey,
                    valueKey
                  )
                    ? match[labelKey!]
                    : match;
                  return renderValue?.(value) ?? optionLabel;
                }}
              >
                {showDefaultOption && (
                  <MenuItem
                    value=""
                    disabled
                  >
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
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFSelect;
