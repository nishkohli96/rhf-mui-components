# **What's changed?**

## [2.1.1](https://github.com/nishkohli96/rhf-mui-components/tree/v2.1.1)

**Released - 30 Mar, 2025**

## Fixes & Enhancements
- Internal optimization to reduce bundle size
- Correct `fieldLabelText` logic in [RHFSelect](https://rhf-mui-components.netlify.app/components/mui/rhfselect)
- Use [@nish1896/eslint-flat-config](https://www.npmjs.com/package/@nish1896/eslint-flat-config) in `@nish1896/rhf-mui-components` package.


## [2.1.0](https://github.com/nishkohli96/rhf-mui-components/tree/v2.1.0)

**Released - 3 Mar, 2025**

### New Components 🔥
- [RHFNumberInput](./apps/rhf-mui-docs/docs/components/mui/RHFNumberInput.mdx)
- [RHFFileUploader](./apps/rhf-mui-docs/docs/components/mui/RHFFileUploader.mdx)

### Features & Enchancements 🎉
- Export [getFileSize](./apps/rhf-mui-docs/docs/form-helpers/getFileSize.md) & [validateFileList](./apps/rhf-mui-docs/docs/form-helpers/validateFileList.md) functions from `form-helpers`
- Bump [Docusaurus](https://docusaurus.io/) version from `3.6.3` to `3.7.0`.
- Add [turbo](https://www.npmjs.com/package/turbo)

## [2.0.1](https://github.com/nishkohli96/rhf-mui-components/tree/v2.0.1)

**Released - 11 Jan, 2025**

- Update `exports` and `typesVersions` to fix resolution of default imports from the individual folder of a component. 

## [2.0.0](https://github.com/nishkohli96/rhf-mui-components/tree/v2.0.0)

**Released - 14 Dec, 2024**

### New Components 🔥
- [RHFAutocomplete](./apps/rhf-mui-docs/docs/components/mui/RHFAutocomplete.mdx)
- [RHFMultiAutocomplete](./apps/rhf-mui-docs/docs/components/mui/RHFMultiAutocomplete.mdx)
- [RHFCountrySelect](./apps/rhf-mui-docs/docs/components/mui/RHFCountrySelect.mdx)
- [RHFTagsInput](./apps/rhf-mui-docs/docs/components/mui/RHFTagsInput.mdx)
- [RHFPhoneInput](./apps/rhf-mui-docs/docs/components/misc/RHFPhoneInput.mdx)

### New Features 🎉
- Add `allLabelsAboveFields` prop in [ConfigProvider](./apps/rhf-mui-docs/docs/customization.mdx) component to set `showLabelAboveFormField` to true for all components.
- Added `required` prop for all components to indicate in the formLabel that the field needs to be filled with the relevant value before submission. 
- Add `fontSize`, `fontFamily`, `fontColor`, `fontBackgroundColor` options in the toolbar for [RHFRichTextEditor](./apps/rhf-mui-docs/docs/components/misc/RHFRichTextEditor.mdx).
- Introduce `form-helpers` module which exposes internal utility functions to the developers.

### Enhancements ✨
- Added a new form example containing all components with validation handled through the `registerOptions` prop.
- Added a checkbox to enable or disable all form fields in the forms that include every component of this package.
- Version-Specific Documentation.

### Fixes 🛠️
- Code optimization
- Upgrade MUI Versions
- Checkbox default label now renders with label prop
- Add `disabled` prop in `RHFCheckboxGroup` & `RHFRadioGroup`
- Improve implementation for `RHFNativeSelect` & `RHFColorPicker`. Check [Migration Guide](./apps/rhf-mui-docs/docs/migration.md) for more details.
- Update v1 docs

### Compatibility with MUI v6 and above
Introduced a flag `isAboveMuiV5` in the code to handle the deprecation of the following props when using this package with MUI v6 or above. The dependencies have also been upgraded to care care of this.

| Mui Component | Deprecated Prop in v5 | Use Instead | Components Affected |
|-|-|-|-|
|[Autocomplete](https://mui.com/material-ui/api/autocomplete/) | `ChipProps` | `slotProps.chip` | [RHFAutocomplete](./apps/rhf-mui-docs/docs/components/mui/RHFAutocomplete.mdx), [RHFMultiAutocomplete](./apps/rhf-mui-docs/docs/components/mui/RHFMultiAutocomplete.mdx), [RHFCountrySelect](./apps/rhf-mui-docs/docs/components/mui/RHFCountrySelect.mdx)|
|[TextField](https://mui.com/material-ui/api/text-field/) | `inputProps` | `slotProps.htmlInput` | [RHFAutocomplete](./apps/rhf-mui-docs/docs/components/mui/RHFAutocomplete.mdx), [RHFMultiAutocomplete](./apps/rhf-mui-docs/docs/components/mui/RHFMultiAutocomplete.mdx), [RHFCountrySelect](./apps/rhf-mui-docs/docs/components/mui/RHFCountrySelect.mdx) |
|[TextField](https://mui.com/material-ui/api/text-field/) | `InputProps` | `slotProps.input` |[RHFPasswordInput](./apps/rhf-mui-docs/docs/components/mui/RHFPasswordInput.mdx), [RHFTagsInput](./apps/rhf-mui-docs/docs/components/mui/components/mui/RHFTagsInput.mdx), [RHFPhoneInput](./apps/rhf-mui-docs/docs/components/misc/RHFPhoneInput.mdx) |

### Upgrade Dependencies
| Package Name | Previous Version | Current Version |
|-|-|-|
|[Docusaurus](https://docusaurus.io/)| `3.5.2` | `3.6.3` |
|[@mui/material](https://www.npmjs.com/package/@mui/material), [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material)| `5.16.7` | `6.1.10` |
|[@mui/material-nextjs](https://www.npmjs.com/package/@mui/material-nextjs)| `5.16.6` | `6.1.9` |
|[@mui/x-tree-view](https://www.npmjs.com/package/@mui/x-tree-view) | `6.17.0` | `7.23.0` |
|[@mui/x-date pickers](https://mui.com/x/react-date-pickers/) | `7.23.0` | `7.23.2` |
|[react-color-palette](https://www.npmjs.com/package/react-color-palette) | `7.2.2` | `7.3.0` |

## [1.0.3](https://github.com/nishkohli96/rhf-mui-components/tree/v1.0.3)

**Released - 1 Nov, 2024**

- Fix `defaultFormHelperTextSx` bug in `ConfigProvider`.
- Handle snake-case convention to render default form label text.
- Added [Examples](https://rhf-mui-components-examples.netlify.app/) and [Playground](https://codesandbox.io/p/devbox/rhf-mui-components-examples-y8lj9l) links on appbar in docs website.
- Added ***downloads per month*** metric in README.
- Use [tsc-alias](https://www.npmjs.com/package/tsc-alias) for alias imports.
- Lint package using my own [eslint config](https://www.npmjs.com/package/@nish1896/eslint-config).
- Update search keywords in `package.json`.
- Change [next](https://nextjs.org/) version from `14.2.3` to `14.2.16`.
- Remove badges from demo website homepage due to size inconsistency.