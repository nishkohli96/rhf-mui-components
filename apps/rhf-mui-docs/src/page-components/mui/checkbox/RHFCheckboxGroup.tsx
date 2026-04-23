import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFCheckboxGroupPropsTable = ({
  docsVersion,
  muiVersion,
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
      LegacyPropsDescription.label_v1,
      getPropDetailsByVersion(PropsDescription.showLabelAboveFormField, {
        muiVersion
      }),
      getPropDetailsByVersion(PropsDescription.formLabelProps, {
        docsVersion,
        muiVersion
      }),
      getPropDetailsByVersion(PropsDescription.checkboxProps, { muiVersion }),
      getPropDetailsByVersion(PropsDescription.formControlLabelProps, {
        docsVersion,
        muiVersion
      }),
      getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
      getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion }),
      PropsDescription.hideErrorMessage,
      getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
        docsVersion,
        muiVersion
      })
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
      getPropDetailsByVersion(PropsDescription.label, {
        docsVersion,
        muiVersion
      }),
      PropsDescription.showLabelAboveFormField_Default,
      getPropDetailsByVersion(PropsDescription.formLabelProps, {
        docsVersion,
        muiVersion
      }),
      getPropDetailsByVersion(PropsDescription.checkboxProps, { muiVersion }),
      getPropDetailsByVersion(PropsDescription.formControlLabelProps, {
        docsVersion,
        muiVersion
      }),
      getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
      getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion }),
      PropsDescription.hideErrorMessage,
      getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
        docsVersion,
        muiVersion
      })
    ];
  }

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFCheckboxGroupPropsTable;
