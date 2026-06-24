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
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import type { EventInfo } from '@ckeditor/ckeditor5-utils';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { ClassicEditor } from 'ckeditor5';
import { FormControl, FormLabel, FormHelperText } from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type {
  FormLabelProps,
  FormHelperTextProps,
  CustomComponentIds
} from '@/types';
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
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  /**
   * HTML id applied to the CKEditor instance.
   *
   * Defaults to the generated field id.
   */
  id?: string;
  /**
   * CKEditor configuration passed to `ClassicEditor`.
   *
   * Defaults to this package's `DefaultEditorConfig`.
   */
  editorConfig?: EditorConfig;
  /**
   * Fired when the CKEditor instance is ready.
   */
  onReady?: (editor: ClassicEditor) => void;
  /**
   * Fired when the CKEditor instance receives focus.
   */
  onFocus?: (event: EventInfo<string, unknown>, editor: ClassicEditor) => void;
  /**
   * Fired when the CKEditor instance loses focus.
   *
   * The wrapper also marks the React Hook Form field as touched.
   */
  onBlur?: (event: EventInfo<string, unknown>, editor: ClassicEditor) => void;
  /**
   * Override the default `onChange` behavior of the rich text editor.
   * Call **rhfOnChange** with the value that should be stored in the form (omit it to keep the
   * previous value). After your handler runs, the editor document is synced to that committed
   * value so the visible content matches form state (e.g. max-length without extra typed chars).
   *
   * ⚠️ Important: `onValueChange` is not invoked when using `customOnChange`.
   *
   * @param rhfOnChange - React Hook Form field change handler
   * @param newValue - Current editor value
   * @param event - Change event from the underlying editor
   * @param editor - ClassicEditor instance
  */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event,
    editor
  }: RHFRichTextEditorCustomOnChangeProps) => void;
  /**
   * Fired after editor content changes and the new HTML string is stored in the field.
   *
   * Not invoked when `customOnChange` is set.
   */
  onValueChange?: ({
    newValue,
    event,
    editor
  }: RHFRichTextEditorOnValueChangeProps) => void;
  disabled?: boolean;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  hideLabel?: boolean;
  helperText?: ReactNode;
  /**
   * Fired when CKEditor reports an initialization or runtime error.
   */
  onError?: (error: Error, details: ErrorDetails) => void;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
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
    id,
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
    helperText,
    onError,
    errorMessage,
    hideErrorMessage,
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
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
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
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
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
              id={id ?? fieldId}
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
