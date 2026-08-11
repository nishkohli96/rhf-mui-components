import { FileUploadError } from '@/mui/file-uploader';

type FileSizeOptions = {
  valueAsNumber?: boolean;
  precision?: number;
};

type ProcessFilesResult = {
  acceptedFiles: File[];
  rejectedFiles?: File[];
  errors?: FileUploadError[];
};

/**
 * Formats a byte count into a human-readable file size string
 * (bytes/KB/MB/GB), picking the largest unit under 1024.
 *
 * @param size - File size in bytes. Must be a non-negative number.
 * @param options.valueAsNumber - When true, rounds the value to the nearest
 * integer instead of applying `precision`. Default `false`.
 * @param options.precision - Decimal places to show for KB/MB/GB values;
 * trailing zeros are stripped. Default `1`.
 * @throws {Error} If `size` is negative.
 */
export function getFileSize(size: number, options?: FileSizeOptions): string {
  if (size < 0) {
    throw new Error('Invalid file size. It must be a positive number.');
  }
  if (size === 0) {
    return '0 bytes';
  }

  const { valueAsNumber = false, precision = 1 } = options ?? {};
  const conversionFactor = 1024;

  /* Utility to remove .0 if no decimal part exists */
  const format = (value: number, unit: string): string => {
    const roundedValue = value.toFixed(precision);
    const formattedValue = roundedValue.replace(/(\.0+|\.0+0+)$/, '');
    return valueAsNumber ? `${Math.round(value)} ${unit}` : `${formattedValue} ${unit}`;
  };

  if (size < conversionFactor) {
    return `${size} bytes`;
  }

  const kb = size / conversionFactor;
  if (kb < conversionFactor) {
    return format(kb, 'KB');
  }

  const mb = kb / conversionFactor;
  if (mb < conversionFactor) {
    return format(mb, 'MB');
  }

  const gb = mb / conversionFactor;
  return format(gb, 'GB');
}

/**
 * Splits a `FileList` into accepted/rejected files by validating each file's
 * type against `accept`, size against `maxSize`, and total count against
 * `maxFiles` (files beyond the limit are rejected, not the earliest ones).
 *
 * @param fileList - Files from a file input's `change` event.
 * @param accept - Comma-separated list of allowed extensions (`.pdf`), MIME
 * types (`image/png`), or MIME wildcards (`image/*`). No filtering when omitted.
 * @param maxSize - Max allowed size in bytes per file. No limit when omitted.
 * @param maxFiles - Max allowed number of accepted files. No limit when omitted.
 * @returns `acceptedFiles`/`rejectedFiles` arrays and the set of `errors`
 * (`FileUploadError`) describing why files were rejected.
 */
export function validateFileList(
  fileList: FileList,
  accept?: string,
  maxSize?: number,
  maxFiles?: number
): ProcessFilesResult {
  const files = Array.from(fileList);
  const acceptedFiles: File[] = [];
  const rejectedFiles: File[] = [];
  const errorsSet = new Set<FileUploadError>();

  /* Parse the accept string into an array of acceptable types/extensions */
  const acceptedTypes = accept
    ? accept
      .split(',')
      .map(type => type.trim().toLowerCase())
    : [];

  const isTypeAllowed = (file: File) => {
    if (!accept) {
      return true;
    }

    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    const fileType = file.type.toLowerCase();

    return acceptedTypes.some(acceptedType => {
      if (acceptedType.startsWith('.')) {
        return fileExtension === acceptedType;
      } else if (acceptedType.endsWith('/*')) {
        const typePrefix = acceptedType.replace('/*', '');
        return fileType.startsWith(typePrefix);
      } else {
        return fileType === acceptedType;
      }
    });
  };

  files.forEach(file => {
    const fileErrors: FileUploadError[] = [];

    if (maxSize && file.size > maxSize) {
      fileErrors.push(FileUploadError.sizeExceeded);
    }

    if (!isTypeAllowed(file)) {
      fileErrors.push(FileUploadError.invalidExtension);
    }

    if (fileErrors.length > 0) {
      rejectedFiles.push(file);
      fileErrors.forEach(err => errorsSet.add(err));
    } else {
      acceptedFiles.push(file);
    }
  });

  if (maxFiles && acceptedFiles.length > maxFiles) {
    const excessFiles = acceptedFiles.slice(maxFiles);
    acceptedFiles.splice(maxFiles);
    rejectedFiles.push(...excessFiles);
    errorsSet.add(FileUploadError.limitExceeded);
  }

  return {
    acceptedFiles,
    rejectedFiles,
    errors: Array.from(errorsSet),
  };
}
