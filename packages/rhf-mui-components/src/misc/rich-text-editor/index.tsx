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
import { type CKEditor } from '@ckeditor/ckeditor5-react';
import type { EventInfo } from '@ckeditor/ckeditor5-utils';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { type ClassicEditor } from 'ckeditor5';
import MUIRichTextEditor, { DefaultEditorConfig } from '@nish1896/mui-components/misc/rich-text-editor';
import type { CustomComponentIds } from '@nish1896/mui-components/types';
import {
  type FormLabelProps,
  type FormHelperTextProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  mergeRefs,
  mergeSx,
  resolveLabelAboveControl,
  resolveRequired
} from '@/utils';

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
    onValueChange,
    customOnChange,
    onFocus,
    onBlur,
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
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);

  const isLabelAboveControl = resolveLabelAboveControl(
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
          <MUIRichTextEditor
            fieldName={fieldName}
            required={isFieldRequired}
            ref={mergeRefs(rhfRef, ref)}
            editorConfig={editorConfig ?? DefaultEditorConfig}
            onReady={onReady}
            value={rhfValue}
            onValueChange={({ newValue, event, editor }) => {
              if (skipNextEditorChangeRef.current) {
                skipNextEditorChangeRef.current = false;
                return;
              }
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
                const wrappedRhfOnChange = (nextValue: string) => {
                  rhfChangeCalled = true;
                  committedValue = nextValue;
                  rhfOnChange(nextValue);
                };
                customOnChange({
                  rhfOnChange: wrappedRhfOnChange,
                  newValue,
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
              rhfOnChange(newValue);
              onValueChange?.({ newValue, event, editor });
            }}
            onFocus={onFocus}
            onBlur={(event, editor) => {
              rhfOnBlur();
              onBlur?.(event, editor);
            }}
            disabled={isDisabled}
            label={label}
            showLabelAboveFormField={isLabelAboveControl}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            onError={onError}
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
            customIds={customIds}
          />
        );
      }}
    />
  );
});

/**
 * Controlled CKEditor 5 rich text editor, wired to a React Hook Form field
 * via `control`.
 *
 * Docs: [RHFRichTextEditor](https://rhf-mui-components.vercel.app/v4/components/misc/RHFRichTextEditor)
 *
 * API: [RHFRichTextEditorProps](https://rhf-mui-components.vercel.app/v4/components/misc/RHFRichTextEditor#api)
 */
const RHFRichTextEditor = RHFRichTextEditorInner as <T extends FieldValues>(
  props: RHFRichTextEditorProps<T> & { ref?: Ref<CKEditor<ClassicEditor>> }
) => JSX.Element;

export { DefaultEditorConfig };
export default RHFRichTextEditor;
