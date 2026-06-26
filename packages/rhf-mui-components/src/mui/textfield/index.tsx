'use client';

import {
  useContext,
  forwardRef,
  type JSX,
  type ReactNode,
  type ChangeEvent,
  type Ref
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MuiTextField from '@mui/material/TextField';
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
  TextFieldProps,
  CustomComponentIds,
  CustomOnChangeProps
} from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  mergeRefs,
  useFieldIds
} from '@/utils';

type OnValueChangeProps = {
  newValue: string;
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
};

export type RHFTextFieldProps<T extends FieldValues> = {
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
   * Overrides the default text field change handling.
   * Receives the next input string and the original input change event.
   * Call `rhfOnChange` with the string that should be stored; else the form value will not be updated.
   * `onValueChange` will not be called when `customOnChange` is used.
   *
   * @param rhfOnChange - React Hook Form field change handler for the input string.
   * @param newValue - Next input string.
   * @param event - Original input change event.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<OnValueChangeProps, string>) => void;
  /**
   * Called after the default text field handler stores the next string in React Hook Form.
   *
   * @param newValue - Next input string.
   * @param event - Original input change event.
   */
  onValueChange?: ({ newValue, event }: OnValueChangeProps) => void;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
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
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
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
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
} & TextFieldProps;

const RHFTextFieldInner = forwardRef(function RHFTextField<T extends FieldValues>(
  {
    fieldName,
    control,
    registerOptions,
    customOnChange,
    onValueChange,
    disabled: muiDisabled,
    label,
    showLabelAboveFormField,
    formLabelProps,
    hideLabel,
    required,
    helperText,
    errorMessage,
    hideErrorMessage,
    formHelperTextProps,
    onBlur: muiOnBlur,
    autoComplete = defaultAutocompleteValue,
    slotProps: muiSlotProps,
    customIds,
    ...otherTextFieldProps
  }: RHFTextFieldProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

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
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        return (
          <FormControl error={isError} disabled={isDisabled}>
            {!hideLabel && (
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
            )}
            <MuiTextField
              {...otherTextFieldProps}
              id={fieldId}
              name={rhfFieldName}
              inputRef={mergeRefs(rhfRef, ref)}
              autoComplete={autoComplete}
              label={
                !hideLabel && !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={required} />
                  )
                  : undefined
              }
              value={rhfValue ?? ''}
              disabled={isDisabled}
              onChange={event => {
                const newValue = event.target.value;
                if (customOnChange) {
                  customOnChange({ rhfOnChange, newValue, event });
                  return;
                }
                rhfOnChange(newValue);
                onValueChange?.({ newValue, event });
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                muiOnBlur?.(blurEvent);
              }}
              error={isError}
              slotProps={{
                ...muiSlotProps,
                htmlInput: {
                  ...muiSlotProps?.htmlInput,
                  'aria-labelledby':
                    !hideLabel && isLabelAboveFormField ? labelId : undefined,
                  'aria-describedby': showHelperTextElement
                    ? isError
                      ? errorId
                      : helperTextId
                    : undefined,
                  'aria-required': required
                }
              }}
            />
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
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
});

const RHFTextField = RHFTextFieldInner as <T extends FieldValues>(
  props: RHFTextFieldProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFTextField;
