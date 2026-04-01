'use client';

import {
  useContext,
  Fragment,
  forwardRef,
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
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormHelperText } from '@/common';
import type {
  CustomComponentIds,
  FormControlLabelProps,
  FormHelperTextProps
} from '@/types';
import { fieldNameToLabel, mergeRefs, useFieldIds } from '@/utils';

export type RHFSwitchProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  customOnChange?: (
    rhfOnChange: (isChecked: boolean) => void,
    checked: boolean,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onValueChange?: (
    isChecked: boolean,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  label?: ReactNode;
  hideLabel?: boolean;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  customIds?: CustomComponentIds;
} & Omit<SwitchProps, 'name'>;

const RHFSwitch = forwardRef(function RHFSwitch<T extends FieldValues>({
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
  onBlur,
  slotProps: muiSlotProps,
  customIds,
  ...rest
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
      disabled={muiDisabled}
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
        const fieldErrorMessage =
        fieldStateError?.message?.toString() ?? errorMessage;
      const isError = !!fieldErrorMessage;
      const showHelperTextElement = !!(
        helperText ||
        (isError && !hideErrorMessage)
      );
        return (
          <Fragment>
            <FormControlLabel
              control={
                <Switch
                  id={fieldId}
                  name={rhfFieldName}
                  checked={Boolean(rhfValue)}
                  disabled={rhfDisabled}
                  onChange={(event, isChecked) => {
                    if(customOnChange) {
                      customOnChange(rhfOnChange, isChecked, event);
                      return;
                    }
                    rhfOnChange(isChecked);
                    onValueChange?.(isChecked, event);
                  }}
                  onBlur={blurEvent => {
                    rhfOnBlur();
                    onBlur?.(blurEvent);
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
                  {...rest}
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
}) as <T extends FieldValues>(
  props: RHFSwitchProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFSwitch;
