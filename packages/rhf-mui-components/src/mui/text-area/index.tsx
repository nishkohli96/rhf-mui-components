'use client';

import {
  useContext,
  forwardRef,
  type JSX,
  type ReactNode,
  type ChangeEvent,
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
import MUITextArea, { type MUITextAreaProps } from '@nish1896/mui-components/mui/text-area';
import type { CustomComponentIds } from '@nish1896/mui-components/types';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type TextFieldProps,
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
  event: ChangeEvent<HTMLTextAreaElement>;
};

export type RHFTextAreaProps<T extends FieldValues> = {
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
   * Overrides the default text area change handling.
   * Receives the next input string and the original change event.
   * Call `rhfOnChange` with the string that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the input string.
   * @param newValue - Next input string.
   * @param event - Original textarea change event.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<OnValueChangeProps, string>) => void;
  /**
   * Called after the default text area handler stores the next string in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next input string.
   * @param event - Original textarea change event.
   */
  onValueChange?: ({ newValue, event }: OnValueChangeProps) => void;
  /**
   * Maximum number of characters the field accepts. Typing and pasting stop at
   * this limit, via the native `maxLength` attribute.
   */
  maxChars?: MUITextAreaProps['maxChars'];
  /**
   * When `true`, shows a `current/max` character counter inside the field.
   * Has no effect unless `maxChars` is set.
   */
  showCharLimit?: MUITextAreaProps['showCharLimit'];
  /**
   * Custom renderer for the character counter, replacing the default
   * `current/max` text. Providing it shows the counter even without `showCharLimit`.
   *
   * @param charCount - Current number of characters in the value.
   * @param maxChars - The `maxChars` limit.
   */
  renderCharLimit?: MUITextAreaProps['renderCharLimit'];
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
   * Custom renderer for the React Hook Form field error.
   * Receives the current field error and must return renderable content, such as `error.message` or a custom element.
   *
   * @param error - React Hook Form field error for this text area.
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
} & Omit<TextFieldProps, 'multiline'>;

const RHFTextAreaInner = forwardRef(function RHFTextArea<T extends FieldValues>(
  {
    fieldName,
    control,
    registerOptions,
    customOnChange,
    onValueChange,
    maxChars,
    showCharLimit,
    renderCharLimit,
    onBlur: muiOnBlur,
    disabled: muiDisabled,
    label,
    showLabelAboveFormField,
    formLabelProps,
    hideLabel,
    required,
    renderError,
    hideErrorMessage,
    helperText,
    formHelperTextProps,
    autoComplete,
    slotProps: muiSlotProps,
    customIds,
    ...otherTextAreaProps
  }: RHFTextAreaProps<T>,
  ref: Ref<HTMLTextAreaElement>
) {
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

        return (
          <MUITextArea
            {...otherTextAreaProps}
            fieldName={rhfFieldName}
            inputRef={mergeRefs(rhfRef, ref)}
            value={rhfValue}
            onValueChange={({ newValue, event }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, event });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, event });
            }}
            maxChars={maxChars}
            showCharLimit={showCharLimit}
            renderCharLimit={renderCharLimit}
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
            required={isFieldRequired}
            errorMessage={fieldStateError?.message?.toString()}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            hideErrorMessage={hideErrorMessage}
            helperText={helperText}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
            autoComplete={autoComplete}
            slotProps={muiSlotProps}
            customIds={customIds}
          />
        );
      }}
    />
  );
});

/**
 * Controlled Material UI multiline `TextField`, wired to a React Hook Form
 * field via `control`.
 *
 * Auto-grows with its content unless `rows` is set, and can limit and count
 * characters with `maxChars`, `showCharLimit` and `renderCharLimit`.
 *
 * Docs: [RHFTextArea](https://rhf-mui-components.vercel.app/components/mui/RHFTextArea)
 *
 * API: [RHFTextAreaProps](https://rhf-mui-components.vercel.app/components/mui/RHFTextArea#api)
 */
const RHFTextArea = RHFTextAreaInner as <T extends FieldValues>(
  props: RHFTextAreaProps<T> & { ref?: Ref<HTMLTextAreaElement> }
) => JSX.Element;

export default RHFTextArea;
