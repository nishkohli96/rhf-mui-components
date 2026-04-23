import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFNumberInputPropsTable = ({
  docsVersion,
  muiVersion,
  v4AndAbove
}: VersionProps) => {
  const valueChangeProp = v4AndAbove
    ? PropsDescription.onValueChange_Inputs
    : LegacyPropsDescription.onValueChange_Inputs_v2_v3;

  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    ...(v4AndAbove ? [PropsDescription.customOnChange_Inputs] : []),
    valueChangeProp,
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
      ? [
        getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion }),
        PropsDescription.onlyIntegers,
        PropsDescription.nonNegative,
        PropsDescription.maxDecimalPlaces,
        PropsDescription.stepAmount
      ]
      : []),
    PropsDescription.showMarkers,
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

export default RHFNumberInputPropsTable;
