'use client';

import {
  useContext,
  Fragment,
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
import Switch, { type SwitchProps } from '@mui/material/Switch';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormHelperText } from '@/common';
import type { FormControlLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel, useFieldIds } from '@/utils';

export type RHFSwitchProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    isChecked: boolean,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  label?: ReactNode;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & Omit<SwitchProps, 'name'>;

const RHFSwitch = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
  disabled: muiDisabled,
  label,
  formControlLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
  slotProps: muiSlotProps,
  ...rest
}: RHFSwitchProps<T>) => {
  const {
    fieldId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx,
  };
  const { input: slotPropsInput, ...otherSlotProps } = muiSlotProps ?? {};
  const isError = !!errorMessage;

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
        }
      }) => {
        return (
          <Fragment>
            <FormControlLabel
              control={
                <Switch
                  id={fieldId}
                  name={rhfFieldName}
                  checked={Boolean(rhfValue)}
                  disabled={muiDisabled || rhfDisabled}
                  onChange={(event, isChecked) => {
                    rhfOnChange(isChecked);
                    onValueChange?.(isChecked, event);
                  }}
                  onBlur={blurEvent => {
                    rhfOnBlur();
                    onBlur?.(blurEvent);
                  }}
                  aria-describedby={isError ? errorId : helperTextId}
                  aria-invalid={isError || undefined}
                  slotProps={{
                    ...otherSlotProps,
                    input: {
                      ...slotPropsInput,
                      ref: rhfRef
                    }
                  }}
                  {...rest}
                />
              }
              label={fieldLabel}
              sx={appliedFormControlLabelSx}
              {...otherFormControlLabelProps}
            />
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
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
};

export default RHFSwitch;
