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
![[Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/nishkohli96/rhf-mui-components/tree/v4-examples)

**A suite of 25+ reusable mui components for react-hook-form to minimize your time and effort in creating forms**

## Features ✨

- Each component is fully functional with just 2-3 props — core logic handled internally.
- Style individual components or apply global styles via [ConfigProvider](https://rhf-mui-components.vercel.app/customization#configprovider).
- Includes well-configured unique components like [RichTextEditor](https://rhf-mui-components.vercel.app/components/misc/RHFRichTextEditor), [Country Select](https://rhf-mui-components.vercel.app/components/mui/RHFCountrySelect) and [Tags Input](https://rhf-mui-components.vercel.app/components/mui/RHFTagsInput), saving development time.
- Provides full control over value validation and transformation before updates are committed to form state.
- Comprehensive docs showcasing multiple variations for each component.

## Explore and Get Started 🚀

### Documentation 📖
Access the full documentation for rhf-mui-components, including setup instructions, API references, and examples:

👉 [Documentation Site](https://rhf-mui-components.vercel.app/)

### Interactive Demos 🎮
Try out and experiment with the form components in a live environment:

👉 [Live Demo Examples](https://rhf-mui-components-examples.vercel.app/)

### Sample Apps 🛠️
Clone this repo to explore real-world usage of the package with [Next.js](https://nextjs.org/) and MUI [v5](https://v5.mui.com/material-ui/), [v6](https://v6.mui.com/material-ui/), and [v7](https://v7.mui.com/material-ui/). Each version is set up in its own example app for easy testing and comparison:

👉 [Cloneable Example Repo](https://github.com/nishkohli96/rhf-mui-examples)


## Setup
Run the setup script.

```bash
sh scripts/setup.sh
```

This will perform the following tasks:

- Install `node_modules` in workspace root
- Build the `@nish1896/rhf-mui-components` package.
- Add this package as a dependency in `@nish1896/rhf-mui-demo` repo to test new and existing components

To apply any changes made to the package, rebuild it by running the command below:

```
pnpm lib
```
