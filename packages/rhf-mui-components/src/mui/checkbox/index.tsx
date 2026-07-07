'use client';

import {
  useContext,
  forwardRef,
  Fragment,
  type JSX,
  type Ref,
  type ReactNode,
  type ChangeEvent
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';
import {
  FormHelperText,
  type FormControlLabelProps,
  type FormHelperTextProps,
  type CheckboxProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';

type OnValueChangeProps = {
  newValue: boolean;
  event: ChangeEvent<HTMLInputElement>;
};
import { fieldNameToLabel, mergeRefs, useFieldIds } from '@/utils';

export type RHFCheckboxProps<T extends FieldValues> = {
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
   * Overrides the default checkbox change handling.
   * Receives the next checked state and the original checkbox change event.
   * Call `rhfOnChange` with the boolean value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the checked value.
   * @param newValue - Next checked state.
   * @param event - Original checkbox change event.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<OnValueChangeProps, boolean>) => void;
  /**
   * Called after the default checkbox handler stores the next checked state in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next checked state.
   * @param event - Original checkbox change event.
   */
  onValueChange?: ({ newValue, event }: OnValueChangeProps) => void;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * Props forwarded to the checkbox `FormControlLabel`.
   */
  formControlLabelProps?: FormControlLabelProps;
  /**
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
  /**
   * Custom renderer for the React Hook Form field error.
   * Receives the current field error and must return renderable content, such as `error.message` or a custom element.
   *
   * @param error - React Hook Form field error for this field.
   */
  renderError?: (error: FieldError) => ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
} & CheckboxProps;

const RHFCheckboxInner = forwardRef(function RHFCheckbox<T extends FieldValues>(
  {
    fieldName,
    control,
    registerOptions,
    customOnChange,
    onValueChange,
    disabled: muiDisabled,
    label,
    formControlLabelProps,
    hideLabel,
    renderError,
    hideErrorMessage,
    helperText,
    formHelperTextProps,
    onBlur,
    slotProps: muiSlotProps,
    customIds,
    ...otherCheckboxProps
  }: RHFCheckboxProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const { fieldId, helperTextId, errorId } = useFieldIds(fieldName, customIds);

  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const defaultFieldLabel = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? defaultFieldLabel;
  const accessibleFieldLabel = typeof fieldLabel === 'string'
    ? fieldLabel
    : defaultFieldLabel;

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };
  const { input: slotPropsInput, ...otherSlotProps } = muiSlotProps ?? {};

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
        const fieldErrorMessage = fieldStateError
          ? renderError?.(fieldStateError) ?? fieldStateError.message?.toString()
          : undefined;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        return (
          <Fragment>
            <FormControlLabel
              {...otherFormControlLabelProps}
              control={
                <MuiCheckbox
                  {...otherCheckboxProps}
                  id={fieldId}
                  name={rhfFieldName}
                  checked={Boolean(rhfValue)}
                  disabled={isDisabled}
                  onChange={(event, checked) => {
                    if (customOnChange) {
                      customOnChange({ rhfOnChange, newValue: checked, event });
                      return;
                    }
                    rhfOnChange(checked);
                    onValueChange?.({ newValue: checked, event });
                  }}
                  onBlur={blurEvent => {
                    rhfOnBlur();
                    onBlur?.(blurEvent);
                  }}
                  aria-label={hideLabel ? accessibleFieldLabel : undefined}
                  aria-describedby={
                    showHelperTextElement
                      ? isError
                        ? errorId
                        : helperTextId
                      : undefined
                  }
                  aria-invalid={isError || undefined}
                  slotProps={{
                    ...otherSlotProps,
                    input: {
                      ...slotPropsInput,
                      ref: mergeRefs(rhfRef, ref)
                    }
                  }}
                />
              }
              label={hideLabel ? undefined : fieldLabel}
              sx={appliedFormControlLabelSx}
              disabled={isDisabled}
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
          </Fragment>
        );
      }}
    />
  );
});

const RHFCheckbox = RHFCheckboxInner as <T extends FieldValues>(
  props: RHFCheckboxProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFCheckbox;
