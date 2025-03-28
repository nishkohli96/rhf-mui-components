---
sidebar_position: 7
sidebar_label: Changelog
title: Changelog
description: Introduction and installation of @nish1896/rhf-mui-components package.
---

# **What's changed?**

## [2.1.1](https://github.com/nishkohli96/rhf-mui-components/tree/v2.1.1)

**Released - 30 Mar, 2025**

## Fixes & Enhancements
- Internal optimization to reduce bundle size
- Correct `fieldLabelText` logic in [RHFSelect](./components/mui/RHFSelect.mdx)


## [2.1.0](https://github.com/nishkohli96/rhf-mui-components/tree/v2.1.0)

**Released - 3 Mar, 2025**

### New Components 🔥
- [RHFNumberInput](../docs/components/mui/RHFNumberInput.mdx)
- [RHFFileUploader](../docs/components/mui/RHFFileUploader.mdx)

### New Helper functions 🎉
- [getFileSize](./form-helpers/getFileSize.md)
- [validateFileList](./form-helpers/validateFileList.md)

## [2.0.1](https://github.com/nishkohli96/rhf-mui-components/tree/v2.0.1)

**Released - 11 Jan, 2025**

- Update `exports` and `typesVersions` to fix resolution of default imports from the individual folder of a component. 

## [2.0.0](https://github.com/nishkohli96/rhf-mui-components/tree/v2.0.0)

**Released - 14 Dec, 2024**

### New Components 🔥
- [RHFAutocomplete](../docs/components/mui/RHFAutocomplete.mdx)
- [RHFMultiAutocomplete](../docs/components/mui/RHFMultiAutocomplete.mdx)
- [RHFCountrySelect](../docs/components/mui/RHFCountrySelect.mdx)
- [RHFTagsInput](../docs/components/mui/RHFTagsInput.mdx)
- [RHFPhoneInput](../docs/components/misc/RHFPhoneInput.mdx)

### New Features 🎉
- Add `allLabelsAboveFields` prop in [ConfigProvider](../docs/customization.mdx) component to set `showLabelAboveFormField` to true for all components.
- Added `required` prop for all components to indicate in the formLabel that the field needs to be filled with the relevant value before submission. 
- Add `fontSize`, `fontFamily`, `fontColor`, `fontBackgroundColor` options in the toolbar for [RHFRichTextEditor](../docs/components/misc/RHFRichTextEditor.mdx).
- Introduce `form-helpers` module which exposes internal utility functions to the developers.

### Enhancements ✨
- Added a new form example containing all components with validation handled through the `registerOptions` prop.
- Added a checkbox to enable or disable all form fields in the forms that include every component of this package.
- Version-Specific Documentation.

### Fixes 🛠️
- Checkbox default label now renders with label prop
- Add `disabled` prop in `RHFCheckboxGroup` & `RHFRadioGroup`
- Improve implementation for `RHFNativeSelect` & `RHFColorPicker`. Check [Migration Guide](./migration.md) for more details.
- Update v1 docs

### Compatibility with MUI v6 and above
Introduced a flag `isAboveMuiV5` in the code to handle the deprecation of the following props when using this package with MUI v6 or above. The dependencies have also been upgraded to care care of this.

| Mui Component | Deprecated Prop in v5 | Use Instead | Components Affected |
|-|-|-|-|
|[Autocomplete](https://mui.com/material-ui/api/autocomplete/) | `ChipProps` | `slotProps.chip` | [RHFAutocomplete](../docs/components/mui/RHFAutocomplete.mdx), [RHFMultiAutocomplete](../docs/components/mui/RHFMultiAutocomplete.mdx), [RHFCountrySelect](../docs/components/mui/RHFCountrySelect.mdx)|
|[TextField](https://mui.com/material-ui/api/text-field/) | `inputProps` | `slotProps.htmlInput` | [RHFAutocomplete](../docs/components/mui/RHFAutocomplete.mdx), [RHFMultiAutocomplete](../docs/components/mui/RHFMultiAutocomplete.mdx), [RHFCountrySelect](../docs/components/mui/RHFCountrySelect.mdx) |
|[TextField](https://mui.com/material-ui/api/text-field/) | `InputProps` | `slotProps.input` |[RHFPasswordInput](../docs/components/mui/RHFPasswordInput.mdx), [RHFTagsInput](../docs/components/mui/RHFTagsInput.mdx), [RHFPhoneInput](../docs/components/misc/RHFPhoneInput.mdx) |

## [1.0.3](https://github.com/nishkohli96/rhf-mui-components/tree/v1.0.3)

**Released - 1 Nov, 2024**

- Fix `defaultFormHelperTextSx` bug in `ConfigProvider`.
- Handle snake-case convention to render default form label text.
- Added [Examples](https://rhf-mui-components-examples.netlify.app/) and [Playground](https://codesandbox.io/p/devbox/rhf-mui-components-examples-y8lj9l) links on appbar in docs website.
