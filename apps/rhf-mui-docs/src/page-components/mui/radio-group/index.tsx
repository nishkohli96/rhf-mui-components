import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import {
  getPropByDocsAndMuiVersion,
  getPropDetailsByVersion
} from '@site/src/utils';

const RHFRadioGroupPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1 ? [PropsDescription.registerOptions] : []),
    PropsDescription.options_StrOrObj,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    ...(!v1 ? [PropsDescription.required] : []),
    ...(v4AndAbove ? [PropsDescription.customOnChange_RadioGroup] : []),
    ...(!v1
      ? [
        PropsDescription.onValueChange_RadioGroup,
        PropsDescription.disabled,
        ...(v4AndAbove
          ? [
            PropsDescription.renderOption,
            PropsDescription.getOptionDisabled
          ]
          : []),
        getPropDetailsByVersion(PropsDescription.label, docsVersion)
      ]
      : [
        PropsDescription.onValueChange_CheckboxGroup_v1,
        PropsDescription.label_v1
      ]),
    PropsDescription.showLabelAboveFormField_Default,
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    getPropDetailsByVersion(PropsDescription.radioProps, muiVersion),
    getPropByDocsAndMuiVersion(
      PropsDescription.formControlLabelProps,
      docsVersion,
      muiVersion
    ),
    PropsDescription.helperText,
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

export default RHFRadioGroupPropsTable;
