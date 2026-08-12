'use client';

import {
  useContext,
  forwardRef,
  type ReactNode,
  type JSX,
  type ChangeEvent,
  type FocusEvent,
  type Ref
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MUIPasswordInput from '@nish1896/mui-components/mui/password-input';
import type { CustomComponentIds } from '@nish1896/mui-components/types';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type TextFieldProps,
  type IconButtonProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
  resolveRequired
} from '@/utils';

type OnValueChangeProps = {
  newValue: string;
  event: ChangeEvent<HTMLInputElement>;
};

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
   * Overrides the default password input change handling.
   * Receives the next password string and the original input change event.
   * Call `rhfOnChange` with the string that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the password string.
   * @param newValue - Next password string.
   * @param event - Original input change event.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<OnValueChangeProps, string>) => void;
  /**
   * Called after the default password input handler stores the next string in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next password string.
   * @param event - Original input change event.
   */
  onValueChange?: ({ newValue, event }: OnValueChangeProps) => void;
  /**
   * When `true`, renders the label above the component instead of within the field layout.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
  /**
   * Custom icon displayed when the password is currently hidden.
   *
   * Clicking this icon reveals the password value.
   *
   * @default Visibility icon
   */
  showPasswordIcon?: ReactNode;
  /**
   * Custom icon displayed when the password is currently visible.
   *
   * Clicking this icon hides the password value.
   *
   * @default VisibilityOff icon
   */
  hidePasswordIcon?: ReactNode;
  /**
   * Props forwarded to the `IconButton` component that toggles password
   * visibility. Use `showPasswordIcon`/`hidePasswordIcon` to swap the icon
   * itself; this is for the button around it — e.g. a custom `size` or `sx`.
   */
  iconButtonProps?: IconButtonProps;
  /**
   * When true, the value is displayed but cannot be edited.
   *
   * Unlike `disabled`, the field stays focusable, is still submitted with the
   * form, and the show/hide toggle remains usable — a read-only value is
   * meaningful, so the user can still reveal it to verify it. `disabled`
   * instead makes the whole field inert, including the toggle.
   */
  readOnly?: boolean;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   *
   * Use `renderError` to customize how the field error is rendered.
   */
  errorMessage?: ReactNode;
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
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
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
  onBlur: muiOnBlur,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  showPasswordIcon,
  hidePasswordIcon,
  iconButtonProps,
  readOnly,
  required,
  errorMessage,
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  slotProps: muiSlotProps,
  autoComplete,
  customIds,
  ...otherPasswordInputProps
}: RHFPasswordInputProps<T>,
ref: Ref<HTMLInputElement>) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const isFieldRequired = resolveRequired(required, registerOptions?.required);

  const {
    sx: formLabelSx,
    ...otherFormLabelProps
  } = formLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};

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
        const fieldErrorMessage = typeof errorMessage === 'string'
          ? errorMessage
          : fieldStateError?.message?.toString();

        return (
          <MUIPasswordInput
            {...otherPasswordInputProps}
            fieldName={rhfFieldName}
            inputRef={mergeRefs(rhfRef, ref)}
            value={rhfValue}
            onValueChange={({ newValue, event }) => {
              if (customOnChange) {
                customOnChange({
                  rhfOnChange,
                  newValue,
                  event
                });
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
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            showPasswordIcon={showPasswordIcon}
            hidePasswordIcon={hidePasswordIcon}
            iconButtonProps={iconButtonProps}
            readOnly={readOnly}
            required={isFieldRequired}
            errorMessage={fieldErrorMessage}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            hideErrorMessage={hideErrorMessage}
            helperText={helperText}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
            slotProps={muiSlotProps}
            autoComplete={autoComplete}
            customIds={customIds}
          />
        );
      }}
    />
  );
});

/**
 * Controlled Material UI password field, wired to a React Hook Form field via
 * `control`.
 *
 * Renders a built-in show/hide visibility toggle, with the option to customize the icon.
 *
 * Docs: [RHFPasswordInput](https://rhf-mui-components.vercel.app/v4/components/mui/RHFPasswordInput)
 *
 * API: [RHFPasswordInputProps](https://rhf-mui-components.vercel.app/v4/components/mui/RHFPasswordInput#api)
 */
const RHFPasswordInput = RHFPasswordInputInner as <T extends FieldValues>(
  props: RHFPasswordInputProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFPasswordInput;
