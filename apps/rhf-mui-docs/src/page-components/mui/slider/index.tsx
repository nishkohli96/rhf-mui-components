import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFSliderPropsTable = ({ docsVersion, v1, v4AndAbove }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [PropsDescription.register]),
    PropsDescription.registerOptions,
    ...(!v1 ? [PropsDescription.required] : []),
    ...(v4AndAbove ? [PropsDescription.customOnChange_Slider] : []),
    ...(!v1
      ? [PropsDescription.onValueChange_Slider, PropsDescription.label]
      : [
        PropsDescription.defaultValue_Slider,
        PropsDescription.onValueChange_Slider_v1,
        PropsDescription.label_v1
      ]),
    PropsDescription.showLabelAboveFormField_Default,
    getPropDetailsByVersion(PropsDescription.formLabelProps, docsVersion),
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, docsVersion)
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFSliderPropsTable;
