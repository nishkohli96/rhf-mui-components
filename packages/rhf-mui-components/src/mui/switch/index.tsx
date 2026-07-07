'use client';

import {
  useContext,
  forwardRef,
  Fragment,
  type JSX,
  type ReactNode,
  type Ref,
  type ChangeEvent,
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
import Switch, { type SwitchProps } from '@mui/material/Switch';
import {
  FormHelperText,
  type FormControlLabelProps,
  type FormHelperTextProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
import { fieldNameToLabel, mergeRefs, useFieldIds } from '@/utils';

type OnValueChangeProps = {
  newValue: boolean;
  event: ChangeEvent<HTMLInputElement>;
};

export type RHFSwitchProps<T extends FieldValues> = {
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
   * Overrides the default switch change handling.
   * Receives the next checked state and the original switch change event.
   * Call `rhfOnChange` with the boolean value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the checked value.
   * @param newValue - Next checked state.
   * @param event - Original switch change event.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<OnValueChangeProps, boolean>) => void;
  /**
   * Called after the default switch handler stores the next checked state in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next checked state.
   * @param event - Original switch change event.
   */
  onValueChange?: ({ newValue, event }: OnValueChangeProps) => void;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * Props forwarded to the switch `FormControlLabel`.
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
} & Omit<SwitchProps, 'name' | 'value' | 'checked' | 'defaultChecked' | 'onChange'>;

const RHFSwitchInner = forwardRef(function RHFSwitch<T extends FieldValues>({
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
  onBlur: muiOnBlur,
  slotProps: muiSlotProps,
  customIds,
  ...otherSwitchProps
}: RHFSwitchProps<T>, ref: Ref<HTMLInputElement>) {
  const {
    fieldId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName, customIds);

  const defaultFieldLabel = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? defaultFieldLabel;
  const accessibleFieldLabel = typeof fieldLabel === 'string'
    ? fieldLabel
    : defaultFieldLabel;
  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx,
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
        const fieldErrorMessage
          = fieldStateError
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
                <Switch
                  {...otherSwitchProps}
                  id={fieldId}
                  name={rhfFieldName}
                  checked={Boolean(rhfValue)}
                  disabled={isDisabled}
                  onChange={(event, isChecked) => {
                    if(customOnChange) {
                      customOnChange({
                        rhfOnChange,
                        newValue: isChecked,
                        event
                      });
                      return;
                    }
                    rhfOnChange(isChecked);
                    onValueChange?.({ newValue: isChecked, event });
                  }}
                  onBlur={blurEvent => {
                    rhfOnBlur();
                    muiOnBlur?.(blurEvent);
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

const RHFSwitch = RHFSwitchInner as <T extends FieldValues>(
  props: RHFSwitchProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFSwitch;
