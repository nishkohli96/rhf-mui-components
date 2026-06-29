'use client';

import {
  useContext,
  Fragment,
  type FocusEvent,
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  FormControlLabelProps,
  CheckboxProps,
  OptionValue,
  StrNumObjOption
} from '@/types';
import {
  fieldNameToLabel,
  isKeyValueOption,
  coerceValue,
  getOptionValue,
  useFieldIds,
  resolveLabelAboveControl
} from '@/utils';

export type RHFCheckboxGroupProps<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
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
   * List of options to render as checkboxes. Best suited for smaller datasets, with
   * upto 10 options. For larger datasets, consider using `RHFMultiAutocomplete`.
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
   * Callback fired after an option is checked or unchecked and the selected values
   * are stored in the field.
   *
   * @param selectedItemValue - Option value that was toggled.
   * @param newValue - Updated array of selected option values.
   * @param event - Checkbox change event.
   */
  onValueChange?: (
    selectedItemValue: OptionValue<Option, ValueKey>,
    newValue: OptionValue<Option, ValueKey>[],
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  /**
   * When true, disables the field and associated controls.
   */
  disabled?: boolean;
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
   * Props to pass down to each Checkbox component. Can be used to set
   * a custom color, size, etc. for all checkboxes in the group.
   */
  checkboxProps?: CheckboxProps;
  /**
   * Props forwarded to each internal MUI `FormControlLabel`.
   */
  formControlLabelProps?: FormControlLabelProps;
  /**
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
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
   * Callback fired when focus leaves the checkbox group.
   */
  onBlur?: (event: FocusEvent<HTMLDivElement, Element>) => void;
};

const RHFCheckboxGroup = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>
>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  checkboxProps,
  formControlLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur
}: RHFCheckboxGroupProps<T, Option, LabelKey, ValueKey>) => {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const {
    defaultFormControlLabelSx,
    allLabelsAboveFields
  } = useContext(RHFMuiConfigContext);
  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({ field }) => {
        const {
          value,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          disabled: rhfDisabled
        } = field as {
          value: OptionValue<Option, ValueKey>[];
          onChange: (v: OptionValue<Option, ValueKey>[]) => void;
          onBlur: () => void;
          disabled: boolean;
        };
        const rhfValue = value ?? [];
        const isDisabled = muiDisabled || rhfDisabled;
        const isError = !!errorMessage;
        const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

        const handleChange = (
          event: ChangeEvent<HTMLInputElement>,
          checked: boolean,
          optionValue: OptionValue<Option, ValueKey>
        ) => {
          const normalized = coerceValue(event.target.value, optionValue);
          const newValue = checked
            ? rhfValue.includes(normalized)
              ? rhfValue
              : [...rhfValue, normalized]
            : rhfValue.filter(v => v !== normalized);
          rhfOnChange(newValue);
          onValueChange?.(normalized, newValue, event);
        };

        return (
          <FormControl
            component="fieldset"
            error={isError}
            disabled={isDisabled}
            onBlur={e => {
              const currentTarget = e.currentTarget;
              const relatedTarget = e.relatedTarget as Node | null;
              /**
               * Trigger blur event only if focus is moving OUTSIDE
               * the checkbox group, instead of calling onBlur for
               * every checkbox.
               */
              if (!currentTarget.contains(relatedTarget)) {
                rhfOnBlur();
                onBlur?.(e);
              }
            }}
          >
            <Fragment>
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveControl}
                required={required}
                error={isError}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  component: 'legend'
                }}
              />
              {options.map((option, idx) => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = getOptionValue<Option, ValueKey>(option, valueKey);
                const opnLabel = isObject
                  ? String(option[labelKey!])
                  : String(option);
                const checked = rhfValue.includes(opnValue);
                return (
                  <FormControlLabel
                    {...otherFormControlLabelProps}
                    key={`${opnValue}-${idx}`}
                    control={
                      <Checkbox
                        {...checkboxProps}
                        id={`${fieldId}-${opnValue}`}
                        name={`${fieldName}-${idx}`}
                        value={opnValue}
                        checked={checked}
                        disabled={isDisabled}
                        onChange={e => handleChange(e, e.target.checked, opnValue)}
                      />
                    }
                    label={opnLabel}
                    sx={appliedFormControlLabelSx}
                    disabled={isDisabled}
                  />
                );
              })}
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
            </Fragment>
          </FormControl>
        );
      }}
    />
  );
};

export default RHFCheckboxGroup;
