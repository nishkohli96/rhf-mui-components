type FileSizeOptions = {
  valueAsNumber?: boolean;
  precision?: number;
};

export function getFileSize(size: number, options?: FileSizeOptions): string {
  if (size < 0) return 'Invalid size';
  if (size === 0) return '0 bytes';

  const { valueAsNumber = false, precision = 1 } = options ?? {};
  const conversionFactor = 1024;

  const format = (value: number, unit: string): string =>
    valueAsNumber ? `${value} ${unit}` : `${value.toFixed(precision)} ${unit}`;

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
