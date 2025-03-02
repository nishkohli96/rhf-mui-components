import { FileUploadError } from '@/types';

type FileSizeOptions = {
  valueAsNumber?: boolean;
  precision?: number;
};

type ProcessFilesResult = {
  acceptedFiles: File[];
  rejectedFiles?: File[]; 
  errors?: FileUploadError[];
}

export function getFileSize(size: number, options?: FileSizeOptions): string {
  if (size < 0) {
    throw new Error('Invalid file size. It must be a positive number.');
  }
  if (size === 0) return '0 bytes';

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

export function validateFileList(
  fileList: FileList,
  maxSize?: number,
  accept?: string
): ProcessFilesResult {
  const files = Array.from(fileList);
  const acceptedFiles: File[] = [];
  const rejectedFiles: File[] = [];
  const errorsSet = new Set<FileUploadError>();

  /* Parse the accept string into an array of acceptable types/extensions */
  const acceptedTypes = (accept ?? '')
    .split(',')
    .map((type) => type.trim().toLowerCase());

  const isTypeAllowed = (file: File) => {
    if (!accept) return true;

    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    const fileType = file.type.toLowerCase();

    return acceptedTypes.some((acceptedType) => {
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
      fileErrors.push('FILE_SIZE_EXCEEDED');
    }

    if (!isTypeAllowed(file)) {
      fileErrors.push('FILE_TYPE_NOT_ALLOWED');
    }

    if (fileErrors.length > 0) {
      rejectedFiles.push(file);
      fileErrors.forEach(err => errorsSet.add(err));
    } else {
      acceptedFiles.push(file);
    }
  });

  return {
    acceptedFiles,
    rejectedFiles,
    errors: Array.from(errorsSet),
  };
}