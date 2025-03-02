import { FileInputError } from '@/types';

type FileSizeOptions = {
  valueAsNumber?: boolean;
  precision?: number;
};

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

export function processFileList(
  fileList: FileList,
  maxSize?: number
): { files: File[]; error?: FileInputError } {
  if (!maxSize) {
    return { files: Array.from(fileList) };
  }
  const files = Array.from(fileList);
  const oversizedFiles = files.filter(file => file.size > maxSize);
  if (oversizedFiles.length > 0) {
    return {
      files: files.filter((file) => file.size <= maxSize),
      error: 'FILE_SIZE_EXCEED',
    };
  }
  return { files };
}
