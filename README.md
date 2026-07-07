<p align="center">
  <img src="https://raw.githubusercontent.com/nishkohli96/rhf-mui-components/refs/heads/main/apps/rhf-mui-demo/public/logo.svg" width="200" />
</p>

<h1 align="center">@nish1896/rhf-mui-components</h1>

<p align="center">
  <b>A suite of 20+ production-ready <a href="https://mui.com/">Material UI</a> components for <a href="https://react-hook-form.com/">react-hook-form</a> — fully typed, tree-shakable, and built to cut form boilerplate down to a handful of props.</b>
</p>


<p align="center">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/%40nish1896%2Frhf-mui-components" />
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/%40nish1896%2Frhf-mui-components" />
  <img alt="NPM Downloads Per Month" src="https://img.shields.io/npm/dm/%40nish1896%2Frhf-mui-components?color=%23e0e063" />
  <img alt="GitHub Release Date" src="https://img.shields.io/github/release-date/nishkohli96/rhf-mui-components" />
  <img alt="TypeScript Strict" src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white" />
  <img alt="CI" src="https://github.com/nishkohli96/rhf-mui-components/actions/workflows/publish.yml/badge.svg" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg" />
</p>

<p align="center">
  <a href="https://rhf-mui-components.vercel.app/">Documentation</a> ·
  <a href="https://rhf-mui-components-examples.netlify.app/">Live Demo</a> ·
  <a href="https://www.npmjs.com/package/@nish1896/rhf-mui-components?activeTab=versions">npm</a>
</p>

## Features ✨

- Each component is fully functional with just 3-4 props — core logic handled internally.
- Style individual components or apply global styles via [ConfigProvider](https://rhf-mui-components.netlify.app/customization#configprovider).
- Includes well-configured unique components like [RichTextEditor](https://rhf-mui-components.netlify.app/components/misc/RHFRichTextEditor), [Country Select](https://rhf-mui-components.netlify.app/components/mui/RHFCountrySelect) and [Tags Input](https://rhf-mui-components.netlify.app/components/mui/RHFTagsInput), saving development time.
- Comprehensive docs showcasing multiple variations for each component.


## Explore and Get Started 🚀

### Documentation 📖
Access the full documentation for rhf-mui-components, including setup instructions, API references, and examples:

👉 [Documentation Site](https://rhf-mui-components.vercel.app/)

### Interactive Demos 🎮
Try out and experiment with the form components in a live environment:

👉 [Live Demo Examples](https://rhf-mui-components-examples.netlify.app/)

### 🧪 Playground

Spin up an editable sandbox in your browser — fork it and experiment freely:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/nishkohli96/rhf-mui-components/tree/v3-examples)

## Setup
Run the setup script.

```bash
bash scripts/setup.sh
```

This will perform the following tasks:

- Install `node_modules` in workspace root
- Build the `@nish1896/rhf-mui-components` package.
- Link this package to `@nish1896/rhf-mui-demo` repo to test new and existing components

To apply any changes made to the package, rebuild it by running the command below:

```
yarn lib
```
