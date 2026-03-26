'use client';

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
  hideLabel?: boolean;
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
  disabled: muiDisabled,
  onUploadError,
  label,
  showLabelAboveFormField,
  hideLabel,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
<<<<<<< HEAD
  disabled,
  fullWidth = false,
  enableDragAndDrop = true,
}: RHFFileUploaderProps<T>) => {
  const [isDragging, setIsDragging] = useState(false);
=======
  fullWidth = false
}: RHFFileUploaderProps<T>) => {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
<<<<<<< HEAD
  const DropZoneWrapper = enableDragAndDrop ? Box : Fragment;

  return (
    <FormControl fullWidth={fullWidth} error={isError}>
      {hideLabel
        ? <></>
        : (
          <FormLabel
            label={fieldLabel}
            isVisible={isLabelAboveFormField}
            required={required}
            error={isError}
            formLabelProps={formLabelProps}
          />
        )}
=======
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
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
<<<<<<< HEAD
        render={({ field }) => {
          const { value, onChange, ...otherFieldParams } = field;

          const processFiles = (
            files: FileList | File[] | null,
            event: ChangeEvent<HTMLInputElement>
          ) => {
            if (!files || files.length === 0) {
              onChange(null);
=======
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
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
<<<<<<< HEAD
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
=======
              : (acceptedFiles[0] ?? null);
            rhfOnChange(selectedFiles);
            onValueChange?.(selectedFiles, event);
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
              aria-describedby={
                showHelperTextElement
                  ? (isError ? errorId : helperTextId)
                  : undefined
              }
              aria-invalid={isError}
            />
          );

          return (
            <Fragment>
<<<<<<< HEAD
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
=======
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
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
                      <Fragment key={`${file.name}-${file.lastModified}-${index}`}>
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
