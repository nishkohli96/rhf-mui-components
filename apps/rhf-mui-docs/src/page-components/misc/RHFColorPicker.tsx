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
  const valueProps = !v1
    ? [
      PropsDescription.control,
      PropsDescription.registerOptions,
      ...(v4AndAbove ? [] : [LegacyPropsDescription.value_ColorPicker_v2_v3]),
      PropsDescription.valueKey_ColorPicker,
      PropsDescription.defaultColor,
      PropsDescription.excludeAlpha,
      PropsDescription.required,
      PropsDescription.onValueChange_ColorPicker,
      ...(v4AndAbove ? [PropsDescription.customOnChange_ColorPicker] : [])
    ]
    : [
      LegacyPropsDescription.value_ColorPicker_v1,
      LegacyPropsDescription.onValueChange_ColorPicker_v1
    ];

  const labelProp = !v1
    ? getPropDetailsByVersion(PropsDescription.label, {
      docsVersion,
      muiVersion
    })
    : LegacyPropsDescription.label_v1;

  const tableRows = [
    PropsDescription.fieldName,
    ...valueProps,
    PropsDescription.disabled,
    labelProp,
    PropsDescription.showLabelAboveFormField_Default,
    getPropDetailsByVersion(PropsDescription.formLabelProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove
      ? [
        getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion }),
        PropsDescription.renderError
      ]
      : [getPropDetailsByVersion(LegacyPropsDescription.errorMessage, { muiVersion })]
    ),
    ...(v4AndAbove ? [] : []),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFColorPickerPropsTable;
