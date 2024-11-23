import { ReactNode } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { EventInfo } from '@ckeditor/ckeditor5-utils';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { ClassicEditor } from 'ckeditor5';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel } from '@/utils';
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
  id?: string;
  editorConfig?: EditorConfig;
  onReady?: (editor: ClassicEditor) => void;
  onFocus?: (event: EventInfo<string, unknown>, editor: ClassicEditor) => void;
  onBlur?: (event: EventInfo<string, unknown>, editor: ClassicEditor) => void;
  onValueChange?: (newValue: string, event: EventInfo, editor: ClassicEditor) => void;
  disabled?: boolean;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  onError?: (error: Error, details: ErrorDetails) => void;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
};

const RHFRichTextEditor = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  id,
  editorConfig,
  onReady,
  onFocus,
  onBlur,
  onValueChange,
  disabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  onError,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
}: RHFRichTextEditorProps<T>) => {
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, onBlur: fieldOnBlur, value } }) => (
          <CKEditor
            id={id ?? fieldName}
            editor={ClassicEditor}
            config={editorConfig ?? DefaultEditorConfig}
            data={value}
            onChange={(event, editor) => {
              const content = editor.getData();
              onChange(content);
              if(onValueChange) {
                onValueChange(content, event, editor);
              }
            }}
            onReady={onReady}
            onBlur={(event, editor) => {
              fieldOnBlur();
              onBlur?.(event, editor);
            }}
            onFocus={onFocus}
            onError={onError}
            disabled={disabled}
          />
        )}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export { DefaultEditorConfig };
export default RHFRichTextEditor;
