import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFColorPickerPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1
      ? [
        PropsDescription.control,
        PropsDescription.registerOptions,
        ...(v4AndAbove ? []: [PropsDescription.value_ColorPicker]),
        PropsDescription.valueKey_ColorPicker,
        PropsDescription.defaultColor,
        PropsDescription.excludeAlpha,
        PropsDescription.required,
        PropsDescription.onValueChange_ColorPicker,
        ...(v4AndAbove
          ? [PropsDescription.customOnChange_ColorPicker]
          : []
        )
      ]
      : [
        PropsDescription.value_ColorPicker_v1,
        PropsDescription.onValueChange_ColorPicker_v1
      ]),
    PropsDescription.disabled,
    ...(!v1
      ? [
        getPropDetailsByVersion(PropsDescription.label, {
          docsVersion,
          muiVersion
        })
      ]
      : [LegacyPropsDescription.label_v1]),
    PropsDescription.showLabelAboveFormField_Default,
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion })]
      : []
    ),
    getPropDetailsByVersion(PropsDescription.formLabelProps, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    ...(!v4AndAbove ?
      [getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion })]
      : []
    ),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFColorPickerPropsTable;
