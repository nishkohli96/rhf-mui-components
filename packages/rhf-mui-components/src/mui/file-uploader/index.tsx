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
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  FileInputProps,
  FileUploadError
} from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
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
  accept = '*',
  multiple,
  maxFiles,
  maxSize,
  hideFileList = false,
  showFileSize = false,
  renderUploadButton,
  renderFileItem,
  onValueChange,
  onUploadError,
  label,
  showLabelAboveFormField,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  disabled,
  fullWidth = false
}: RHFFileUploaderProps<T>) => {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  return (
    <FormControl fullWidth={fullWidth} error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field }) => {
          const { value, onChange, ...otherFieldParams } = field;

          const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
            const fileList = event.target.files;
            if (!fileList || fileList.length === 0) {
              onChange(null);
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
              : acceptedFiles[0] ?? null;
            onChange(selectedFiles);
            onValueChange?.(selectedFiles, event);
          };

          const removeFile = (index: number) => {
            if (multiple && Array.isArray(value)) {
              const newFiles = value.filter((_: File, i: number) => i !== index);
              onChange(newFiles.length > 0 ? newFiles : null);
            } else {
              onChange(null);
            }
          };

          return (
            <Fragment>
              {renderUploadButton
                ? (
                  renderUploadButton(
                    <HiddenInput
                      type="file"
                      accept={accept}
                      onChange={handleFileChange}
                      multiple={multiple}
                      disabled={disabled}
                      {...otherFieldParams}
                    />
                  )
                )
                : (
                  <UploadButton
                    label={fieldLabel}
                    fieldName={fieldName}
                    disabled={disabled}
                  >
                    <HiddenInput
                      type="file"
                      accept={accept}
                      onChange={handleFileChange}
                      multiple={multiple}
                      disabled={disabled}
                      {...otherFieldParams}
                    />
                  </UploadButton>
                )}
              <FormHelperText
                error={isError}
                errorMessage={errorMessage}
                hideErrorMessage={hideErrorMessage}
                helperText={helperText}
                formHelperTextProps={formHelperTextProps}
              />
              {!hideFileList && value && (
                <Box>
                  {(Array.isArray(value) ? value : [value]).map(
                    (file: File, index) => (
                      <Fragment key={index}>
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
