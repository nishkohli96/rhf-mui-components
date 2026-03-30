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
import MuiCheckbox from '@mui/material/Checkbox';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormHelperText } from '@/common';
import type { FormControlLabelProps, FormHelperTextProps, CheckboxProps } from '@/types';
import { fieldNameToLabel, useFieldIds } from '@/utils';

export type RHFCheckboxProps<T extends FieldValues> = {
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
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & CheckboxProps;

const RHFCheckbox = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  customOnChange,
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
}: RHFCheckboxProps<T>) => {
  const {
    fieldId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx,
  };
  const { input: slotPropsInput, ...otherSlotProps } = muiSlotProps ?? {};
  const isError = !!errorMessage;
  const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

  return (
    <Fragment>
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
            <FormControlLabel
              control={
                <MuiCheckbox
                  id={fieldId}
                  name={rhfFieldName}
                  checked={Boolean(rhfValue)}
                  disabled={rhfDisabled}
                  aria-describedby={
                    showHelperTextElement
                      ? isError
                        ? errorId
                        : helperTextId
                      : undefined
                  }
                  aria-invalid={isError || undefined}
                  onChange={(event, checked) => {
                    if(customOnChange) {
                      customOnChange(rhfOnChange, checked, event);
                      return;
                    }
                    rhfOnChange(checked);
                    onValueChange?.(checked, event);
                  }}
                  onBlur={blurEvent => {
                    rhfOnBlur();
                    onBlur?.(blurEvent);
                  }}
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
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
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
};

export default RHFCheckbox;
