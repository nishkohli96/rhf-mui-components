# @nish1896/rhf-mui-components

![NPM Version](https://img.shields.io/npm/v/%40nish1896%2Frhf-mui-components)
![NPM Downloads](https://img.shields.io/npm/dt/%40nish1896%2Frhf-mui-components)
![NPM Downloads Per Month](https://img.shields.io/npm/dm/%40nish1896%2Frhf-mui-components?color=%23e0e063)
![GitHub Release Date - Published_At](https://img.shields.io/github/release-date/nishkohli96/rhf-mui-components)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0c4fc578-ed19-4a5a-a3cd-e59fedcdb689/deploy-status)](https://app.netlify.com/sites/rhf-mui-components/deploys)

**A suite of 20+ reusable mui components for react-hook-form to minimize your time and effort in creating forms**

## Features ✨

- Each component is fully functional with just 3-4 props — core logic handled internally.
- Style individual components or apply global styles via [ConfigProvider](https://rhf-mui-components.netlify.app/customization#configprovider).
- Includes well-configured unique components like [RichTextEditor](https://rhf-mui-components.netlify.app/components/misc/RHFRichTextEditor), [Country Select](https://rhf-mui-components.netlify.app/components/mui/RHFCountrySelect) and [Tags Input](https://rhf-mui-components.netlify.app/components/mui/RHFTagsInput), saving development time.
- Comprehensive docs showcasing multiple variations for each component.


## Explore and Get Started 🚀

### Documentation 📖
Access the full documentation for rhf-mui-components, including setup instructions, API references, and examples:

👉 [Documentation Site](https://rhf-mui-components.netlify.app/)

### Interactive Demos 🎮
Try out and experiment with the form components in a live environment:

👉 [Live Demo Examples](https://rhf-mui-components-examples.netlify.app/)

### Sample Apps 🛠️
Clone this repo to explore real-world usage of the package with [Next.js](https://nextjs.org/) and MUI [v5](https://v5.mui.com/material-ui/), [v6](https://v6.mui.com/material-ui/), and [v7](https://v7.mui.com/material-ui/). Each version is set up in its own example app for easy testing and comparison:

👉 [Cloneable Example Repo](https://github.com/nishkohli96/rhf-mui-examples)


## Setup
Run the setup script.

```bash
sh setup.sh
```

This will perform the following tasks:

- Install `node_modules` in workspace root
- Build the `@nish1896/rhf-mui-components` package.
- Link this package to `@nish1896/rhf-mui-demo` repo to test new and existing components

To apply any changes made to the package, rebuild it by running the command below:

```
yarn lib
```