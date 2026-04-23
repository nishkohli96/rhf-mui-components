import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFRatingPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1
      ? [PropsDescription.registerOptions, PropsDescription.required]
      : []),
    ...(v4AndAbove ? [PropsDescription.customOnChange_Rating] : []),
    ...(!v1
      ? [
        PropsDescription.onValueChange_Rating,
        getPropDetailsByVersion(PropsDescription.label, {
          docsVersion,
          muiVersion
        }),
        PropsDescription.showLabelAboveFormField_Default
      ]
      : [
        PropsDescription.onValueChange_Rating_v1,
        LegacyPropsDescription.label_v1,
        PropsDescription.showLabelAboveFormField
      ]),
    getPropDetailsByVersion(PropsDescription.formLabelProps, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion }),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    })
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFRatingPropsTable;
