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
  type DragEvent,
  type MouseEvent
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Box, { type BoxProps } from '@mui/material/Box';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/common';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type CustomComponentIds,
  type CustomOnChangeProps
} from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  useFieldIds,
  mergeRefs,
  validateFileList
} from '@/utils';
import { HiddenInput, UploadButton } from './components';

export enum FileUploadError {
  sizeExceeded = 'FILE_SIZE_EXCEEDED',
  invalidExtension = 'FILE_TYPE_NOT_ALLOWED',
  limitExceeded = 'FILE_LIMIT_EXCEEDED',
}

export type FileUploadErrorDetails = {
  /** File that failed upload validation. */
  file: File;
  /** Validation errors reported for the file. */
  errors: FileUploadError[];
};

/**
 * Metadata for a file that has already been uploaded and is being
 * passed as initial value for the field in the file uploader component.
 */
export type ExistingUploadedFile = {
  /** Displayed file name. */
  name: string;
  /** URL used as the href on the file name link. */
  url: string;
  /** Optional file size in bytes. */
  size?: number;
};

type RHFFileUploaderOnValueChangeProps = {
  /** New form value after a successful upload, removal, or clear action. */
  newValue: File | File[] | null;
  /** Event that triggered the value change. */
  event:
    | ChangeEvent<HTMLInputElement>
    | DragEvent<HTMLDivElement>
    | MouseEvent<HTMLButtonElement>;
};

/**
 * State passed to `dropZoneProps` when it is provided as a callback.
 */
type RHFFileUploaderDropZoneState = {
  /** Whether a file is currently being dragged over the drop zone. */
  isDragging: boolean;
  /** Whether the uploader is disabled. */
  disabled: boolean;
  /** Whether the uploader is currently displaying a validation error. */
  error: boolean;
};

type RHFFileUploaderDropZoneProps
  = | Omit<BoxProps, 'children'>
    | ((
      { isDragging, disabled, error }: RHFFileUploaderDropZoneState
    ) => Omit<BoxProps, 'children'>);

type RenderExistingFileItemProps = {
  file: ExistingUploadedFile;
  /** Zero-based index of the existing file. */
  index: number;
};

type RenderFileItemProps = {
  file: File;
  /** Zero-based index of the newly selected file. */
  index: number;
  /** Removes this newly selected file from the RHF field value. */
  removeFile: (event: MouseEvent<HTMLButtonElement>) => void;
};

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
   * Comma-separated list of accepted file types.
   *
   * Examples:
   * - `image/*`
   * - `.pdf,.doc,.docx`
   * - `image/png,image/jpeg`
   */
  accept?: string;
  /**
   * When true, allows selecting multiple files.
   */
  multiple?: boolean;
  /**
   * Maximum file size (in bytes) eligible for upload.
   * Files exceeding this size will be rejected and trigger an error callback.
   *
   * For example, to set a maximum file size of 5 MB:
   * `maxSize={5 * 1024 * 1024}`
   */
  maxSize?: number;
  /**
   * Maximum number of files that can be uploaded.
   *
   * When the limit is exceeded, additional files are rejected and
   * reported through the error callback.
   */
  maxFiles?: number;
  /**
   * Disables the file input and prevents file selection.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Props applied to the drag-and-drop wrapper `Box`.
   *
   * Pass an object for static props, or a callback to style/render from the current
   * drop-zone state. The returned `sx` is merged after the default drop-zone styles,
   * and drag/drop handlers are composed with the internal handlers.
   *
   * This prop is ignored when `disableDragAndDrop` is `true`.
   */
  dropZoneProps?: RHFFileUploaderDropZoneProps;
  /**
   * Disable drag-and-drop functionality and only allow file selection via the upload button.
   * @default false
   */
  disableDragAndDrop?: boolean;
  /**
   * Custom upload button renderer. Receives the hidden file input as children/content.
   */
  renderUploadButton?: (fileInput: ReactNode) => ReactNode;
  /**
   * Pre-existing server-side files.
   *
   * Use `renderExistingFileItem` to render these files in the file list.
   * Existing files are displayed separately from newly uploaded files, and
   * their count is deducted from `maxFiles` during validation.
   */
  existingFiles?: ExistingUploadedFile[];
  /**
   * Custom renderer for each file passed through `existingFiles`.
   *
   * Use this to render server-side files that were uploaded before the
   * current form session. The callback receives the file metadata and its
   * zero-based index.
   *
   * Existing files are not stored in the RHF field value and this component
   * does not remove them automatically. Handle deletion in your own renderer
   * if server-side files need to be removed.
   *
   * When omitted, existing files are not rendered.
   */
  renderExistingFileItem?: ({ file, index }: RenderExistingFileItemProps) => ReactNode;
  /**
   * Props applied to the wrapper Box that contains pre-existing server-side files.
   */
  existingFileListProps?: Omit<BoxProps, 'children'>;
  /**
   * Props applied to the wrapper Box that contains newly selected/uploaded files.
   */
  uploadedFileListProps?: Omit<BoxProps, 'children'>;
  /**
   * Custom renderer for each newly selected file stored in the RHF field value.
   *
   * The callback receives the `File`, its zero-based index, and a `removeFile`
   * helper. Call `removeFile(event)` from your remove/delete button to remove
   * that file from the RHF value. Removal also triggers `onValueChange` unless
   * `customOnChange` is provided.
   *
   * When omitted, newly selected files are not rendered.
   */
  renderFileItem?: ({
    file,
    index,
    removeFile
  }: RenderFileItemProps) => ReactNode;
  /**
   * Overrides the default file uploader change handling.
   * Receives the accepted file value and the input/drop event that produced it.
   * Call `rhfOnChange` with the `File`, `File[]`, or `null` value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the uploaded file value.
   * @param newValue - Accepted file, accepted file array, or `null` when cleared.
   * @param event - Input or drop event that changed the file value.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<
    RHFFileUploaderOnValueChangeProps,
    File | File[] | null
  >) => void;
  /**
   * Called after the default file uploader handler stores the accepted file value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Accepted file, accepted file array, or `null` when cleared.
   * @param event - Input or drop event that changed the file value.
   */
  onValueChange?: ({
    newValue,
    event
  }: RHFFileUploaderOnValueChangeProps) => void;
  /**
   * Callback fired when uploaded files fail type, size, or count validation.
   */
  onUploadError?: (errors: FileUploadErrorDetails[]) => void;
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
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
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
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
};

