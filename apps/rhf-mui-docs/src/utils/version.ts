import { type PropsInfo, type DocsVersion, type MuiVersion } from '@site/src/types';

export function getPropDetailsByVersion(
  prop: PropsInfo | ((version: number) => PropsInfo),
  version: number
): PropsInfo {
  return typeof prop === 'function' ? prop(version) : prop;
}

export function getPropByDocsAndMuiVersion(
  prop:
    | PropsInfo
    | ((docsVersion?: DocsVersion, muiVersion?: MuiVersion) => PropsInfo),
  docsVersion?: DocsVersion,
  muiVersion?: MuiVersion
): PropsInfo {
  return typeof prop === 'function' ? prop(docsVersion, muiVersion) : prop;
}
