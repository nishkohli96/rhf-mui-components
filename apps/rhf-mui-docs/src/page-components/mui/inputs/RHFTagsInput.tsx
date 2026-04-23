import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFTagsInputPropsTable = ({
  muiVersion,
  docsVersion,
  v4AndAbove
}: VersionProps) => {
  const onValueChangeProp = v4AndAbove
    ? PropsDescription.onValueChange_tagsInput
    : LegacyPropsDescription.onValueChange_tagsInput_v2_v3;

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
    onValueChangeProp,
    getPropDetailsByVersion(PropsDescription.label, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.showLabelAboveFormField, {
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.formLabelProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion })]
      : []),
    getPropDetailsByVersion(PropsDescription.ChipProps, { muiVersion }),
    PropsDescription.limitTags,
    PropsDescription.getLimitTagsText,
    ...(!v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion })]
      : []),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return (
    <MarkdownTable
      rows={tableRows as PropsInfo[]}
      showType
    />
  );
};

export default RHFTagsInputPropsTable;
