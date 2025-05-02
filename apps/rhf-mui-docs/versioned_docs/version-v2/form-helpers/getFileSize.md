---
sidebar_position: 3
sidebar_label: getFileSize
title: getFileSize
description: Returns the size of a file to the nearest bytes, KB, MB or GB.
---

# getFileSize

```ts
function getFileSize(
  size: number,
  options?: {
    valueAsNumber?: boolean;
    precision?: number;
  }
): string;
```

This function returns the file size in bytes, kilobytes (KB), megabytes (MB), or gigabytes (GB), rounded to the nearest whole number or to the specified precision.

## Usage

```js
import { getFileSize } from '@nish1896/rhf-mui-components/form-helpers';
```

### Parameters

1. `size`: The file size in bytes. Since the `size` property of a **File** object in the browser is always in bytes, this function accepts the size in bytes to accurately calculate and convert it to the nearest **kilobytes (KB)**, **megabytes (MB)** or **gigabytes (GB)**, with better precision and rounding options.

2. `options`: Optional configuration object to customize the output.
    - `valueAsNumber`: If true, returns the size as a numeric value instead of a string with units.
    - `precision`: Number of decimal places to round to (defaults to 1).

### Returns

A string representing the file size along with appropriate units (Bytes, KB, MB, or GB), rounded to the specified precision if provided.

For example: `323.45 KB`, `6 MB`.

### Exceptions
- Returns **'0 bytes'** if size= 0

### Error
- Returns **'Invalid size'** if size is a negative number

## Examples

```ts
getFileSize(323);
// Output: "323 bytes"

getFileSize(1024);
// Output: "1 KB"

getFileSize(10452345, { precision: 2 })
// Output: "9.97 MB"

getFileSize(10452345, { valueAsNumber: true })
// Output: "10 MB"
```