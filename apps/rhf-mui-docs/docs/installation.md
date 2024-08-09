---
sidebar_position: 3
sidebar_label: Installation
description: How to install this package using npm or yarn?
title: Installation
---

# Installation

:::note
In case you are upgrading to eslint **v9 or above** , please check the [migration guide](./migration/eslint-8_to_9.md).

If you are using eslint v8 and are migrating from `v1.0.x`, please check [this guide](./migration/v1_to_v2.md).
:::

You'll first need to install [ESLint](https://eslint.org/). If you project is a monorepo, consider creating a separate eslint-config for each package.

Please do refer the official docs to [install eslint](https://eslint.org/docs/latest/use/getting-started) if needed.

### Eslint 9 and above

```js
npm i eslint --save-dev
```
```
yarn add -D eslint
```

Next, install `@nish1896/eslint-flat-config`.

```
npm install @nish1896/eslint-flat-config  --save-dev
```
```
yarn add -D @nish1896/eslint-flat-config
```

### Eslint 8

We will be installing **v8.57.0** which was the last major version prior to the release of version 9.

```
npm i eslint@8.57.0 --save-dev
```
```
yarn add -D eslint@8.57.0
```

Next, install `@nish1896/eslint-config`.

```
npm install @nish1896/eslint-config  --save-dev
```
```
yarn add -D @nish1896/eslint-config
```


Add *"lint"* command to your `package.json` file.

```
npm pkg set scripts.lint="eslint --fix ."
```

After that, you can run ESLint on any file or directory like this:

```
npx eslint yourfile.js
```

```
yarn run eslint yourfile.js
```
:::info
This config extends the following plugins and parsers - 
- [eslint](https://www.npmjs.com/package/eslint) - 9.8.0 & 8.57.0
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) - 7.35.0
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) - 4.6.2
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) - 6.9.0
- [@stylistic/eslint-plugin](https://www.npmjs.com/package/@stylistic/eslint-plugin) - 2.6.1
- [typescript-eslint](https://www.npmjs.com/package/typescript-eslint) - 8.0.1
:::

**You may also choose to install other eslint plugins or configurations depending upon your application needs.** 

- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)
- [eslint-plugin-json](https://www.npmjs.com/package/eslint-plugin-json)
- [eslint-plugin-jsonc](https://www.npmjs.com/package/eslint-plugin-jsonc)
- [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)
- [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise)