import { ReactNode } from 'react';
import { UseFormSetValue, FieldValues, Path, PathValue } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { EventInfo } from '@ckeditor/ckeditor5-utils';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { ClassicEditor } from 'ckeditor5';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig } from '../../../types';
import { fieldNameToLabel } from '../../../utils';
import { defaultEditorConfig } from './config';
import 'ckeditor5/ckeditor5.css';

export type RHFRichTextEditorProps<T extends FieldValues> = {
  fieldName: Path<T>;
  setValue: UseFormSetValue<T>;
  defaultValue?: string; 
  editorConfig?: EditorConfig;
  onValueChange?: (event: EventInfo, newValue: string) => void;
  disabled?: boolean;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  label?: ReactNode;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
};

function RichTextEditor<T extends FieldValues>({
  fieldName,
  setValue,
  defaultValue,
  editorConfig,
  onValueChange,
  disabled,
  errorMessage,
  hideErrorMessage,
  label,
  formLabelProps,
  helperText,
  formHelperTextProps,
  defaultFormLabelSx,
  defaultFormHelperTextSx,
}: RHFRichTextEditorProps<T> & RHFMuiConfig) {
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
	
	function handleChange(event: EventInfo, editor: ClassicEditor) {
    const content = editor.getData();
    setValue(fieldName, content as PathValue<T, Path<T>>);
		onValueChange && onValueChange(event, content);
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
        data={defaultValue}
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

export const RHFRichTextEditor = withConfigHOC(RichTextEditor);