'use client';

import {
  useState,
  useContext,
  forwardRef,
  type ReactNode,
  type JSX,
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent,
  type Ref
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue
} from '@/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  TextFieldProps,
  CustomComponentIds,
  CustomOnChangeProps
} from '@/types';

type OnValueChangeProps = {
  newValue: string;
  event: ChangeEvent<HTMLInputElement>;
};
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  mergeRefs,
  useFieldIds
} from '@/utils';

type InputPasswordProps = Omit<
  TextFieldProps,
  | 'type'
  | 'multiline'
  | 'rows'
  | 'minRows'
  | 'maxRows'
  | 'onChange'
  | 'onBlur'
> & {
  /** Always an `<input>`; multiline / textarea are not supported. */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

export type RHFPasswordInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * Custom change handler that overrides the default string value update.
   *
   * Use when you need to intercept or transform the password field value before
   * updating React Hook Form state.
   *
   * ⚠️ Important: Call `rhfOnChange` manually to update the form state.
   * `onValueChange` is not invoked when this callback is provided.
   *
   * @param rhfOnChange - React Hook Form field change handler
   * @param newValue - Current input string value
   * @param event - Change event from the underlying `<input>`
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<OnValueChangeProps, string>) => void;
  onValueChange?: ({ newValue, event }: OnValueChangeProps) => void;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  showPasswordIcon?: ReactNode;
  hidePasswordIcon?: ReactNode;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * This prop is no longer needed.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  customIds?: CustomComponentIds;
} & InputPasswordProps;

const RHFPasswordInputInner = forwardRef(function RHFPasswordInput<
  T extends FieldValues
>({
  fieldName,
  control,
  registerOptions,
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  hideLabel,
  formLabelProps,
  showPasswordIcon,
  hidePasswordIcon,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  slotProps: muiSlotProps,
  onBlur: muiOnBlur,
  autoComplete = defaultAutocompleteValue,
  customIds,
  ...restTextFieldProps
}: RHFPasswordInputProps<T>,
ref: Ref<HTMLInputElement>) {
  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const [showPassword, setShowPassword] = useState(false);
  const ShowPasswordIcon = showPasswordIcon ?? <VisibilityOffIcon />;
  const HidePasswordIcon = hidePasswordIcon ?? <VisibilityIcon />;

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        type="button"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? HidePasswordIcon : ShowPasswordIcon}
      </IconButton>
    </InputAdornment>
  );

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
          ref: rhfRef
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
          <FormControl error={isError}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
                required={required}
                error={isError}
                formLabelProps={{
                  id: labelId,
                  htmlFor: fieldId,
                  ...formLabelProps
                }}
              />
            )}
            <TextField
              {...restTextFieldProps}
              id={fieldId}
              name={rhfFieldName}
              inputRef={mergeRefs(rhfRef, ref)}
              autoComplete={autoComplete}
              type={showPassword ? 'text' : 'password'}
              label={
                !hideLabel && !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={required} />
                  )
                  : undefined
              }
              value={rhfValue ?? ''}
              disabled={muiDisabled}
              onChange={event => {
                const changeEvent = event as ChangeEvent<HTMLInputElement>;
                const newValue = changeEvent.target.value;
                if (customOnChange) {
                  customOnChange({
                    rhfOnChange,
                    newValue,
                    event: changeEvent
                  });
                  return;
                }
                rhfOnChange(newValue);
                onValueChange?.({ newValue, event: changeEvent });
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                muiOnBlur?.(blurEvent as FocusEvent<HTMLInputElement>);
              }}
              error={isError}
              slotProps={{
                ...muiSlotProps,
                htmlInput: {
                  ...muiSlotProps?.htmlInput,
                  'aria-labelledby':
                    !hideLabel && isLabelAboveFormField ? labelId : undefined,
                  'aria-describedby': showHelperTextElement
                    ? isError
                      ? errorId
                      : helperTextId
                    : undefined,
                  'aria-required': required
                },
                input: {
                  ...muiSlotProps?.input,
                  endAdornment: (
                    <>
                      {(muiSlotProps?.input as { endAdornment?: ReactNode })?.endAdornment}
                      {endAdornment}
                    </>
                  )
                }
              }}
              multiline={false}
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
          </FormControl>
        );
      }}
    />
  );
});

const RHFPasswordInput = RHFPasswordInputInner as <T extends FieldValues>(
  props: RHFPasswordInputProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFPasswordInput;
