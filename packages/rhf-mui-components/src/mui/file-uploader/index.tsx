'use client';

import {
  useContext,
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
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { type BoxProps } from '@mui/material/Box';
import MUIFileUploader from '@nish1896/mui-components/mui/file-uploader';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
import {
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
  useFieldIds
} from '@/utils';

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

/**
 * RHF field value for the file uploader: `File[] | null` when `multiple`
 * is `true`, else `File | null`. Tuple check avoids distributive
 * `boolean` breaking the conditional.
 */
export type FileUploaderValue<Multiple extends boolean>
  = [Multiple] extends [true]
    ? File[] | null
    : File | null;

type RHFFileUploaderOnValueChangeProps<Multiple extends boolean = false> = {
  /** New form value after a successful upload, removal, or clear action. */
  newValue: FileUploaderValue<Multiple>;
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

export type RHFFileUploaderProps<
  T extends FieldValues,
  Multiple extends boolean = false
> = {
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
  multiple?: Multiple;
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
   * Call `rhfOnChange` with the value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the uploaded file value.
   * @param newValue - Accepted file(s) or `null` when cleared: `File[] | null` when `multiple`
   * is true, else `File | null`.
   * @param event - Input or drop event that changed the file value.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<
    RHFFileUploaderOnValueChangeProps<Multiple>,
    FileUploaderValue<Multiple>
  >) => void;
  /**
   * Called after the default file uploader handler stores the accepted file value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Accepted file(s) or `null` when cleared: `File[] | null` when `multiple`
   * is true, else `File | null`.
   * @param event - Input or drop event that changed the file value.
   */
  onValueChange?: ({
    newValue,
    event
  }: RHFFileUploaderOnValueChangeProps<Multiple>) => void;
  /**
   * Callback fired when uploaded files fail type, size, or count validation.
   */
  onUploadError?: (errors: FileUploadErrorDetails[]) => void;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * Renders the label above the component.
   * @default true
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
   * Custom renderer for the React Hook Form field error.
   * Receives the current field error and must return renderable content, such as `error.message` or a custom element.
   *
   * @param error - React Hook Form field error for this field.
   */
  renderError?: (error: FieldError) => ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
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
  T extends FieldValues,
  Multiple extends boolean = false
>(
  {
    fieldName,
    control,
    registerOptions,
    accept,
    multiple,
    maxFiles,
    maxSize,
    existingFiles,
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
    renderError,
    hideErrorMessage,
    helperText,
    formHelperTextProps,
    fullWidth,
    disableDragAndDrop,
    dropZoneProps,
    customIds
  }: RHFFileUploaderProps<T, Multiple>,
  ref: Ref<HTMLInputElement>
) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);
  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const {
    sx: formLabelSx,
    ...otherFormLabelProps
  } = formLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};

  const serverFileCount = existingFiles?.length ?? 0;
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

        return (
          <MUIFileUploader
            fieldName={rhfFieldName}
            inputRef={mergeRefs(rhfRef, ref)}
            value={rhfValue}
            onValueChange={({ newValue, event }) => {
              /**
               * MUIFileUploader clears a multi-file field to `[]`; RHF state
               * here has always cleared to `null` for both single and multi.
               * Normalize back at this boundary to keep that contract stable.
               */
              const normalizedValue = (
                multiple && Array.isArray(newValue) && newValue.length === 0
                  ? null
                  : newValue
              ) as FileUploaderValue<Multiple>;
              if (customOnChange) {
                customOnChange({
                  rhfOnChange,
                  newValue: normalizedValue,
                  event
                });
                return;
              }
              rhfOnChange(normalizedValue);
              onValueChange?.({ newValue: normalizedValue, event });
            }}
            accept={accept}
            multiple={multiple}
            maxFiles={maxFiles}
            maxSize={maxSize}
            existingFiles={existingFiles}
            renderExistingFileItem={renderExistingFileItem}
            existingFileListProps={existingFileListProps}
            uploadedFileListProps={uploadedFileListProps}
            renderUploadButton={renderUploadButton}
            renderFileItem={renderFileItem}
            disabled={isDisabled}
            onUploadError={onUploadError}
            onBlur={rhfOnBlur}
            label={label}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            required={isFieldRequired}
            errorMessage={fieldStateError?.message?.toString()}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            hideErrorMessage={hideErrorMessage}
            helperText={helperText}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
            fullWidth={fullWidth}
            disableDragAndDrop={disableDragAndDrop}
            dropZoneProps={dropZoneProps}
            customIds={{
              field: fieldId,
              label: labelId,
              helperText: helperTextId,
              error: errorId
            }}
          />
        );
      }}
    />
  );
});

const RHFFileUploader = RHFFileUploaderInner as <
  T extends FieldValues,
  Multiple extends boolean = false
>(
  props: RHFFileUploaderProps<T, Multiple> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFFileUploader;
