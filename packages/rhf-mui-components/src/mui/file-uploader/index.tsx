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
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  showFileSize?: boolean;
  hideFileList?: boolean;
  renderUploadButton?: (fileInput: ReactNode) => ReactNode;
  renderFileItem?: (file: File, index: number) => ReactNode;
  onValueChange?: (
    acceptedFiles: File | File[] | null,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  onUploadError?: (
    errors: FileUploadError[],
    rejectedFiles: File[],
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  helperText?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
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
  const isError = !!errorMessage;
  const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

  return (
    <FormControl fullWidth={fullWidth} error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={{
          id: labelId,
          htmlFor: fieldId,
          ...formLabelProps
        }}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        disabled={muiDisabled}
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
              disabled={rhfDisabled}
              aria-labelledby={isLabelAboveFormField ? labelId : undefined}
              aria-describedby={isError ? errorId : helperTextId}
              aria-invalid={isError}
            />
          );

          return (
            <Fragment>
              {renderUploadButton
                ? (
                  renderUploadButton(InputComponent)
                )
                : (
                  <UploadButton
                    label={fieldLabel}
                    fieldName={`btn_${fieldId}`}
                    disabled={rhfDisabled}
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
                  id: isError ? errorId : helperTextId,
                  ...formHelperTextProps
                }}
              />
              {!hideFileList && rhfValue && (
                <Box>
                  {(Array.isArray(rhfValue) ? rhfValue : [rhfValue]).map(
                    (file: File, index) => (
                      <Fragment key={file.name + file.lastModified}>
                        {renderFileItem
                          ? (
                            renderFileItem(file, index)
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
          );
        }}
      />
    </FormControl>
  );
};

export default RHFFileUploader;
