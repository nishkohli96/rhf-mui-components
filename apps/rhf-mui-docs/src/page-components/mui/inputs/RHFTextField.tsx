import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFTextFieldPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const binding = !v1
    ? PropsDescription.control
    : LegacyPropsDescription.register;

  let valueChange;
  if (v4AndAbove) {
    valueChange = PropsDescription.onValueChange_Inputs;
  } else if (v1) {
    valueChange = LegacyPropsDescription.label_v1;
  } else {
    valueChange = LegacyPropsDescription.onValueChange_Inputs_v2_v3;
  }

  const tableRows = [
    PropsDescription.fieldName,
    binding,
    PropsDescription.registerOptions,
    ...(v4AndAbove ? [PropsDescription.customOnChange_Inputs] : []),
    valueChange,
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
      : [
        getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion })
      ]),
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

export default RHFTextFieldPropsTable;
