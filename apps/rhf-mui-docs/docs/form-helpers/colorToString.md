---
sidebar_position: 2
sidebar_label: colorToString
title: colorToString
description: Function to convert a color object in RGB or HSV format into a valid CSS color string.
---

# colorToString

```ts
function colorToString(color: ColorObject, excludeAlpha?: boolean): string;
```

Converts a color object in RGB or HSV format into a valid CSS color string, best used with [RHFColorPicker](../components/misc/RHFColorPicker.mdx).

## Usage

```js
import { colorToString } from '@nish1896/rhf-mui-components/form-helpers';
```

### Parameters

1. `color` - An object representing color values, which can include:
    - For RGB: `r` (red), `g` (green), `b` (blue), and optionally `a` (alpha).
    - For HSV: `h` (hue), `s` (saturation), `v` (value), and optionally `a` (alpha).

2. `excludeAlpha` - An optional boolean to exclude the alpha channel. If `true`, alpha will be excluded when its value is `1` or `undefined`.

### Returns

A string representation of the color in CSS-compatible rgb, rgba, hsv, or hsva format.

Eg - `rgb(26, 86, 150)`, `hsva(88, 79%, 63%, 1)`

### Error

- If the input object is neither a valid RGB nor HSV color.

## Examples

```ts
/* RGB color without alpha */
colorToString({ r: 255, g: 100, b: 50 }, true);
// Output: "rgb(255, 100, 50)"

/* RGB color with alpha */
colorToString({ r: 255, g: 100, b: 50, a: 0.5 });
// Output: "rgba(255, 100, 50, 0.5)"

/* HSV color without alpha */
colorToString({ h: 200, s: 75, v: 50 }, true);
// Output: "hsv(200, 75%, 50%)"

/* HSV color with alpha */
colorToString({ h: 200, s: 75, v: 50, a: 0.8 });
// Output: "hsva(200, 75%, 50%, 0.8)"
```