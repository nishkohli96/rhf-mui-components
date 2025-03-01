---
sidebar_position: 1
sidebar_label: fieldNameToLabel
title: fieldNameToLabel
description: Defination and usage of a function to generate user-friendly label from a string in camelCase or snake_case.
---

# fieldNameToLabel

```ts
function fieldNameToLabel(fieldName: string): string;
```

This function generates a user-friendly label for the form field based on its `fieldName` prop, eliminating the need for the developer to explicitly provide the `label` prop, unless required.

## Usage

```js
import { fieldNameToLabel } from '@nish1896/rhf-mui-components/form-helpers';
```

This function can be extremely useful for generating human-readable validation
messages for your fields, saving you the effort of manually crafting a custom
sentence for each field validation. It:

1. Converts **camelCase** and **snake_case** into words.
2. Capitalizes the first letter of each word.
3. Handles abbreviations when generating the field label.

## Example

```js
const label1 = fieldNameToLabel('firstName');     // Output: 'First Name'
const label2 = fieldNameToLabel('email_address'); // Output: 'Email Address'
const label3 = fieldNameToLabel('IMDBRating');    // Output: 'IMDB Rating'
```
