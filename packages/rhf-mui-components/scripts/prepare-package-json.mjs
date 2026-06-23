/**
 * To prepare package for publishing on npm, we need to update
 * "exports" field from "./dist/*" to "./*". This script take care
 * of this.
 */
import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const replaceDistPath = value =>
  typeof value === 'string' ? value.replace('./dist/', './') : value;

const rewriteExports = exportsField => {
  if (typeof exportsField === 'string') {
    return replaceDistPath(exportsField);
  }

  if (Array.isArray(exportsField)) {
    return exportsField.map(rewriteExports);
  }

  if (exportsField && typeof exportsField === 'object') {
    return Object.fromEntries(
      Object.entries(exportsField).map(([key, value]) => [
        key,
        rewriteExports(value)
      ])
    );
  }

  return exportsField;
};

const publishPackageJson = {
  ...packageJson,
  main: './index.js',
  types: './index.d.ts',
  exports: rewriteExports(packageJson.exports)
};

delete publishPackageJson.scripts;
delete publishPackageJson.devDependencies;

fs.writeFileSync(
  'dist/package.json',
  `${JSON.stringify(publishPackageJson, null, 2)}\n`
);
