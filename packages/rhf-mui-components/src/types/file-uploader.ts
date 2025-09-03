export type FileInputProps = {
  accept?: string;
  multiple?: boolean;
  /* in bytes */
  maxSize?: number;
  disabled?: boolean;
  maxFiles?: number;
};

export enum FileUploadError {
  sizeExceeded = 'FILE_SIZE_EXCEEDED',
  invalidExtension = 'FILE_TYPE_NOT_ALLOWED',
  limitExceeded = 'FILE_LIMIT_EXCEEDED',
}
