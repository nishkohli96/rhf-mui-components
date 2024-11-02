import { useContext, ReactNode } from 'react';
import { UseFormSetValue, FieldValues, Path, PathValue } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { EventInfo } from '@ckeditor/ckeditor5-utils';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { ClassicEditor } from 'ckeditor5';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
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
}

export type RHFRichTextEditorProps<T extends FieldValues> = {
  fieldName: Path<T>;
  setValue: UseFormSetValue<T>;
  id?: string;
  editorConfig?: EditorConfig;
  onReady?: (editor: ClassicEditor) => void;
  onFocus?: (event: EventInfo<string, unknown>, editor: ClassicEditor) => void;
  value?: string;
  onValueChange?: (event: EventInfo, newValue: string, editor: ClassicEditor) => void;
  onBlur?: (event: EventInfo<string, unknown>, editor: ClassicEditor) => void;
  disabled?: boolean;
  label?: ReactNode;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  onError?: (error: Error, details: ErrorDetails) => void;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
};

const RHFRichTextEditor = <T extends FieldValues>({
  fieldName,
  setValue,
  id,
  editorConfig,
  onReady,
  onFocus,
  value,
  onValueChange,
  onBlur,
  disabled,
  label,
  formLabelProps,
  helperText,
  onError,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
}: RHFRichTextEditorProps<T>) => {
  const { defaultFormLabelSx, defaultFormHelperTextSx } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  function handleChange(event: EventInfo, editor: ClassicEditor) {
    const content = editor.getData();
    setValue(fieldName, content as PathValue<T, Path<T>>);
    if(onValueChange) {
      onValueChange(event, content, editor);
    }
  }

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={Boolean(fieldLabel)}
        error={isError}
        formLabelProps={formLabelProps}
        defaultFormLabelSx={defaultFormLabelSx}
      />
      <CKEditor
        id={id}
        editor={ClassicEditor}
        config={editorConfig ?? DefaultEditorConfig}
        data={value}
        onChange={handleChange}
        onReady={onReady}
        onBlur={onBlur}
        onFocus={onFocus}
        onError={onError}
        disabled={disabled}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        defaultFormHelperTextSx={defaultFormHelperTextSx}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
}

export { DefaultEditorConfig };
export default RHFRichTextEditor;
