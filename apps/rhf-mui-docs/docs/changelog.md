---
sidebar_position: 7
sidebar_label: Changelog
title: Changelog
description: Introduction and installation of @nish1896/rhf-mui-components package.
---

# **What's changed?**

## [2.0.0](https://github.com/nishkohli96/rhf-mui-components/tree/v2.0.0)

**Released - 24 Nov, 2024**

**New Components 🔥**
- [RHFCountrySelect](../docs/components/mui/RHFCountrySelect.mdx)
- [RHFPhoneInput](../docs/components/misc/RHFPhoneInput.mdx)

**New Features 🎉**
- Add `allLabelsAboveFields` prop in [ConfigProvider](../docs/customization.mdx) component to set `showLabelAboveFormField` to true for all components. 
- Add 'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor' options in toolbar for RHFRichTextEditor

**Enhancements**
- Added another form with all components with validation done via `registerOptions`
- Added a checkbox to enable/disable all fields in forms with all components of this package. 

**Fixes 🛠️**
- Code optimization
- Upgrade MUI Versions
- Checkbox default label now renders with label prop
- disable option in checkbox & radiogrop
- Update v1 docs.

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