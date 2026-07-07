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
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormLabelProps,
  FormHelperTextProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { fieldNameToLabel, useFieldIds, resolveLabelAboveControl } from '@/utils';
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
   * Callback fired after editor content changes and the new HTML string is stored in the field.
   * @param newValue - Updated HTML content from the editor.
   * @param event - CKEditor change event.
   * @param editor - Active CKEditor instance.
   */
  onValueChange?: (newValue: string, event: EventInfo, editor: ClassicEditor) => void;
  /**
   * When true, disables the field and associated controls.
   */
  disabled?: boolean;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Callback fired when CKEditor reports an initialization or runtime error.
   */
  onError?: (error: Error, details: ErrorDetails) => void;
  /**
   * Validation error message displayed in the `FormHelperText` component.
   * When provided, it takes precedence over `helperText` unless
   * `hideErrorMessage` is set to `true`.
   */
  errorMessage?: ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
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
  formLabelProps,
  helperText,
  onError,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
}: RHFRichTextEditorProps<T>) => {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);
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
        }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const isError = Boolean(errorMessage);
        const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

        return (
          <FormControl error={isError} disabled={isDisabled}>
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
            <CKEditor
              id={id ?? fieldId}
              editor={ClassicEditor}
              config={editorConfig ?? DefaultEditorConfig}
              data={rhfValue}
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
              aria-labelledby={isLabelAboveControl ? labelId : undefined}
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
              errorMessage={errorMessage}
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
};

export { DefaultEditorConfig };
export default RHFRichTextEditor;
