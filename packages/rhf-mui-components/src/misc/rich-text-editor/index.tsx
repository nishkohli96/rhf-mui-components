'use client';

import { useContext, type ReactNode } from 'react';
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
  onValueChange?: (newValue: string, event: EventInfo, editor: ClassicEditor) => void;
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

const RHFRichTextEditor = <T extends FieldValues>({
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
}: RHFRichTextEditorProps<T>) => {
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
      disabled={muiDisabled}
      render={({
        field: {
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          disabled: rhfDisabled,
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
                const content = editor.getData();
                rhfOnChange(content);
                onValueChange?.(content, event, editor);
              }}
              ref={rhfRef}
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
              disabled={rhfDisabled}
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
};

export { DefaultEditorConfig };
export default RHFRichTextEditor;
