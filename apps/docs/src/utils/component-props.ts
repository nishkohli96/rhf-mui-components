import type { PropsInfo, PropsDescriptionArgs } from '@/types';

/**
 * Versioned MUI docs URLs — every entry below that links to material-ui or
 * MUI X api docs is a function accepting `PropsDescriptionArgs`, so bumping
 * `muiVersion`/`muiPickersVersion` (passed in from `props-table/index.ts`)
 * is the only change needed when v2 targets a newer MUI release.
 */
export const getMuiDocsUrl = (muiVersion?: PropsDescriptionArgs['muiVersion']) =>
  `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui`;

export const getMuiPickersDocsUrl = (muiPickersVersion?: PropsDescriptionArgs['muiPickersVersion']) =>
  `https://${muiPickersVersion ? `v${muiPickersVersion}.` : ''}mui.com/x/api/date-pickers`;

/** Resolves a `PropsDescription` entry, invoking it with version args when it's a function. */
export function resolveProp(
  entry: PropsInfo | ((args: PropsDescriptionArgs) => PropsInfo),
  args: PropsDescriptionArgs
): PropsInfo {
  return typeof entry === 'function' ? entry(args) : entry;
}
