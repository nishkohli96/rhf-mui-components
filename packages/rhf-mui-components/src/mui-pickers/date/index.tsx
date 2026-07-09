'use client';

import { useContext, type ReactNode } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DatePicker as MuiDatePicker,
  type DatePickerProps,
  type PickerValidDate,
  type DateValidationError,
  type PickerChangeHandlerContext
} from '@mui/x-date-pickers';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  type FormLabelProps,
  type FormHelperTextProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  fieldNameToLabel,
  generateDateAdapterErrMsg,
  keepLabelAboveFormField,
  useFieldIds,
} from '@/utils';

type DatePickerInputProps = Omit<
  DatePickerProps<PickerValidDate>,
  | 'name'
  | 'value'
  | 'defaultValue'
>;

export type RHFDatePickerProps<T extends FieldValues> = {
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
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
  /**
   * Callback fired after a date is accepted or cleared and stored in the field.
   * @param newValue - Accepted date value, or `null` when the picker is cleared.
   * @param context - MUI picker validation context for the change.
   */
  onValueChange?: (
    newValue: PickerValidDate,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void;
  /**
   * When `true`, renders the label above the component instead of within the field layout.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
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
} & DatePickerInputProps;

const RHFDatePicker = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  required,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  slotProps: muiSlotProps,
  onChange: muiOnChange,
  onAccept: muiOnAccept,
  ...otherDatePickerProps
}: RHFDatePickerProps<T>) => {
  const { dateAdapter, allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  if(!dateAdapter) {
    throw new Error(generateDateAdapterErrMsg('RHFDatePicker'));
  }
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);
  const {
    textField: textFieldSlotProps,
    ...otherSlotProps
  } = muiSlotProps ?? {};
  const appliedTextFieldSlotProps = typeof textFieldSlotProps === 'function'
    ? undefined
    : textFieldSlotProps;

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
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
        }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const isError = !!errorMessage;
        const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

        return (
          <LocalizationProvider dateAdapter={dateAdapter}>
            <FormControl error={isError} disabled={isDisabled}>
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
                required={required}
                error={isError}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  htmlFor: fieldId
                }}
              />
              <MuiDatePicker
                {...otherDatePickerProps}
                name={rhfFieldName}
                inputRef={rhfRef}
                value={rhfValue || null}
                disabled={isDisabled}
                onChange={(newValue, context) => {
                  /**
                   * Forward the MUI onChange event and synchronize RHF
                   * when the value becomes null (clear action), while
                   * keeping the accept-based update for normal selections.
                   */
                  muiOnChange?.(newValue, context);
                  if(newValue === null) {
                    rhfOnChange(newValue);
                    onValueChange?.(newValue, context);
                  }
                }}
                onAccept={(newValue, context) => {
                  rhfOnChange(newValue);
                  onValueChange?.(newValue, context);
                  muiOnAccept?.(newValue, context);
                }}
                label={
                  !isLabelAboveFormField
                    ? (
                      <FormLabelText label={fieldLabel} required={required} />
                    )
                    : undefined
                }
                slotProps={{
                  ...otherSlotProps,
                  textField: {
                    ...appliedTextFieldSlotProps,
                    id: fieldId,
                    error: isError,
                    onBlur: rhfOnBlur,
                    inputProps: {
                      ...appliedTextFieldSlotProps?.inputProps,
                      'aria-labelledby': isLabelAboveFormField
                        ? labelId
                        : undefined,
                      'aria-describedby': showHelperTextElement
                        ? isError
                          ? errorId
                          : helperTextId
                        : undefined,
                      'aria-required': required || undefined
                    },
                  },
                }}
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
            </FormControl>
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default RHFDatePicker;