const RHFFileUploaderInner = forwardRef(function RHFFileUploader<
  T extends FieldValues
>(
  {
    fieldName,
    control,
    registerOptions,
    accept,
    multiple,
    maxFiles,
    maxSize,
    existingFiles = [],
    renderExistingFileItem,
    existingFileListProps,
    uploadedFileListProps,
    renderUploadButton,
    renderFileItem,
    customOnChange,
    onValueChange,
    disabled: muiDisabled,
    onUploadError,
    label,
    showLabelAboveFormField,
    formLabelProps,
    hideLabel,
    required,
    helperText,
    hideErrorMessage,
    formHelperTextProps,
    fullWidth = false,
    disableDragAndDrop = false,
    dropZoneProps,
    customIds
  }: RHFFileUploaderProps<T>,
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
  const {
    required: registerRequired,
    validate: registerValidate,
    ...controllerRulesBase
  } = registerOptions ?? {};
  const isRegisterRequired = typeof registerRequired === 'object'
    ? registerRequired.value
    : !!registerRequired;
  const isFieldRequired = required || isRegisterRequired;
  const requiredMessage
    = typeof registerRequired === 'string'
      ? registerRequired
      : typeof registerRequired === 'object'
        ? registerRequired.message
        : 'This field is required';

  const validateRequiredFiles = (value: File | File[] | null) => {
    if (!isFieldRequired || serverFileCount > 0) {
      return true;
    }
    if (Array.isArray(value)) {
      return value.length > 0 || requiredMessage;
    }
    return value instanceof File || requiredMessage;
  };

  const controllerRules: RegisterOptions<T, Path<T>> = {
    ...controllerRulesBase,
    validate:
      typeof registerValidate === 'function'
        ? async (value, formValues) => {
          const requiredValidation = validateRequiredFiles(
            value
          );
          if (requiredValidation !== true) {
            return requiredValidation;
          }
          return registerValidate(value, formValues);
        }
        : {
          ...registerValidate,
          requiredFiles: value => validateRequiredFiles(value)
        }
  };

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={controllerRules}
      render={({
        field: {
          name: rhfFieldName,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage
          = fieldStateError?.message?.toString();
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        const updateFieldValue = (
          newValue: File | File[] | null,
          event:
            | ChangeEvent<HTMLInputElement>
            | DragEvent<HTMLDivElement>
            | MouseEvent<HTMLButtonElement>
        ) => {
          if (customOnChange) {
            customOnChange({
              rhfOnChange,
              newValue,
              event
            });
            return;
          }
          rhfOnChange(newValue);
          onValueChange?.({ newValue, event });
        };

        const processFiles = (
          files: FileList | File[] | null,
          event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
        ) => {
          if (!files || files.length === 0) {
            updateFieldValue(null, event);
            return;
          }

          const incomingFiles = Array.from(files);
          const previousFiles: File[] = multiple
            ? Array.isArray(rhfValue)
              ? rhfValue
              : (rhfValue as unknown) instanceof File
                ? [rhfValue]
                : []
            : [];

          const remainingFileSlots
            = maxFiles !== undefined
              ? Math.max(0, maxFiles - serverFileCount - previousFiles.length)
              : undefined;

          const { acceptedFiles, rejectedFiles } = validateFileList(incomingFiles, {
            accept,
            maxSize
          });
          const fileErrors = [...rejectedFiles];
          let acceptedIncomingFiles = acceptedFiles;

          if (
            remainingFileSlots !== undefined
            && acceptedIncomingFiles.length > remainingFileSlots
          ) {
            const excessFiles = acceptedIncomingFiles.slice(remainingFileSlots);
            acceptedIncomingFiles
              = acceptedIncomingFiles.slice(0, remainingFileSlots);
            fileErrors.push(
              ...excessFiles.map(file => ({
                file,
                errors: [FileUploadError.limitExceeded]
              }))
            );
          }
          if (fileErrors.length > 0) {
            onUploadError?.(fileErrors);
          }

          const finalAcceptedFiles = multiple
            ? [...previousFiles, ...acceptedIncomingFiles]
            : acceptedIncomingFiles;
          const newValue = multiple
            ? finalAcceptedFiles.length > 0
              ? finalAcceptedFiles
              : null
            : (finalAcceptedFiles[0] ?? null);
          updateFieldValue(newValue, event);
        };

        const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
          processFiles(event.target.files, event);
          /**
           * Reset so the same file(s) can be selected again in
           * a subsequent pick
           */
          event.target.value = '';
        };

        const handleDrop = (event: DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          setIsDragging(false);
          if (isDisabled) {
            return;
          }
          if (event.dataTransfer.files.length === 0) {
            return;
          }
          processFiles(event.dataTransfer.files, event);
        };

        const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          if (!isDisabled) {
            setIsDragging(true);
          }
        };

        const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
          }
          setIsDragging(false);
        };

        const handleRemoveFile = (
          index: number,
          event: MouseEvent<HTMLButtonElement>
        ) => {
          let newValue: File | File[] | null;
          if (multiple && Array.isArray(rhfValue)) {
            const newFiles = rhfValue.filter(
              (_: File, i: number) => i !== index
            );
            newValue = newFiles.length > 0 ? newFiles : null;
          } else {
            newValue = null;
          }
          updateFieldValue(newValue, event);
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
            disabled={isDisabled}
            aria-labelledby={isLabelAboveFormField ? labelId : undefined}
            aria-describedby={
              showHelperTextElement
                ? isError
                  ? errorId
                  : helperTextId
                : undefined
            }
            aria-invalid={isError}
            aria-required={isFieldRequired}
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
              disabled={isDisabled}
            >
              {InputComponent}
            </UploadButton>
          );

        const resolvedDropZoneProps = typeof dropZoneProps === 'function'
          ? dropZoneProps({
            isDragging,
            disabled: !!isDisabled,
            error: isError
          })
          : (dropZoneProps ?? {});
        const {
          sx: dropZoneSx,
          onDragEnter: dropZoneOnDragEnter,
          onDragOver: dropZoneOnDragOver,
          onDragLeave: dropZoneOnDragLeave,
          onDrop: dropZoneOnDrop,
          ...restDropZoneProps
        } = resolvedDropZoneProps;

        const dropZoneContent = !disableDragAndDrop
          ? (
            <Box
              {...restDropZoneProps}
              onDragEnter={event => {
                handleDragOver(event);
                dropZoneOnDragEnter?.(event);
              }}
              onDragOver={event => {
                handleDragOver(event);
                dropZoneOnDragOver?.(event);
              }}
              onDragLeave={event => {
                handleDragLeave(event);
                dropZoneOnDragLeave?.(event);
              }}
              onDrop={event => {
                handleDrop(event);
                dropZoneOnDrop?.(event);
              }}
              sx={[
                {
                  border: '2px dashed',
                  borderColor: isDragging ? 'primary.main' : 'grey.400',
                  borderRadius: 2,
                  p: 2,
                  textAlign: 'center',
                  transition: 'border-color 0.2s ease-in-out',
                  mb: 2,
                  cursor: isDisabled ? 'not-allowed' : 'pointer'
                },
                ...(Array.isArray(dropZoneSx)
                  ? dropZoneSx
                  : dropZoneSx
                    ? [dropZoneSx]
                    : [])
              ]}
            >
              {uploadAreaContent}
            </Box>
          )
          : (
            uploadAreaContent
          );

        return (
          <FormControl
            fullWidth={fullWidth}
            error={isError}
            disabled={isDisabled}
          >
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
                required={isFieldRequired}
                error={isError}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  htmlFor: fieldId
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
                ...formHelperTextProps,
                id: isError ? errorId : helperTextId
              }}
            />
            {/* Pre-existing server files rendered above new uploads */}
            {existingFiles.length > 0 && renderExistingFileItem && (
              <Box {...existingFileListProps}>
                {existingFiles.map((file, index) => (
                  <Fragment key={`existing-${file.name}-${index}`}>
                    {renderExistingFileItem({ file, index })}
                  </Fragment>
                ))}
              </Box>
            )}
            {/* New uploads from the current session */}
            {rhfValue && renderFileItem && (
              <Box {...uploadedFileListProps}>
                {(Array.isArray(rhfValue) ? rhfValue : [rhfValue]).map(
                  (file: File, index: number) => (
                    <Fragment key={`${file.name}-${file.lastModified}-${index}`}>
                      {renderFileItem({
                        file,
                        index,
                        removeFile: event => handleRemoveFile(index, event)
                      })}
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

const RHFFileUploader = RHFFileUploaderInner as <T extends FieldValues>(
  props: RHFFileUploaderProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFFileUploader;
