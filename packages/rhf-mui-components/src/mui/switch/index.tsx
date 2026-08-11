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
import { type SwitchProps } from '@mui/material/Switch';
import MUISwitch from '@nish1896/mui-components/mui/switch';
import type { CustomComponentIds } from '@nish1896/mui-components/types';
import {
  type FormControlLabelProps,
  type FormHelperTextProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { mergeRefs, mergeSx, resolveRequired } from '@/utils';

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
} & Omit<SwitchProps, 'name' | 'value' | 'checked' | 'defaultChecked' | 'onChange' | 'ref'>;

const RHFSwitchInner = forwardRef(function RHFSwitch<T extends FieldValues>(
  {
    fieldName,
    control,
    registerOptions,
    required,
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
  }: RHFSwitchProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const {
    defaultFormControlLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);
  const isFieldRequired = resolveRequired(required, registerOptions?.required);

  const {
    sx: formControlLabelSx,
    ...otherFormControlLabelProps
  } = formControlLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};
  const {
    input: slotPropsInput,
    ...otherSlotProps
  } = muiSlotProps ?? {};

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

        return (
          <Fragment>
            <MUISwitch
              {...otherSwitchProps}
              fieldName={rhfFieldName}
              value={Boolean(rhfValue)}
              required={required}
              aria-required={isFieldRequired}
              onValueChange={({ newValue, event }) => {
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
              disabled={isDisabled}
              label={label}
              formControlLabelProps={{
                ...otherFormControlLabelProps,
                sx: mergeSx(defaultFormControlLabelSx, formControlLabelSx)
              }}
              hideLabel={hideLabel}
              errorMessage={fieldStateError?.message?.toString()}
              renderError={() => fieldStateError
                ? renderError?.(fieldStateError)
                : undefined}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              formHelperTextProps={{
                ...otherFormHelperTextProps,
                sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
              }}
              slotProps={{
                ...otherSlotProps,
                input: {
                  ...slotPropsInput,
                  ref: mergeRefs(rhfRef, ref)
                }
              }}
              customIds={customIds}
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
