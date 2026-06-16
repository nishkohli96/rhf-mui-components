import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFSwitchPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const onValueChange = v4AndAbove
    ? PropsDescription.onValueChange_Switch
    : LegacyPropsDescription.onValueChange_Switch_v2_v3;

  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1 ? [PropsDescription.registerOptions] : []),
    ...(v4AndAbove ? [PropsDescription.customOnChange_Cbx_Switch] : []),
    ...(!v1
      ? [
        onValueChange,
        getPropDetailsByVersion(PropsDescription.label, {
          docsVersion,
          muiVersion
        })
      ]
      : [LegacyPropsDescription.label_v1, LegacyPropsDescription.label_v1]),
    getPropDetailsByVersion(PropsDescription.formControlLabelProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion })]
      : []
    ),
    ...(!v1
      ? [
        getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
        ...(!v4AndAbove
          ? [getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion })]
          : []
        ),
        PropsDescription.hideErrorMessage,
        getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
          docsVersion,
          muiVersion
        })
      ]
      : []),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFSwitchPropsTable;
