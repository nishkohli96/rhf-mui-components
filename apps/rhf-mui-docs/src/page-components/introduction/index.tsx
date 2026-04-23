import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import {
  getPropDetailsByVersion,
  getPropByDocsAndMuiVersion
} from '@site/src/utils';

const IntroductionPageTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(v1 ? [LegacyPropsDescription.register] : []),
    PropsDescription.control,
    PropsDescription.registerOptions,
    ...(!v1
      ? [PropsDescription.required, PropsDescription.disabled]
      : [LegacyPropsDescription.setValue]),
    ...(v4AndAbove ? [PropsDescription.customOnChange] : []),
    PropsDescription.onValueChange,
    ...(!v1
      ? [
        getPropByDocsAndMuiVersion(
          PropsDescription.label,
          docsVersion,
          muiVersion
        )
      ]
      : [LegacyPropsDescription.label_v1]),
    getPropDetailsByVersion(
      PropsDescription.showLabelAboveFormField,
      muiVersion
    ),
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, muiVersion)]
      : []),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    getPropByDocsAndMuiVersion(
      PropsDescription.formControlLabelProps,
      docsVersion,
      muiVersion
    ),
    getPropDetailsByVersion(PropsDescription.helperText, muiVersion),
    ...(v4AndAbove
      ? []
      : [getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion)]),
    PropsDescription.hideErrorMessage,
    getPropByDocsAndMuiVersion(
      PropsDescription.formHelperTextProps,
      docsVersion,
      muiVersion
    ),
    ...(v4AndAbove ? [PropsDescription.customIds] : []),
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} />;
};

export default IntroductionPageTable;
