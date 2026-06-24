import { type PropsInfo, type PropsDescriptionArgs } from '@site/src/types';

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
