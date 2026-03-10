import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropByDocsAndMuiVersion, getPropDetailsByVersion } from '@site/src/utils';

const RHFTagsInputPropsTable = ({
  muiVersion,
  docsVersion,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    ...(v4AndAbove
      ? [
        PropsDescription.onTagAdd,
        PropsDescription.onTagDelete,
        PropsDescription.onTagPaste,
        PropsDescription.delimiter,
        PropsDescription.maxTags
      ]
      : []),
    PropsDescription.onValueChange_tagsInput,
    getPropDetailsByVersion(PropsDescription.label, docsVersion),
    getPropDetailsByVersion(
      PropsDescription.showLabelAboveFormField,
      muiVersion
    ),
    ...(v4AndAbove ? [PropsDescription.hideLabel] : []),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    getPropDetailsByVersion(PropsDescription.ChipProps, muiVersion),
    PropsDescription.limitTags,
    PropsDescription.getLimitTagsText,
    getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion),
    PropsDescription.hideErrorMessage,
    getPropByDocsAndMuiVersion(
      PropsDescription.formHelperTextProps,
      docsVersion,
      muiVersion
    )
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFTagsInputPropsTable;
