import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFRadioGroupPropsTable = ({ v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1 ? [PropsDescription.registerOptions] : []),
    PropsDescription.options_StrOrObj,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    ...(!v1
      ? [
        PropsDescription.required,
        PropsDescription.onValueChange_RadioGroup,
        PropsDescription.disabled,
        PropsDescription.label
      ]
      : [
        PropsDescription.onValueChange_CheckboxGroup_v1,
        PropsDescription.label_v1
      ]),
    PropsDescription.showLabelAboveFormField_Default,
    PropsDescription.formLabelProps,
    PropsDescription.radioProps,
    PropsDescription.formControlLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFRadioGroupPropsTable;
