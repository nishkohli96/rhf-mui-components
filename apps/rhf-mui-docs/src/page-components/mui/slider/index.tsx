import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFSliderPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const binding = !v1
    ? PropsDescription.control
    : LegacyPropsDescription.register;

  const tableRows = [
    PropsDescription.fieldName,
    binding,
    PropsDescription.registerOptions,
    ...(!v1 ? [PropsDescription.required] : []),
    ...(v4AndAbove ? [PropsDescription.customOnChange_Slider] : []),
    ...(!v1
      ? [
        ...(v4AndAbove ? [PropsDescription.onValueChange_Slider] : [LegacyPropsDescription.onValueChange_Slider_v2_v3]),
        getPropDetailsByVersion(PropsDescription.label, {
          docsVersion,
          muiVersion
        })
      ]
      : [
        LegacyPropsDescription.defaultValue_Slider,
        LegacyPropsDescription.onValueChange_Slider_v1,
        LegacyPropsDescription.label_v1
      ]),
    PropsDescription.showLabelAboveFormField_Default,
    getPropDetailsByVersion(PropsDescription.formLabelProps, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    ...(!v4AndAbove ? [getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion })] : [] ),
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

export default RHFSliderPropsTable;
