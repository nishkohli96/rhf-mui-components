'use client';

import {
  useContext,
  useRef,
  forwardRef,
  type ReactNode,
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

export type RHFRichTextEditorProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  id?: string;
  editorConfig?: EditorConfig;
  onReady?: (editor: ClassicEditor) => void;
  onFocus?: (event: EventInfo<string, unknown>, editor: ClassicEditor) => void;
  onBlur?: (event: EventInfo<string, unknown>, editor: ClassicEditor) => void;
  onValueChange?: (
    newValue: string,
    event: EventInfo,
    editor: ClassicEditor
  ) => void;
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
  customOnChange?: (
    rhfOnChange: (newValue: string) => void,
    newValue: string,
    event: EventInfo,
    editor: ClassicEditor
  ) => void;
  disabled?: boolean;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  onError?: (error: Error, details: ErrorDetails) => void;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
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
    hideLabel,
    formLabelProps,
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
                isVisible={isLabelAboveControl}
                required={required}
                error={isError}
                formLabelProps={{
                  id: labelId,
                  htmlFor: fieldId,
                  ...formLabelProps
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
                  customOnChange(wrappedRhfOnChange, content, event, editor);
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
                onValueChange?.(content, event, editor);
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
              disabled={muiDisabled}
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

const RHFRichTextEditor = RHFRichTextEditorInner as <T extends FieldValues>(
  props: RHFRichTextEditorProps<T> & { ref?: Ref<CKEditor<ClassicEditor>> }
) => JSX.Element;

export { DefaultEditorConfig };
export default RHFRichTextEditor;
