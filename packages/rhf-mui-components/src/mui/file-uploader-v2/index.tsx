'use client';

import {
  useContext,
  useState,
  Fragment,
  forwardRef,
  type Ref,
  type ReactNode,
  type JSX,
  type ChangeEvent,
  type DragEvent
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
  FileUploadError,
  CustomComponentIds
} from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  useFieldIds,
  mergeRefs,
  validateFileList
} from '@/utils';
import { FileItem, HiddenInput, UploadButton } from './components';

export type { FileUploadError };

/**
 * Metadata for a file that has already been uploaded and is being
 * passed as initial value for the field in the file uploader component.
 */
export type ExistingFileInfo = {
  /** Displayed file name. */
  name: string;
  /** URL used as the href on the file name link. */
  url: string;
  /** Optional file size in bytes for display when `showFileSize` is true. */
  size?: number;
};

type RHFFileUploaderOnValueChangeProps = {
  newValue: File | File[] | null;
  event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>;
};

export type RHFFileUploader2Props<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  /**
   * Pre-existing server-side files. Rendered in the file list above new
   * uploads and their count is deducted from `maxFiles` when validating.
   */
  existingFiles?: ExistingFileInfo[];
  /**
   * Called when the user removes a pre-existing file.
   * The parent is responsible for updating the `existingFiles` array.
   */
  onExistingFileRemove?: (file: ExistingFileInfo, index: number) => void;
  /**
   * Custom renderer for each pre-existing file row.
   * Falls back to a default name-link + remove-button layout when omitted.
   */
  renderExistingFileItem?: (file: ExistingFileInfo, index: number) => ReactNode;
  showFileSize?: boolean;
  hideFileList?: boolean;
  renderUploadButton?: (fileInput: ReactNode) => ReactNode;
  renderFileItem?: (file: File, index: number) => ReactNode;
  onValueChange?: ({
    newValue,
    event
  }: RHFFileUploaderOnValueChangeProps) => void;
  onUploadError?: (errors: FileUploadError[], rejectedFiles: File[]) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * This prop is no longer needed.
   */
  errorMessage?: ReactNode;
  helperText?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  fullWidth?: boolean;
  enableDragAndDrop?: boolean;
  customIds?: CustomComponentIds;
} & FileInputProps;

