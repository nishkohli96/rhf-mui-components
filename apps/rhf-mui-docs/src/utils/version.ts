import { type PropsInfo } from '@site/src/types';

export function getPropDetailsByVersion(
  prop: PropsInfo | ((version: number) => PropsInfo),
  version: number
): PropsInfo {
  return typeof prop === 'function' ? prop(version) : prop;
}
