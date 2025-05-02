import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFSliderPropsTable = ({ v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [PropsDescription.register]),
    PropsDescription.registerOptions,
    ...(!v1
      ? [
        PropsDescription.required,
        PropsDescription.onValueChange_Slider,
        PropsDescription.label
      ]
      : [
        PropsDescription.defaultValue_Slider,
        PropsDescription.onValueChange_Slider_v1,
        PropsDescription.label_v1
      ]),
    PropsDescription.showLabelAboveFormField_Default,
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFSliderPropsTable;
