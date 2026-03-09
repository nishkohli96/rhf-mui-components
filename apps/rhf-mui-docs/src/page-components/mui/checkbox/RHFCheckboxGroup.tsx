import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFCheckboxGroupPropsTable = ({
  docsVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  let tableRows = [PropsDescription.fieldName, PropsDescription.control];
  if (v1) {
    tableRows = [
      ...tableRows,
      PropsDescription.options_StrOrObj,
      PropsDescription.labelKey,
      PropsDescription.valueKey,
      PropsDescription.onValueChange_CheckboxGroup_v1,
      PropsDescription.label_v1,
      PropsDescription.showLabelAboveFormField,
      getPropDetailsByVersion(PropsDescription.formLabelProps, docsVersion),
      PropsDescription.checkboxProps,
      getPropDetailsByVersion(PropsDescription.formControlLabelProps, docsVersion),
      PropsDescription.helperText,
      PropsDescription.errorMessage,
      PropsDescription.hideErrorMessage,
      getPropDetailsByVersion(PropsDescription.formHelperTextProps, docsVersion)
    ];
  } else {
    tableRows = [
      ...tableRows,
      PropsDescription.registerOptions,
      PropsDescription.options_StrOrObj,
      PropsDescription.labelKey,
      PropsDescription.valueKey,
      PropsDescription.required,
      ...(v4AndAbove ? [PropsDescription.customOnChange_CheckboxGroup] : []),
      PropsDescription.onValueChange_CheckboxGroup,
      PropsDescription.disabled,
      ...(v4AndAbove
        ? [PropsDescription.renderOption, PropsDescription.getOptionDisabled]
        : []),
      PropsDescription.label,
      PropsDescription.showLabelAboveFormField_Default,
      getPropDetailsByVersion(PropsDescription.formLabelProps, docsVersion),
      PropsDescription.checkboxProps,
      getPropDetailsByVersion(PropsDescription.formControlLabelProps, docsVersion),
      PropsDescription.helperText,
      PropsDescription.errorMessage,
      PropsDescription.hideErrorMessage,
      getPropDetailsByVersion(PropsDescription.formHelperTextProps, docsVersion)
    ];
  }

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFCheckboxGroupPropsTable;
