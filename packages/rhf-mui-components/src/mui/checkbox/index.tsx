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
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormHelperText } from '@/common';
import type {
  FormControlLabelProps,
  FormHelperTextProps,
  CheckboxProps,
  CustomComponentIds
} from '@/types';
import { fieldNameToLabel, mergeRefs, useFieldIds } from '@/utils';

export type RHFCheckboxProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
 * Custom change handler that overrides the default checked state update.
 *
 * Useful when you need to intercept or transform the checkbox value
 * before updating React Hook Form state.
 *
 * ⚠️ Important: You must call `rhfOnChange` manually to update the form state.
 * `onValueChange` is not invoked when using `customOnChange`.
 *
 * @param rhfOnChange - React Hook Form's internal change handler
 * @param checked - The new checked state of the checkbox
 * @param event - The change event triggered by the checkbox
 */
  customOnChange?: (
    rhfOnChange: (isChecked: boolean) => void,
    checked: boolean,
    event: ChangeEvent<HTMLInputElement>
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
} & CheckboxProps;

const RHFCheckbox = forwardRef(function RHFCheckbox<T extends FieldValues>(
  {
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
  }: RHFCheckboxProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const { fieldId, helperTextId, errorId } = useFieldIds(fieldName, customIds);

  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

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
                  <MuiCheckbox
                    id={fieldId}
                    name={rhfFieldName}
                    checked={Boolean(rhfValue)}
                    disabled={rhfDisabled}
                    onChange={(event, checked) => {
                      if (customOnChange) {
                        customOnChange(rhfOnChange, checked, event);
                        return;
                      }
                      rhfOnChange(checked);
                      onValueChange?.(checked, event);
                    }}
                    onBlur={(blurEvent) => {
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
  props: RHFCheckboxProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFCheckbox;
