'use client';

import {
  useContext,
  Fragment,
  type ReactNode,
  type ChangeEvent
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  FileInputProps,
  FileUploadError
} from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  useFieldIds,
  validateFileList
} from '@/utils';
import { FileItem, HiddenInput, UploadButton } from './components';

export type { FileUploadError };

export type RHFFileUploaderProps<T extends FieldValues> = {
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
   * If true, displays each selected file size in the default file list.
   */
  showFileSize?: boolean;
  /**
   * If true, hides the selected file list.
   */
  hideFileList?: boolean;
  /**
   * Custom upload button renderer. Receives the hidden file input as children/content.
   */
  renderUploadButton?: (fileInput: ReactNode) => ReactNode;
  /**
   * Custom renderer for each selected file item.
   * @param file - File represented by the current row.
   * @param index - Index of the file in the selected file list.
   * @param removeFile - Removes the current file from the field value.
   */
  renderFileItem?: (
    file: File,
    index: number,
    removeFile: () => void
  ) => ReactNode;
  /**
   * Callback fired after accepted file input value is stored in the field.
   * @param acceptedFiles - Accepted file, accepted files, or `null` when no file is selected.
   * @param event - File input change event.
   */
  onValueChange?: (
    acceptedFiles: File | File[] | null,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  /**
   * Callback fired when uploaded files fail type, size, or count validation.
   */
  onUploadError?: (
    errors: FileUploadError[],
    rejectedFiles: File[],
  ) => void;
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
   * Validation error message displayed in the `FormHelperText` component.
   * When provided, it takes precedence over `helperText` unless
   * `hideErrorMessage` is set to `true`.
   */
  errorMessage?: ReactNode;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * When true, the component expands to fill its container width.
   */
  fullWidth?: boolean;
} & FileInputProps;

const RHFFileUploader = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  accept,
  multiple,
  maxFiles,
  maxSize,
  hideFileList = false,
  showFileSize = false,
  renderUploadButton,
  renderFileItem,
  onValueChange,
  disabled: muiDisabled,
  onUploadError,
  label,
  showLabelAboveFormField,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  fullWidth = false
}: RHFFileUploaderProps<T>) => {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
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
          name: rhfFieldName,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const isError = !!errorMessage;
        const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

        const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
          const fileList = event.target.files;
          /* Reset so same file can be selected again */
          event.target.value = '';
          if (!fileList || fileList.length === 0) {
            rhfOnChange(null);
            onValueChange?.(null, event);
            return;
          }

          const { acceptedFiles, rejectedFiles, errors } = validateFileList(
            fileList,
            accept,
            maxSize,
            maxFiles
          );

          if (
            errors
            && errors.length > 0
            && rejectedFiles
            && rejectedFiles.length > 0
          ) {
            onUploadError?.(errors, rejectedFiles);
          }

          const selectedFiles = multiple
            ? acceptedFiles.length > 0
              ? acceptedFiles
              : null
            : (acceptedFiles[0] ?? null);
          rhfOnChange(selectedFiles);
          onValueChange?.(selectedFiles, event);
        };

        const removeFile = (index: number) => {
          if (multiple && Array.isArray(rhfValue)) {
            const newFiles = rhfValue.filter(
              (_: File, i: number) => i !== index
            );
            rhfOnChange(newFiles.length > 0 ? newFiles : null);
          } else {
            rhfOnChange(null);
          }
        };

        const InputComponent = (
          <HiddenInput
            id={fieldId}
            name={rhfFieldName}
            type="file"
            ref={rhfRef}
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            onBlur={rhfOnBlur}
            disabled={isDisabled}
            aria-labelledby={isLabelAboveFormField ? labelId : undefined}
            aria-describedby={
              showHelperTextElement
                ? (isError ? errorId : helperTextId)
                : undefined
            }
            aria-invalid={isError}
          />
        );

        return (
          <FormControl
            fullWidth={fullWidth}
            error={isError}
            disabled={isDisabled}
          >
            <FormLabel
              label={fieldLabel}
              isVisible={isLabelAboveFormField}
              required={required}
              error={isError}
              disabled={isDisabled}
              formLabelProps={{
                ...formLabelProps,
                id: labelId,
                htmlFor: fieldId
              }}
            />
            <Fragment>
              {renderUploadButton
                ? (
                  renderUploadButton(InputComponent)
                )
                : (
                  <UploadButton
                    label={fieldLabel}
                    fieldName={`btn_${fieldId}`}
                    disabled={isDisabled}
                  >
                    {InputComponent}
                  </UploadButton>
                )}
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
              {!hideFileList && rhfValue && (
                <Box>
                  {(Array.isArray(rhfValue) ? rhfValue : [rhfValue]).map(
                    (file: File, index) => (
                      <Fragment key={`${file.name}-${file.lastModified}-${index}`}>
                        {renderFileItem
                          ? (
                            renderFileItem(
                              file,
                              index,
                              () => removeFile(index)
                            )
                          )
                          : (
                            <FileItem
                              index={index}
                              file={file}
                              showFileSize={showFileSize}
                              removeFile={removeFile}
                            />
                          )}
                      </Fragment>
                    )
                  )}
                </Box>
              )}
            </Fragment>
          </FormControl>
        );
      }}
    />
  );
};

export default RHFFileUploader;
