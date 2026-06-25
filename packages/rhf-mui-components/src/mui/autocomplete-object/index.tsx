'use client';

import {
  useCallback,
  useContext,
  type ReactNode,
  type SyntheticEvent
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Autocomplete, {
  type AutocompleteProps,
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason,
  type AutocompleteValue
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
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
  KeyValueOption,
  AutoCompleteTextFieldProps,
  MuiChipProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isAboveMuiV5,
  useFieldIds,
  keepLabelAboveFormField
} from '@/utils';

type OmittedAutocompleteProps<
  Option,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
> = Omit<
  AutocompleteProps<Option, Multiple, DisableClearable, false>,
  | 'freeSolo'
  | 'multiple'
  | 'fullWidth'
  | 'renderInput'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'autoHighlight'
  | 'blurOnSelect'
  | 'disableClearable'
  | 'disableCloseOnSelect'
  | 'ChipProps'
>;

type AutocompleteFieldValue<
  Option,
  Multiple extends boolean,
  DisableClearable extends boolean,
> = AutocompleteValue<Option, Multiple, DisableClearable, false>;

export type RHFAutocompleteObjectProps<
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
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
   * Options rendered by the field.
   */
  options: Option[];
  /**
   * Object key used to read the display label from each option.
   */
  labelKey: LabelKey;
  /**
   * Object key used to derive the stored field value when options are an array of objects.
   */
  valueKey: ValueKey;
  /**
   * When true, allows selecting multiple option objects.
   */
  multiple?: Multiple;
  /**
   * When true, the selected value cannot be cleared from the input.
   * @default false
   */
  disableClearable?: DisableClearable;
  /**
   * Callback fired after the selected option object value is stored in the field.
   * @param fieldValue - Selected option object, selected option objects, or `null` when cleared.
   * @param event - MUI autocomplete change event.
   * @param reason - Reason reported by MUI for the value change.
   * @param details - Optional MUI details for the changed option.
   */
  onValueChange?: (
    fieldValue: Option | Option[] | null,
    event: SyntheticEvent<Element, Event>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Option>
  ) => void;
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
   * Props forwarded to the internal MUI `TextField` used to render the input.
   */
  textFieldProps?: AutoCompleteTextFieldProps;
  /**
   * Props forwarded to chips rendered for selected values.
   */
  ChipProps?: MuiChipProps;
} & OmittedAutocompleteProps<Option, Multiple, DisableClearable>;

const RHFAutocompleteObject = <
  T extends FieldValues,
  Option extends KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
>({
  fieldName,
  control,
  registerOptions,
  options,
  multiple,
  disableClearable,
  labelKey,
  valueKey,
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
  textFieldProps,
  slotProps,
  ChipProps,
  onBlur,
  loading,
  ...otherAutoCompleteProps
}: RHFAutocompleteObjectProps<
  T,
  Option,
  LabelKey,
  ValueKey,
  Multiple,
  DisableClearable
>) => {
  validateArray('RHFAutocompleteObject', options, labelKey, valueKey);

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
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const renderOptionLabel = useCallback(
    (option: Option): string => {
      return option[labelKey];
    },
    [labelKey],
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
        const selectedOptions = rhfValue as AutocompleteFieldValue<
          Option,
          Multiple,
          DisableClearable
        >;

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
            <Autocomplete
              {...otherAutoCompleteProps}
              id={fieldId}
              options={options}
              multiple={multiple}
              disableClearable={disableClearable}
              value={selectedOptions}
              loading={loading}
              autoHighlight
              blurOnSelect={!multiple}
              disableCloseOnSelect={multiple}
              fullWidth
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...otherChipProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      {...otherChipProps}
                      label={renderOptionLabel(option)}
                      {...ChipProps}
                    />
                  );
                })}
              disabled={isDisabled}
              onChange={(
                event,
                newValue,
                reason: AutocompleteChangeReason,
                details?: AutocompleteChangeDetails<Option>
              ) => {
                const fieldValue = newValue === null
                  ? null
                  : Array.isArray(newValue)
                    ? newValue as Option[]
                    : newValue as Option;
                rhfOnChange(newValue);
                onValueChange?.(fieldValue, event, reason, details);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              limitTags={2}
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={option => renderOptionLabel(option)}
              isOptionEqualToValue={(option, value) => {
                return (
                  option[valueKey] === value[valueKey]
                );
              }}
              renderInput={params => {
                const {
                  InputProps,
                  inputProps,
                  disabled: paramsDisabled,
                  ...otherInputParams
                } = params ?? {};
                const {
                  autoComplete = defaultAutocompleteValue,
                  ...otherTextFieldProps
                } = textFieldProps ?? {};
                const textFieldInputProps = {
                  ...inputProps,
                  'aria-required': required,
                  'aria-invalid': isError,
                  'aria-labelledby': isLabelAboveFormField ? labelId : undefined,
                  'aria-describedby': showHelperTextElement
                    ? (isError ? errorId : helperTextId)
                    : undefined,
                  autoComplete
                };
                return (
                  <TextField
                    {...otherTextFieldProps}
                    {...otherInputParams}
                    name={rhfFieldName}
                    inputRef={rhfRef}
                    disabled={paramsDisabled}
                    label={
                      !isLabelAboveFormField
                        ? (
                          <FormLabelText label={fieldLabel} required={required} />
                        )
                        : undefined
                    }
                    error={isError}
                    {...(isAboveMuiV5
                      ? {
                        slotProps: {
                          ...textFieldProps?.slotProps,
                          input: {
                            ...InputProps,
                            ...textFieldProps?.slotProps?.input,
                            endAdornment: (
                              <>
                                {loading && (
                                  <CircularProgress
                                    color="inherit"
                                    size={20}
                                  />
                                )}
                                {InputProps?.endAdornment}
                              </>
                            )
                          },
                          htmlInput: textFieldInputProps
                        }
                      }
                      : {
                        InputProps: {
                          ...InputProps,
                          ...textFieldProps?.InputProps,
                          endAdornment: (
                            <>
                              {loading && (
                                <CircularProgress color="inherit" size={20} />
                              )}
                              {InputProps?.endAdornment}
                            </>
                          )
                        },
                        inputProps: textFieldInputProps
                      })}
                  />
                );
              }}
              {...(isAboveMuiV5
                ? {
                  slotProps: {
                    ...slotProps,
                    chip: ChipProps
                  }
                }
                : { ChipProps, slotProps })}
            />
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

export default RHFAutocompleteObject;
