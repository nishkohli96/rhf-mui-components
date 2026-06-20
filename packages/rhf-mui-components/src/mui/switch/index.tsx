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
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { type SwitchProps } from '@mui/material/Switch';
import { FormHelperText } from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type {
  CustomComponentIds,
  CustomOnChangeProps,
  FormControlLabelProps,
  FormHelperTextProps
} from '@/types';
import { fieldNameToLabel, mergeRefs, useFieldIds } from '@/utils';

type OnValueChangeProps = {
  newValue: boolean;
  event: ChangeEvent<HTMLInputElement>;
};

export type RHFSwitchProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * Custom change handler that overrides the default checked state update.
   *
   * Use this when you need custom logic before updating the switch value
   * in React Hook Form.
   *
   * ⚠️ Important: You must call `rhfOnChange` manually to update the form state.
   * `onValueChange` is not invoked when using `customOnChange`.
   *
   * @param rhfOnChange - React Hook Form's internal change handler
   * @param checked - The new checked state of the switch
   * @param event - The change event triggered by the switch
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<OnValueChangeProps, boolean>) => void;
  onValueChange?: ({ newValue, event }: OnValueChangeProps) => void;
  label?: ReactNode;
  hideLabel?: boolean;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
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
  hideLabel,
  formControlLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
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

  const fieldLabel = label ?? fieldNameToLabel(fieldName);
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
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        return (
          <Fragment>
            <FormControlLabel
              control={
                <Switch
                  {...otherSwitchProps}
                  id={fieldId}
                  name={rhfFieldName}
                  checked={Boolean(rhfValue)}
                  disabled={muiDisabled || rhfDisabled}
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
                  aria-label={
                    hideLabel
                      ? typeof fieldLabel === 'string'
                        ? fieldLabel
                        : undefined
                      : undefined
                  }
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
              {...otherFormControlLabelProps}
            />
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              showHelperTextElement={showHelperTextElement}
              formHelperTextProps={{
                id: isError ? errorId : helperTextId,
                ...formHelperTextProps
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
