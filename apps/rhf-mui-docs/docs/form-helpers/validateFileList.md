---
sidebar_position: 4
sidebar_label: validateFileList
title: validateFileList
description: Validates a list of files based on size limit and extension to return an array of acceptedFiles, rejectedFiles and errors.
---

# validateFileList

```ts
type ProcessFilesResult = {
  acceptedFiles: File[];
  rejectedFiles?: File[]; 
  errors?: FileUploadError[];
}

function validateFileList(
  fileList: FileList,
  accept?: string
  maxSize?: number,
): ProcessFilesResult
```

`validateFileList` function processes a list of uploaded files, validating each file against:

- Maximum file size in bytes (if provided)
- Accepted file types (based on the `accept` attribute)

This function utilized by [RHFFileUploader](../components/mui/RHFMultiAutocomplete.mdx) ensures only files meeting the required criteria are passed for further processing.

## Usage

```js
import { validateFileList } from '@nish1896/rhf-mui-components/form-helpers';
```

### Parameters

1. `fileList`: The set of input files to run this validation against.

2. `accept`: An optional string that specifies the allowed file types or extensions, following the standard input[type="file"] accept attribute format (e.g., `.png, .jpg, image/*`). Files not matching the criteria will be rejected.

3. `maxSize`: An optional numeric value (in bytes) that sets the maximum allowed file size. Files exceeding this limit will be rejected.


### Returns

- `acceptedFiles`: A list of accepted files.
- `rejectedFiles`: A list of rejected files.
- `errors`: A set of validation errors which can be any of:
    - `FILE_SIZE_EXCEEDED`
    - `FILE_TYPE_NOT_ALLOWED`

## Examples

```ts
// Allow any file, but max allowed size for each file should be 5 MB.
validateFileList(fileList, '*', 5 * 1024 * 1024);

// Allow only image mimetype
validateFileList(fileList, 'image/*');
// Output: "1 KB"

getFileSize(10452345, { precision: 2 })
// Output: "9.97 MB"

getFileSize(10452345, { valueAsNumber: true })
// Output: "10 MB"
```