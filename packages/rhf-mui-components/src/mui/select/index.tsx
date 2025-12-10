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
  FormHelperText
} from '@/mui/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  StrNumObjOption,
  SelectProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  keepLabelAboveFormField,
} from '@/utils';

type SelectValueType = StrNumObjOption | StrNumObjOption[];

export type RHFSelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: StrNumObjOption[];
  labelKey?: string;
  valueKey?: string;
  /**
   * @deprecated
   * This prop will be removed in the next major update.
   * Use `placeholder` prop instead to show placeholder text when
   * no option is selected.
   */
  showDefaultOption?: boolean;
  /**
   * @deprecated
   * This prop will be removed in the next major update.
   * Use `placeholder` prop instead to show placeholder text when
   * no option is selected.
   */
  defaultOptionText?: string;
  onValueChange?: (
    newValue: SelectValueType,
    event: SelectChangeEvent<SelectValueType>,
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

const RHFSelect = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  showDefaultOption,
  defaultOptionText,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  multiple,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
  renderValue,
  placeholder,
  ...otherSelectProps
}: RHFSelectProps<T>) => {
  validateArray('RHFSelect', options, labelKey, valueKey);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabelText = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? fieldLabelText;
  const SelectFormLabel = (
    <FormLabelText
      label={fieldLabel}
      required={required}
    />
  );
  const isError = Boolean(errorMessage);

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
        render={({ field: { value, onChange, onBlur: rhfOnBlur, ...otherFieldProps } }) => {
          const isValueEmpty
            = !value
              || value === ''
              || (multiple && Array.isArray(value) && !value.length);
          const showPlaceholder = isValueEmpty && Boolean(placeholder);
          const selectLabelProp = isLabelAboveFormField || isValueEmpty
            ? undefined
            : SelectFormLabel;
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
                labelId={labelId}
                label={selectLabelProp}
                value={value ?? (multiple ? [] : '')}
                error={isError}
                multiple={multiple}
                displayEmpty={isValueEmpty}
                onChange={(event, child) => {
                  const selectedValue = event.target.value;
                  onChange(selectedValue);
                  if (onValueChange) {
                    onValueChange(selectedValue, event, child);
                  }
                }}
                {...otherSelectProps}
                onBlur={blurEvent => {
                  rhfOnBlur();
                  onBlur?.(blurEvent);
                }}
                renderValue={value => {
                  if (showPlaceholder) {
                    return placeholder;
                  }
                  if (multiple) {
                    return renderValue?.(value) ?? value.join(', ');
                  }
                  return renderValue?.(value) ?? value;
                }}
              >
                <MenuItem
                  value=""
                  disabled
                  sx={{ display: showDefaultOption ? 'block' : 'none' }}
                >
                  {defaultOptionText ?? `Select ${fieldLabelText}`}
                </MenuItem>
                {options.map(option => {
                  const isObject = isKeyValueOption(option, labelKey, valueKey);
                  const opnValue = isObject
                    ? `${option[valueKey ?? '']}`
                    : option;
                  const opnLabel = isObject
                    ? `${option[labelKey ?? '']}`
                    : option;
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
