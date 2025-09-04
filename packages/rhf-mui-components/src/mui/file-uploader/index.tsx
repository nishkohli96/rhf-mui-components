import {
  useContext,
  useState,
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
  validateFileList
} from '@/utils';
import { FileItem, HiddenInput, UploadButton } from './components';

export type { FileUploadError };

export type RHFFileUploaderProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  uploadedFiles?: File[];
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
  enableDragAndDrop?: boolean;
} & FileInputProps;

const RHFFileUploader = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  uploadedFiles = [],
  accept,
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
  fullWidth = false,
  enableDragAndDrop = true,
}: RHFFileUploaderProps<T>) => {
  const [isDragging, setIsDragging] = useState(false);
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const DropZoneWrapper = enableDragAndDrop ? Box : Fragment;

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

          const processFiles = (
            files: FileList | File[] | null,
            event: ChangeEvent<HTMLInputElement>
          ) => {
            if (!files || files.length === 0) {
              onChange(null);
              onValueChange?.(null, event);
              return;
            }
            const allUploadedFiles = [...uploadedFiles, ...Array.from(files)];
            const { acceptedFiles, rejectedFiles, errors } = validateFileList(
              allUploadedFiles,
              accept,
              maxSize,
              maxFiles
            );
            if (errors?.length && rejectedFiles?.length) {
              onUploadError?.(errors, rejectedFiles);
            }
            const selectedFiles = multiple
              ? acceptedFiles.length > 0
                ? acceptedFiles
                : null
              : acceptedFiles[0] ?? null;
            onChange(selectedFiles);

            /**
             * For onValueChange, I will be sending the newly uploaded files,
             * which are valid, as per the validation rules defined by the developer.
             */
            if(uploadedFiles.length > 0) {
              onValueChange?.(acceptedFiles.slice(uploadedFiles.length - 1), event);
            } else {
              onValueChange?.(acceptedFiles, event);
            }
          };

          const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
            processFiles(event.target.files, event);
          };
          // @ts-ignore
          const handleDrop = (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDragging(false);
            if (disabled) {
              return;
            }
            processFiles(event.dataTransfer.files, event);
          };

          // @ts-ignore
          const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            if (!disabled) {
              setIsDragging(true);
            }
          };

          const handleDragLeave = () => {
            setIsDragging(false);
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
              <DropZoneWrapper
                onDragOver={enableDragAndDrop ? handleDragOver : undefined}
                onDragLeave={enableDragAndDrop ? handleDragLeave : undefined}
                onDrop={enableDragAndDrop ? handleDrop : undefined}
                sx={
                  enableDragAndDrop
                    ? {
                      border: '2px dashed',
                      borderColor: isDragging ? 'primary.main' : 'grey.400',
                      borderRadius: 2,
                      p: 2,
                      textAlign: 'center',
                      transition: 'border-color 0.2s ease-in-out',
                      mb: 2,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }
                    : undefined
                }
              >
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
              </DropZoneWrapper>
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
