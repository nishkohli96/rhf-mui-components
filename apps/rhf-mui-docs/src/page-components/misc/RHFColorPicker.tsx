import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropByDocsAndMuiVersion, getPropDetailsByVersion } from '@site/src/utils';

const RHFColorPickerPropsTable = ({ docsVersion, muiVersion, v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1
      ? [
        PropsDescription.control,
        PropsDescription.registerOptions,
        PropsDescription.value_ColorPicker,
        PropsDescription.valueKey_ColorPicker,
        PropsDescription.defaultColor,
        PropsDescription.excludeAlpha,
        PropsDescription.required,
        PropsDescription.onValueChange_ColorPicker
      ]
      : [
        PropsDescription.value_ColorPicker_v1,
        PropsDescription.onValueChange_ColorPicker_v1
      ]),
    PropsDescription.disabled,
    ...(!v1
      ? [getPropByDocsAndMuiVersion(
        PropsDescription.label,
        docsVersion,
        muiVersion
      ),]
      : [LegacyPropsDescription.label_v1]
    ),
    PropsDescription.showLabelAboveFormField_Default,
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    getPropDetailsByVersion(
      PropsDescription.helperText,
      muiVersion
    ),
    getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion),
    PropsDescription.hideErrorMessage,
    getPropByDocsAndMuiVersion(
      PropsDescription.formHelperTextProps,
      docsVersion,
      muiVersion
    )];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFColorPickerPropsTable;
