export type DocsVersion = 1 | 2 | 3;
export type MuiVersion = 5 | 6 | 7;
export type MuiXVersion = 6 | 7 | 8;

export type VersionProps = {
  docsVersion?: DocsVersion;
  muiVersion?: MuiVersion;
  muiXVersion?: MuiXVersion;
  v1?: boolean;
  v2?: boolean;
  v3_1AndAbove?: boolean;
  v3_2AndAbove?: boolean;
  v3_3AndAbove?: boolean;
  v4AndAbove?: boolean;
};

export type PropsDescriptionArgs = Pick<VersionProps, 'docsVersion' | 'muiVersion'>;