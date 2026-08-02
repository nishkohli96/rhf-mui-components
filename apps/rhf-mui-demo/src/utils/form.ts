import { type RHFPhoneInputValue } from '@nish1896/rhf-mui-components/misc/phone-input';

export function getPhoneNoValue(value?: string | RHFPhoneInputValue) {
  return typeof value === 'string' ? value : value?.phoneNo;
}

function replaceFileWithName(value: unknown): unknown {
  if (value instanceof File) {
    return value.name;
  }
  if (Array.isArray(value)) {
    return value.map(replaceFileWithName);
  }
  return value;
}

/**
 * Replaces `File`/`File[]` values in a form values object with the file
 * name(s), so uploaded files are readable when the values are displayed
 * (e.g. in a debug JSON view) instead of showing an opaque `File` object.
 *
 * The return type is asserted back to `T` since this is a display-only
 * transform — callers should not rely on the substituted fields still
 * being `File`/`File[]`.
 */
export function withFileNames<T extends Record<string, unknown>>(
  formValues: T
): T {
  return Object.fromEntries(
    Object.entries(formValues).map(([key, value]) => [
      key,
      replaceFileWithName(value)
    ])
  ) as T;
}
