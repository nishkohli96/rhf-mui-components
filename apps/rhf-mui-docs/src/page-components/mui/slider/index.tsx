import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import {
  getPropByDocsAndMuiVersion,
  getPropDetailsByVersion
} from '@site/src/utils';

const RHFSliderPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [PropsDescription.register]),
    PropsDescription.registerOptions,
    ...(!v1 ? [PropsDescription.required] : []),
    ...(v4AndAbove ? [PropsDescription.customOnChange_Slider] : []),
    ...(!v1
      ? [
        PropsDescription.onValueChange_Slider,
        getPropByDocsAndMuiVersion(
          PropsDescription.label,
          docsVersion,
          muiVersion
        ),
      ]
      : [
        PropsDescription.defaultValue_Slider,
        PropsDescription.onValueChange_Slider_v1,
        PropsDescription.label_v1
      ]),
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
    )
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFSliderPropsTable;
