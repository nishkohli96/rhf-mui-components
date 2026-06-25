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
  onValueChange?: (
    isChecked: boolean,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  label?: ReactNode;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
} & CheckboxProps;

const RHFCheckbox = <T extends FieldValues>({
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
  ...otherCheckboxProps
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
  return (
    <Fragment>
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
                    aria-describedby={
                      showHelperTextElement
                        ? isError
                          ? errorId
                          : helperTextId
                        : undefined
                    }
                    aria-invalid={isError || undefined}
                    onChange={(event, checked) => {
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
                  />
                }
                label={fieldLabel}
                disabled={isDisabled}
                sx={appliedFormControlLabelSx}
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
            </Fragment>
          );
        }}
      />
    </Fragment>
  );
};

export default RHFCheckbox;
