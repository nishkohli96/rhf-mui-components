---
sidebar_position: 4
sidebar_label: validateFileList
title: validateFileList
description: Validates a list of files based on size limit and extension to return accepted files, rejected files, and per-file validation errors.
---

# validateFileList

`validateFileList` function processes a list of uploaded files, validating each file against:

- Maximum file size in bytes (if provided)
- Accepted file types (based on the `accept` attribute)

This function utilized by [RHFFileUploader](../components/mui/RHFFileUploader.mdx) ensures only files meeting the required criteria are passed for further processing.

```ts
type ValidateFileListOptions = {
  accept?: string,
  maxSize?: number,
  maxFiles?: number
}

type ProcessFilesResult = {
  acceptedFiles: File[];
  rejectedFiles: {
    file: File;
    errors: FileUploadError[];
  }[];
}

function validateFileList(
  fileList: FileList,
  options?: ValidateFileListOptions
): ProcessFilesResult
```

## Usage

```js
import { validateFileList } from '@nish1896/rhf-mui-components/form-helpers';
```

### Parameters

1. `fileList`: The set of input files to run this validation against.
2. `options`: Validation options used when processing the file list.
    - `accept` — Optional string specifying the allowed file types or extensions, following the standard `input[type="file"]` `accept` attribute format (for example, `.png, .jpg, image/*`). Files that do not match the specified criteria will be added to `rejectedFiles`.
    - `maxSize` — Optional maximum file size in bytes. Files exceeding this limit will be added to `rejectedFiles`.
    - `maxFiles` — Optional maximum number of files allowed. If the number of valid files exceeds this limit, the additional files will be added to `rejectedFiles` with a `FILE_LIMIT_EXCEEDED` error and excluded from `acceptedFiles`.

### Returns

1. `acceptedFiles` — Files that passed validation (`File[]`).

2. `rejectedFiles` — Files that failed validation, along with the reasons for rejection, and is of the type:

    ```ts
    type FileUploadErrorDetails = {
      /** File that failed validation. */
      file: File;

      /** Validation errors reported for the file. */
      errors: FileUploadError[];
    };
    ```

    Possible `FileUploadError` values:
    - `FILE_SIZE_EXCEEDED`
    - `FILE_TYPE_NOT_ALLOWED`
    - `FILE_LIMIT_EXCEEDED`

:::warning

The `validateFileList` method signature and return value have changed in **v4**.

- The function now accepts a single options object instead of multiple positional arguments.
- The returned `errors` array has been removed. Validation errors are now returned as part of `rejectedFiles`.

If you are using this utility directly in your application, update existing calls accordingly:

```diff
- const {
-   acceptedFiles,
-   rejectedFiles,
-   errors
- } = validateFileList(fileList, '*', 5 * 1024 * 1024, 3);

+ const {
+   acceptedFiles,
+   rejectedFiles
+ } = validateFileList(fileList, {
+   accept: '*',
+   maxSize: 5 * 1024 * 1024,
+   maxFiles: 3
+ });
```
:::

## Examples

```ts
// Allow any file, but max allowed size for each file should be 5 MB.
validateFileList(fileList, { accept: '*', maxSize: 5 * 1024 * 1024 });

// Allow only image mimetype
validateFileList(fileList, { accept: 'image/*' });

// Allow at max 3 files
validateFileList(fileList, { maxFiles: 3 });
```
