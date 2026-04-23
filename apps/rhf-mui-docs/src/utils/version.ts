import {
  type PropsInfo,
  type DocsVersion,
  type MuiVersion,
  PropsDescriptionArgs
} from '@site/src/types';

export function getPropDetailsByVersion(
  prop:
    | PropsInfo
    | (({ docsVersion, muiVersion }: PropsDescriptionArgs) => PropsInfo),
  { docsVersion, muiVersion }: PropsDescriptionArgs
): PropsInfo {
  return typeof prop === 'function'
    ? prop({ docsVersion, muiVersion })
    : prop;
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
