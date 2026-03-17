'use client';

import { useContext, useEffect, Fragment, type ReactNode } from 'react';
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
  useFieldIds,
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
  const isError = Boolean(errorMessage);

  const SelectFormLabel = (
    <FormLabelText label={fieldLabel} required={required} />
  );

  useEffect(() => {
    validateArray('RHFSelect', options, labelKey, valueKey);
  }, [options, labelKey, valueKey]);

  return (
    <FormControl error={isError}>
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
          }
        }) => {
          const isValueEmpty
            = !rhfValue
              || rhfValue === ''
              || (multiple && Array.isArray(rhfValue) && !rhfValue.length);
          const showPlaceholder = isValueEmpty && !!placeholder;
          const selectLabelProp
            = isLabelAboveFormField || isValueEmpty ? undefined : SelectFormLabel;
          const selectLabelId = isLabelAboveFormField ? undefined : labelId;

          return (
            <Fragment>
              {!isLabelAboveFormField && !showPlaceholder && (
                <InputLabel id={labelId}>
                  {SelectFormLabel}
                </InputLabel>
              )}
              <MuiSelect
                id={fieldId}
                name={rhfFieldName}
                autoComplete={autoComplete}
                labelId={selectLabelId}
                aria-describedby={isError ? errorId : helperTextId}
                label={selectLabelProp}
                value={rhfValue ?? (multiple ? [] : '')}
                error={isError}
                multiple={multiple}
                displayEmpty={isValueEmpty}
                inputRef={rhfRef}
                disabled={muiDisabled || rhfDisabled}
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
                {...otherSelectProps}
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
                    const labels = value.map(val => {
                      const match = options.find(op =>
                        isKeyValueOption(op, labelKey, valueKey)
                          ? op[valueKey!] === val
                          : op === val);
                      return isKeyValueOption(match!, labelKey, valueKey)
                        ? match[labelKey!]
                        : match;
                    });
                    return (
                      <Fragment>
                        {renderValue?.(value) ?? labels.join(', ')}
                      </Fragment>
                    );
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
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={{
          id: isError ? errorId : helperTextId,
          ...formHelperTextProps
        }}
      />
    </FormControl>
  );
};

export default RHFSelect;
