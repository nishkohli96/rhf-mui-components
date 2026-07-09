'use client';

import {
  useContext,
  useRef,
  forwardRef,
  type ReactNode,
  type JSX,
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import type { EventInfo } from '@ckeditor/ckeditor5-utils';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { ClassicEditor } from 'ckeditor5';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  type FormLabelProps,
  type FormHelperTextProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
import {
  fieldNameToLabel,
  mergeRefs,
  resolveLabelAboveControl,
  useFieldIds
} from '@/utils';
import { DefaultEditorConfig } from './config';
import 'ckeditor5/ckeditor5.css';

/**
 * CK Editor Props ref -
 * https://ckeditor.com/docs/ckeditor5/latest/getting-started/legacy/legacy-integrations/react.html#context-feature-properties
 */

type ErrorDetails = {
  phase: 'initialization' | 'runtime';
  willContextRestart?: boolean;
};

type RHFRichTextEditorOnValueChangeProps = {
  newValue: string;
  event: EventInfo;
  editor: ClassicEditor;
};

type RHFRichTextEditorCustomOnChangeProps
  = RHFRichTextEditorOnValueChangeProps & {
    rhfOnChange: (newValue: string) => void;
  };

export type RHFRichTextEditorProps<T extends FieldValues> = {
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
   * CKEditor configuration passed to `ClassicEditor`.
   *
   * Defaults to this package's `DefaultEditorConfig`.
   */
  editorConfig?: EditorConfig;
  /**
   * Callback fired when the CKEditor instance is ready.
   */
  onReady?: (editor: ClassicEditor) => void;
  /**
   * Callback fired when the CKEditor instance receives focus.
   */
  onFocus?: (event: EventInfo<string, unknown>, editor: ClassicEditor) => void;
  /**
   * Callback fired when the CKEditor instance loses focus.
   *
   * The wrapper also marks the React Hook Form field as touched.
   */
  onBlur?: (event: EventInfo<string, unknown>, editor: ClassicEditor) => void;
  /**
   * Overrides the default rich text editor change handling.
   * Receives the next editor HTML string, CKEditor event info, and editor instance.
   * Call `rhfOnChange` with the HTML string that should be stored; otherwise the previous form value is kept.
   * After the handler runs, the editor content is synced back to the committed form value.
   *
   * @param rhfOnChange - React Hook Form field change handler for the editor HTML string.
   * @param newValue - Current editor HTML string.
   * @param event - CKEditor change event info.
   * @param editor - CKEditor instance that emitted the change.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event,
    editor
  }: RHFRichTextEditorCustomOnChangeProps) => void;
  /**
   * Called after the default rich text editor handler stores the current HTML string in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Current editor HTML string.
   * @param event - CKEditor change event info.
   * @param editor - CKEditor instance that emitted the change.
   */
  onValueChange?: ({
    newValue,
    event,
    editor
  }: RHFRichTextEditorOnValueChangeProps) => void;
  /**
   * When true, disables the field and associated controls.
   */
  disabled?: boolean;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * Renders the label above the component.
   * @default true
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
   * Callback fired when CKEditor reports an initialization or runtime error.
   */
  onError?: (error: Error, details: ErrorDetails) => void;
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
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
};

const RHFRichTextEditorInner = forwardRef(function RHFRichTextEditorInner<
  T extends FieldValues
>(
  {
    fieldName,
    control,
    registerOptions,
    required,
    editorConfig,
    onReady,
    onFocus,
    onBlur,
    onValueChange,
    customOnChange,
    disabled: muiDisabled,
    label,
    showLabelAboveFormField,
    formLabelProps,
    hideLabel,
    onError,
    errorMessage,
    renderError,
    hideErrorMessage,
    helperText,
    formHelperTextProps,
    customIds
  }: RHFRichTextEditorProps<T>,
  ref: Ref<CKEditor<ClassicEditor>>
) {
  const skipNextEditorChangeRef = useRef(false);
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );

  const defaultFieldLabel = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? defaultFieldLabel;
  const accessibleFieldLabel = typeof fieldLabel === 'string'
    ? fieldLabel
    : defaultFieldLabel;
  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage = fieldStateError
          ? (renderError?.(fieldStateError) ?? errorMessage ?? fieldStateError.message?.toString())
          : undefined;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        return (
          <FormControl error={isError} disabled={isDisabled}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveControl}
                required={required}
                error={isError}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  htmlFor: fieldId
                }}
              />
            )}
            <CKEditor
              id={fieldId}
              editor={ClassicEditor}
              config={editorConfig ?? DefaultEditorConfig}
              data={rhfValue ?? ''}
              onChange={(event, editor) => {
                if (skipNextEditorChangeRef.current) {
                  skipNextEditorChangeRef.current = false;
                  return;
                }
                const content = editor.getData();
                /**
                 * Directly calling the early return in customChange won't work in
                 * this scenario because the editor is not yet updated with the new value.
                 * So we need to wrap the rhfOnChange function and call it after the customOnChange
                 * function is called.
                 *
                 * This is a workaround to ensure that the editor is updated with the new value.
                 */
                if (customOnChange) {
                  let rhfChangeCalled = false;
                  let committedValue = '';
                  const wrappedRhfOnChange = (newValue: string) => {
                    rhfChangeCalled = true;
                    committedValue = newValue;
                    rhfOnChange(newValue);
                  };
                  customOnChange({
                    rhfOnChange: wrappedRhfOnChange,
                    newValue: content,
                    event,
                    editor
                  });
                  const target = rhfChangeCalled
                    ? committedValue
                    : String(rhfValue ?? '');
                  if (editor.getData() !== target) {
                    skipNextEditorChangeRef.current = true;
                    editor.setData(target);
                  }
                  return;
                }
                rhfOnChange(content);
                onValueChange?.({ newValue: content, event, editor });
              }}
              ref={mergeRefs(rhfRef, ref)}
              onReady={onReady}
              onBlur={(event, editor) => {
                rhfOnBlur();
                onBlur?.(event, editor);
              }}
              aria-labelledby={
                !hideLabel && isLabelAboveControl ? labelId : undefined
              }
              aria-label={hideLabel ? accessibleFieldLabel : undefined}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              aria-required={required}
              onFocus={onFocus}
              onError={onError}
              disabled={isDisabled}
            />
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              showHelperTextElement={showHelperTextElement}
              formHelperTextProps={{
                ...formHelperTextProps,
                id: isError ? errorId : helperTextId
              }}
            />
          </FormControl>
        );
      }}
    />
  );
});

const RHFRichTextEditor = RHFRichTextEditorInner as <T extends FieldValues>(
  props: RHFRichTextEditorProps<T> & { ref?: Ref<CKEditor<ClassicEditor>> }
) => JSX.Element;

export { DefaultEditorConfig };
export default RHFRichTextEditor;
