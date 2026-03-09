import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion, getPropByDocsAndMuiVersion } from '@site/src/utils';

const IntroductionPageTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove,
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(v1 ? [PropsDescription.register] : []),
    PropsDescription.control,
    PropsDescription.registerOptions,
    ...(!v1
      ? [PropsDescription.required, PropsDescription.disabled]
      : [PropsDescription.setValue]),
    ...(v4AndAbove ? [PropsDescription.customOnChange] : []),
    PropsDescription.onValueChange,
    ...(!v1 ? [PropsDescription.label] : [PropsDescription.label_v1]),
    getPropDetailsByVersion(PropsDescription.showLabelAboveFormField, muiVersion),
    getPropByDocsAndMuiVersion(PropsDescription.formLabelProps, docsVersion, muiVersion),
    getPropByDocsAndMuiVersion(PropsDescription.formControlLabelProps, docsVersion, muiVersion),
    PropsDescription.helperText,
    getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion),
    PropsDescription.hideErrorMessage,
    getPropByDocsAndMuiVersion(PropsDescription.formHelperTextProps, docsVersion, muiVersion)
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} />;
};

export default IntroductionPageTable;
