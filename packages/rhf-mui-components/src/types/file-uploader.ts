export type FileInputProps = {
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
   * Allows selecting multiple files.
   *
   * @default false
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
   * Disables the file input and prevents file selection.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Maximum number of files that can be uploaded.
   *
   * When the limit is exceeded, additional files are rejected and
   * reported through the error callback.
   */
  maxFiles?: number;
};

export enum FileUploadError {
  sizeExceeded = 'FILE_SIZE_EXCEEDED',
  invalidExtension = 'FILE_TYPE_NOT_ALLOWED',
  limitExceeded = 'FILE_LIMIT_EXCEEDED',
}
