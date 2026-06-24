<p align="center">
  <img src="https://raw.githubusercontent.com/nishkohli96/rhf-mui-components/refs/heads/main/apps/rhf-mui-demo/public/logo.svg" width="200" />
</p>

# @nish1896/rhf-mui-components

![NPM Version](https://img.shields.io/npm/v/%40nish1896%2Frhf-mui-components)
![NPM Downloads](https://img.shields.io/npm/dt/%40nish1896%2Frhf-mui-components)
![NPM Downloads Per Month](https://img.shields.io/npm/dm/%40nish1896%2Frhf-mui-components?color=%23e0e063)
![GitHub Release Date - Published_At](https://img.shields.io/github/release-date/nishkohli96/rhf-mui-components)
![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![CI](https://github.com/nishkohli96/rhf-mui-components/actions/workflows/publish.yml/badge.svg)

**A suite of 25+ reusable Material UI and other third-party components for [react-hook-form](https://react-hook-form.com/) to minimize your time and effort in creating beautiful forms.**

## Features ✨

- Each component is fully functional with just 2-3 props — core logic handled internally.
- Style individual components or apply global styles via [ConfigProvider](https://rhf-mui-components.vercel.app/customization#configprovider).
- Includes well-configured unique components like [RichTextEditor](https://rhf-mui-components.vercel.app/components/misc/RHFRichTextEditor), [Country Select](https://rhf-mui-components.vercel.app/components/mui/RHFCountrySelect) and [File Uploader](https://rhf-mui-components.vercel.app/components/mui/RHFFileUploader), saving development time.
- Provides full control over value validation and transformation before updates are committed to form state.
- Comprehensive docs showcasing multiple variations for each component.

---

## 🚀 **Version 4 Released**

`v4` is now available with deeper MUI integration, more consistent callback APIs, stronger accessibility defaults, and new customization options across the component set.

### Highlights

- Supports MUI `v6` and `v7`. MUI `v5` support has been removed from `v4`.
- Added `customOnChange` for all components, allowing developers to intercept, validate, or transform values before they are committed to form state.
- Added external `ref` forwarding support across supported components.
- Added `customIds` and improved element-level ARIA attributes for better accessibility.
- Added support for `freeSolo` in `RHFAutocomplete` and `RHFMultiAutocomplete`, allowing users to enter values that are not present in the provided options.
- Added Desktop, Mobile, and Static Date/Time picker variants.
- `RHFFileUploader` now supports drag-and-drop uploads, `existingFiles`, `dropZoneProps`, and file-specific upload errors.
- `RHFPhoneInput` now stores a structured value object with `phone`, `country`, `dialCode`, and `phoneNo`, and includes searchable country selection.

If you are upgrading from `v3`, please review the [v4 migration guide](https://rhf-mui-components.vercel.app/migration/v4) before updating.

> Need MUI `v5` support? Continue using the latest `v3` release of this package.

---

## Explore and Get Started 🚀

### Documentation 📖
Access the full documentation for rhf-mui-components, including setup instructions, API references, and examples:

👉 [Documentation Site](https://rhf-mui-components.vercel.app/)

### Interactive Demos 🎮
Try out and experiment with the form components in a live environment:

👉 [Live Demo Examples](https://rhf-mui-components-examples.vercel.app/)

### Sample Apps 🛠️
Clone this repo to explore real-world usage of the package with [Next.js](https://nextjs.org/) and MUI [v6](https://mui.com/material-ui/) / [v7](https://mui.com/material-ui/). If you need MUI `v5`, use the latest `v3` version of this package.

👉 [Cloneable Example Repo](https://github.com/nishkohli96/rhf-mui-examples)


## Form Components List

Below is a comprehensive list of all components included in this package, categorized by module:

- **mui**
  - [TextField](https://rhf-mui-components.vercel.app/components/mui/RHFTextField)
  - [NumberInput](https://rhf-mui-components.vercel.app/components/mui/RHFNumberInput)
  - [PasswordInput](https://rhf-mui-components.vercel.app/components/mui/RHFPasswordInput)
  - [Tags Input](https://rhf-mui-components.vercel.app/components/mui/RHFTagsInput)
  - [File Uploader](https://rhf-mui-components.vercel.app/components/mui/RHFFileUploader)
  - [Select](https://rhf-mui-components.vercel.app/components/mui/RHFSelect)
  - [Native Select](https://rhf-mui-components.vercel.app/components/mui/RHFNativeSelect)
  - [Autocomplete](https://rhf-mui-components.vercel.app/components/mui/RHFAutocomplete)
  - [Autocomplete Object](https://rhf-mui-components.vercel.app/components/mui/RHFAutocompleteObject)
  - [Multi Autocomplete](https://rhf-mui-components.vercel.app/components/mui/RHFMultiAutocomplete)
  - [Multi Autocomplete Object](https://rhf-mui-components.vercel.app/components/mui/RHFMultiAutocompleteObject)
  - [Country Select](https://rhf-mui-components.vercel.app/components/mui/RHFCountrySelect)
  - [Checkbox](https://rhf-mui-components.vercel.app/components/mui/RHFCheckbox)
  - [Checkbox Group](https://rhf-mui-components.vercel.app/components/mui/RHFCheckboxGroup)
  - [Radio Group](https://rhf-mui-components.vercel.app/components/mui/RHFRadioGroup)
  - [Slider](https://rhf-mui-components.vercel.app/components/mui/RHFSlider)
  - [Switch](https://rhf-mui-components.vercel.app/components/mui/RHFSwitch)
  - [Rating](https://rhf-mui-components.vercel.app/components/mui/RHFRating)

- **mui-pickers**
  - [Date](https://rhf-mui-components.vercel.app/components/mui-pickers/RHFDatePicker)
  - [Time](https://rhf-mui-components.vercel.app/components/mui-pickers/RHFTimePicker)
  - [DateTime](https://rhf-mui-components.vercel.app/components/mui-pickers/RHFDateTimePicker)
- **misc**
  - [Color Picker](https://rhf-mui-components.vercel.app/components/misc/RHFColorPicker)
  - [Rich Text Editor](https://rhf-mui-components.vercel.app/components/misc/RHFRichTextEditor)
  - [Phone Input](https://rhf-mui-components.vercel.app/components/misc/RHFPhoneInput)

**This project has been an individual effort so far, and I’d love to invite collaborators to contribute by adding new components or improving the documentation and examples for existing ones. If you're interested, feel free to reach out at [nishantkohli96@gmail.com](mailto:nishantkohli96@gmail.com).**

You can also check out my [eslint config](https://www.npmjs.com/package/@nish1896/eslint-flat-config), to format and prettify your javascript code.
