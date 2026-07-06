<p align="center">
  <img src="https://raw.githubusercontent.com/nishkohli96/rhf-mui-components/refs/heads/main/apps/rhf-mui-demo/public/logo.svg" width="200" />
</p>

<h1 align="center">@nish1896/rhf-mui-components</h1>

<p align="center">
  <b>A suite of 25+ production-ready <a href="https://mui.com/">Material UI</a> components for <a href="https://react-hook-form.com/">react-hook-form</a> — fully typed, tree-shakable, and built to cut form boilerplate down to a handful of props.</b>
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
  <a href="https://rhf-mui-components-examples.vercel.app/">Live Demo</a> ·
  <a href="https://www.npmjs.com/package/@nish1896/rhf-mui-components">npm</a>
</p>

## ✨ Features

- Each component is fully functional with just 2-3 props — core logic handled internally.
- Style individual components or apply global styles via [ConfigProvider](https://rhf-mui-components.vercel.app/customization#configprovider).
- Includes well-configured unique components like [RichTextEditor](https://rhf-mui-components.vercel.app/components/misc/RHFRichTextEditor), [Country Select](https://rhf-mui-components.vercel.app/components/mui/RHFCountrySelect), [File Uploader](https://rhf-mui-components.vercel.app/components/mui/RHFFileUploader) and [Tags Input](https://rhf-mui-components.vercel.app/components/mui/RHFTagsInput), saving development time.
- Provides full control over value validation and transformation before updates are committed to form state.
- Comprehensive docs showcasing multiple variations for each component.

## 📦 Installation

```bash
npm install @nish1896/rhf-mui-components react-hook-form @mui/material @mui/x-date-pickers
```

`react-hook-form`, `@mui/material` and `@mui/x-date-pickers` are peer dependencies — `v4` supports MUI `v6` and `v7`.

Need MUI `v5`? Stick with the latest `v3` release instead.

```tsx
import { useForm } from 'react-hook-form';
import RHFTextField from '@nish1896/rhf-mui-components/mui/textfield';

function ProfileForm() {
  const { control, handleSubmit } = useForm({ defaultValues: { name: '' } });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <RHFTextField
        name="name"
        control={control}
        variant="standard"
      />
    </form>
  );
}
```

Full setup and API reference: 👉 [Documentation Site](https://rhf-mui-components.vercel.app/)

## 🚀 What's New in v4

`v4` ships deeper MUI integration, more consistent callback APIs, stronger accessibility defaults, and new customization options across the component set.

- Added `customOnChange` across all components to intercept, validate, or transform values before they hit form state.
- Added external `ref` forwarding support across supported components.
- Added `customIds` and improved element-level ARIA attributes for accessibility.
- Added `freeSolo` support in `RHFAutocomplete` and `RHFMultiAutocomplete`.
- Added Desktop, Mobile, and Static Date/Time picker variants.
- `RHFFileUploader` now supports drag-and-drop, `existingFiles`, `dropZoneProps`, and file-specific upload errors.
- `RHFPhoneInput` now stores a structured `{ phone, country, dialCode, phoneNo }` value with searchable country selection.

Upgrading from `v3`? Read the [v4 migration guide](https://rhf-mui-components.vercel.app/migration/v4) first. Full history in [changelog/](./changelog).

## Explore and Get Started

### 📖 Documentation
Full setup instructions, API references, and examples for every component:

👉 [Documentation Website](https://rhf-mui-components.vercel.app/)

### 🎮 Interactive Demos
Try out the form components live, no install required:

👉 [Live Demo Examples](https://rhf-mui-components-examples.vercel.app/)

### 🧪 Playgrounds

Spin up an editable sandbox in your browser — fork it and experiment freely:

[![StackBlitz: v4 Playground](https://img.shields.io/badge/StackBlitz-v4%20Playground-1269D3?logo=stackblitz&logoColor=white)](https://stackblitz.com/github/nishkohli96/rhf-mui-components/tree/v4-examples)
[![StackBlitz: v3 Playground](https://img.shields.io/badge/StackBlitz-v3%20Playground-1269D3?logo=stackblitz&logoColor=white)](https://stackblitz.com/github/nishkohli96/rhf-mui-components/tree/v3-examples)

## 🛠️ Local Development

This is a `pnpm` monorepo — the published package lives in `packages/rhf-mui-components`, with a demo app and docs site in `apps/`.

Run the setup script:

```bash
bash scripts/setup.sh
```

This will:

- Install `node_modules` in the workspace root.
- Build the `@nish1896/rhf-mui-components` package.
- Add this package as a dependency in `@nish1896/rhf-mui-demo` to test new and existing components.

After making changes to the package, rebuild it with:

```bash
pnpm lib
```

## 🤝 Contributing

This project has been an individual effort so far, and I'd love to invite collaborators — whether that's a new component, a doc improvement, or a bug fix. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the branch naming convention and release process, and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for community guidelines.

Feel free to reach out directly at [nishantkohli96@gmail.com](mailto:nishantkohli96@gmail.com).

You can also check out my [eslint config](https://www.npmjs.com/package/@nish1896/eslint-flat-config) to format and prettify your JavaScript/TypeScript code.

## License

MIT © [Nishant Kohli](https://github.com/nishkohli96)
