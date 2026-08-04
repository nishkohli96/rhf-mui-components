'use client';

import {
  forwardRef,
  useContext,
  type JSX,
  type ReactNode,
  type Ref,
  type SyntheticEvent
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import {
  type AutocompleteProps,
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason,
  type AutocompleteValue
} from '@mui/material/Autocomplete';
import MUIAutocompleteObject from '@nish1896/mui-components/mui/autocomplete-object';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type AutoCompleteTextFieldProps,
  type MuiChipProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { KeyValueOption, CustomComponentIds } from '@/types';
import {
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
  resolveRequired
} from '@/utils';

type OmittedAutocompleteProps<
  Option extends KeyValueOption = KeyValueOption,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
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
  | 'blurOnSelect'
  | 'disableCloseOnSelect'
  | 'ChipProps'
  | 'ref'
  | 'disableClearable'
>;

type OnValueChangeProps<
  Option extends KeyValueOption = KeyValueOption,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
> = {
  newValue: AutocompleteValue<Option, Multiple, DisableClearable, false>;
  event: SyntheticEvent<Element, Event>;
  reason: AutocompleteChangeReason;
  details?: AutocompleteChangeDetails<Option>;
};

export type RHFAutocompleteObjectProps<
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
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
   * A list of options that will be shown in the Autocomplete.
   */
  options: Option[];
  /**
   * When true, allows selecting multiple values.
   */
  multiple?: Multiple;
  /**
   * Object key used to read the display label from each option.
   */
  labelKey: LabelKey;
  /**
   * Object key used to derive the stored field value when options are an array of objects.
   */
  valueKey: ValueKey;
  /**
   * Overrides the default object autocomplete change handling.
   * Receives the selected object value from MUI without reducing it to `valueKey`.
   * Call `rhfOnChange` with the object, object array, or `null` value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the selected object value.
   * @param newValue - Selected value(s) stored in the form: `object[]` when `multiple` is true, otherwise `object`.
   * Includes `null` only when clearing is allowed (`disableClearable` is false).
   * @param event - Original MUI Autocomplete change event.
   * @param reason - MUI Autocomplete reason for the change.
   * @param details - Additional MUI Autocomplete change details, when available.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event,
    reason,
    details
  }: CustomOnChangeProps<
    OnValueChangeProps<Option, Multiple, DisableClearable>,
    AutocompleteValue<Option, Multiple, DisableClearable, false>
  >) => void;
  /**
   * Called after the default object autocomplete handler stores the selected object value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Selected value(s) stored in the form: `object[]` when `multiple` is true, otherwise `object`.
   * Includes `null` only when clearing is allowed (`disableClearable` is false).
   * @param event - Original MUI Autocomplete change event.
   * @param reason - MUI Autocomplete reason for the change.
   * @param details - Additional MUI Autocomplete change details, when available.
   */
  onValueChange?: ({
    newValue,
    event,
    reason,
    details
  }: OnValueChangeProps<Option, Multiple, DisableClearable>) => void;
  /**
   * When true, the selected value cannot be cleared from the input.
   * @default false
   */
  disableClearable?: DisableClearable;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * When `true`, renders the label above the component instead of within the field layout.
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
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
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
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Props forwarded to the internal MUI `TextField`.
   */
  textFieldProps?: AutoCompleteTextFieldProps;
  /**
   * Props forwarded to chips rendered for selected values.
   */
  ChipProps?: MuiChipProps;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
} & OmittedAutocompleteProps<Option, Multiple, DisableClearable>;

const RHFAutocompleteObjectInner = forwardRef(function RHFAutocompleteObject<
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
>({
  fieldName,
  control,
  registerOptions,
  options,
  multiple,
  labelKey,
  valueKey,
  disableClearable,
  autoHighlight,
  customOnChange,
  onValueChange,
  onFocus: muiOnFocus,
  onBlur: muiOnBlur,
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
  textFieldProps,
  slotProps,
  ChipProps,
  loading,
  limitTags,
  getLimitTagsText,
  customIds,
  ...otherAutocompleteObjectProps
}: RHFAutocompleteObjectProps<
  T,
  Option,
  LabelKey,
  ValueKey,
  Multiple,
  DisableClearable
>,
ref: Ref<HTMLInputElement>) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);
  const isFieldRequired = resolveRequired(required, registerOptions?.required);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const { sx: formLabelSx, ...otherFormLabelProps } = formLabelProps ?? {};
  const { sx: formHelperTextSx, ...otherFormHelperTextProps }
    = formHelperTextProps ?? {};

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          name: rhfFieldName,
          ref: rhfRef,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage = typeof errorMessage === 'string'
          ? errorMessage
          : fieldStateError?.message?.toString();

        return (
          <MUIAutocompleteObject
            {...otherAutocompleteObjectProps}
            fieldName={rhfFieldName}
            ref={mergeRefs(rhfRef, ref)}
            options={options}
            labelKey={labelKey}
            valueKey={valueKey}
            multiple={multiple}
            disableClearable={disableClearable}
            autoHighlight={autoHighlight}
            value={rhfValue}
            onValueChange={({ newValue, event, reason, details }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, event, reason, details });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, event, reason, details });
            }}
            onFocus={muiOnFocus}
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent);
            }}
            disabled={isDisabled}
            label={label}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            required={isFieldRequired}
            errorMessage={fieldErrorMessage}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            hideErrorMessage={hideErrorMessage}
            helperText={helperText}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
            textFieldProps={textFieldProps}
            slotProps={slotProps}
            ChipProps={ChipProps}
            loading={loading}
            limitTags={limitTags}
            getLimitTagsText={getLimitTagsText}
            customIds={customIds}
          />
        );
      }}
    />
  );
});

/**
 * The component is designed to store complete option object(s) in form state.
 *
 * `freeSolo` is not supported in `RHFAutocompleteObject` as it would introduce
 * string values alongside objects (`Option | string`), making the field value
 * less predictable and type-safe.
 *
 * Use `RHFAutocomplete` instead when `freeSolo` behavior is required.
 */
const RHFAutocompleteObject = RHFAutocompleteObjectInner as <
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
>(
  props: RHFAutocompleteObjectProps<
    T,
    Option,
    LabelKey,
    ValueKey,
    Multiple,
    DisableClearable
  > & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFAutocompleteObject;
