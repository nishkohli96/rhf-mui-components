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
import {
  FormHelperText,
  type FormControlLabelProps,
  type FormHelperTextProps,
  type CheckboxProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { fieldNameToLabel, useFieldIds } from '@/utils';

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
   * Callback fired after the checkbox checked state is stored in the field.
   * @param isChecked - Updated checked state.
   * @param event - Checkbox change event.
   */
  onValueChange?: (
    isChecked: boolean,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * Props forwarded to the checkbox `FormControlLabel`.
   */
  formControlLabelProps?: FormControlLabelProps;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Validation error message displayed in the `FormHelperText` component.
   * When provided, it takes precedence over `helperText` unless
   * `hideErrorMessage` is set to `true`.
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