const RHFFileUploaderInner = forwardRef(function RHFFileUploader<
  T extends FieldValues
>(
  {
    fieldName,
    control,
    registerOptions,
    existingFiles = [],
    onExistingFileRemove,
    renderExistingFileItem,
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
    fullWidth = false,
    enableDragAndDrop = true,
    customIds
  }: RHFFileUploader2Props<T>,
  ref: Ref<HTMLInputElement>
) {
  const [isDragging, setIsDragging] = useState(false);
  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const formattedFieldName = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? formattedFieldName;
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  const serverFileCount = existingFiles.length;

  // Default renderer for existing server files when renderExistingFileItem
  // is not provided. Renders a name link and an optional remove button.
  const defaultExistingFileRender = (
    file: ExistingFileInfo,
    index: number
  ): ReactNode => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mt: 1
      }}
    >
      <Box
        component="a"
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ flexGrow: 1, wordBreak: 'break-all' }}
      >
        {file.name}
        {showFileSize && file.size !== undefined && (
          <Box
            component="span"
            sx={{ ml: 0.5, color: 'text.secondary', fontSize: '0.75rem' }}
          >
            (
            {(file.size / 1024).toFixed(1)}
            {' '}
            KB)
          </Box>
        )}
      </Box>
      {!muiDisabled && onExistingFileRemove && (
        <Box
          component="button"
          type="button"
          onClick={() => onExistingFileRemove(file, index)}
          aria-label={`Remove ${file.name}`}
          sx={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            p: 0.5,
            lineHeight: 1,
            color: 'text.secondary',
            '&:hover': { color: 'error.main' }
          }}
        >
          ×
        </Box>
      )}
    </Box>
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

        const processFiles = (
          files: FileList | File[] | null,
          event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
        ) => {
          if (!files || files.length === 0) {
            rhfOnChange(null);
            onValueChange?.({ newValue: null, event });
            return;
          }

          // FIX: Accumulate files across re-uploads within the same session
          // for multiple mode. Previously every new pick replaced rhfValue,
          // so picking 2 files then 2 more left only the last 2 in the form.
          const previousFiles: File[] = multiple
            ? Array.isArray(rhfValue)
              ? rhfValue
              : (rhfValue as unknown) instanceof File
                ? [rhfValue]
                : []
            : [];

          const candidates = multiple
            ? [...previousFiles, ...Array.from(files)]
            : Array.from(files);

          // FIX: Deduct already-persisted server files from the maxFiles
          // budget so total (existing + new) never exceeds the intended limit.
          const effectiveMaxFiles
            = maxFiles !== undefined
              ? Math.max(0, maxFiles - serverFileCount)
              : undefined;

          const { acceptedFiles, rejectedFiles, errors } = validateFileList(
            candidates,
            accept,
            maxSize,
            effectiveMaxFiles
          );
          if (errors?.length && rejectedFiles?.length) {
            onUploadError?.(errors, rejectedFiles);
          }
          const newValue = multiple
            ? acceptedFiles.length > 0
              ? acceptedFiles
              : null
            : (acceptedFiles[0] ?? null);
          rhfOnChange(newValue);
          onValueChange?.({ newValue, event });
        };

        const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
          processFiles(event.target.files, event);
          // Reset so the same file(s) can be selected again in a subsequent pick
          event.target.value = '';
        };

        const handleDrop = (event: DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          setIsDragging(false);
          if (muiDisabled) {
            return;
          }
          processFiles(event.dataTransfer.files, event);
        };

        const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          if (!muiDisabled) {
            setIsDragging(true);
          }
        };

        const handleDragLeave = () => {
          setIsDragging(false);
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
            ref={mergeRefs(rhfRef, ref)}
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            onBlur={rhfOnBlur}
            disabled={muiDisabled}
            aria-labelledby={isLabelAboveFormField ? labelId : undefined}
            aria-describedby={
              showHelperTextElement
                ? isError
                  ? errorId
                  : helperTextId
                : undefined
            }
            aria-invalid={isError}
          />
        );

        const uploadAreaContent = renderUploadButton
          ? (
            renderUploadButton(InputComponent)
          )
          : (
            <UploadButton
              label={
                typeof fieldLabel === 'string'
                  ? fieldLabel
                  : `Upload ${formattedFieldName}`
              }
              fieldName={fieldName}
              disabled={muiDisabled}
            >
              {InputComponent}
            </UploadButton>
          );

        const dropZoneContent = enableDragAndDrop
          ? (
            <Box
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                border: '2px dashed',
                borderColor: isDragging ? 'primary.main' : 'grey.400',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                transition: 'border-color 0.2s ease-in-out',
                mb: 2,
                cursor: muiDisabled ? 'not-allowed' : 'pointer'
              }}
            >
              {uploadAreaContent}
            </Box>
          )
          : (
            uploadAreaContent
          );

        return (
          <FormControl fullWidth={fullWidth} error={isError}>
            {!hideLabel && (
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
            )}
            {dropZoneContent}
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
            {!hideFileList && (
              <Box>
                {/* Pre-existing server files rendered above new uploads */}
                {existingFiles?.map((file, index) => (
                  <Fragment key={`existing-${file.name}-${index}`}>
                    {renderExistingFileItem
                      ? renderExistingFileItem(file, index)
                      : defaultExistingFileRender(file, index)}
                  </Fragment>
                ))}
                {/* New uploads from the current session */}
                {rhfValue
                  && (Array.isArray(rhfValue) ? rhfValue : [rhfValue]).map(
                    (file: File, index: number) => (
                      <Fragment
                        key={`${file.name}-${file.lastModified}-${index}`}
                      >
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
          </FormControl>
        );
      }}
    />
  );
});

const RHFFileUploader2 = RHFFileUploaderInner as <T extends FieldValues>(
  props: RHFFileUploader2Props<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFFileUploader2;
