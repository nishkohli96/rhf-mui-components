import { useContext, ReactNode } from 'react';
import { UseFormSetValue, FieldValues, Path, PathValue } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { EventInfo } from '@ckeditor/ckeditor5-utils';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { ClassicEditor } from 'ckeditor5';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import { RHFMuiConfigContext } from '../../../config/ConfigProvider';
import { fieldNameToLabel } from '../../../utils';
import { defaultEditorConfig } from './config';
import 'ckeditor5/ckeditor5.css';

export type RHFRichTextEditorProps<T extends FieldValues> = {
  fieldName: Path<T>;
  setValue: UseFormSetValue<T>;
  editorConfig?: EditorConfig;
  value?: string; 
  onValueChange?: (event: EventInfo, newValue: string, editor: ClassicEditor) => void;
  disabled?: boolean;
  label?: ReactNode;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
};

export function RHFRichTextEditor<T extends FieldValues>({
  fieldName,
  setValue,
  editorConfig,
  value,
  onValueChange,
  disabled,
  label,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
}: RHFRichTextEditorProps<T>) {
  const { defaultFormLabelSx, defaultFormHelperTextSx } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
	
	function handleChange(event: EventInfo, editor: ClassicEditor) {
    const content = editor.getData();
    setValue(fieldName, content as PathValue<T, Path<T>>);
		onValueChange && onValueChange(event, content, editor);
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
        editor={ClassicEditor}
        data={value}
        onChange={handleChange}
				config={editorConfig ?? defaultEditorConfig}
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
