import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFCheckboxGroupPropsTable = ({ v1, v4AndAbove }: VersionProps) => {
  let tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control
  ];
  if (v1) {
    tableRows = [
      ...tableRows,
      PropsDescription.options_StrOrObj,
      PropsDescription.labelKey,
      PropsDescription.valueKey,
      PropsDescription.onValueChange_CheckboxGroup_v1,
      PropsDescription.label_v1,
      PropsDescription.showLabelAboveFormField,
      PropsDescription.formLabelProps,
      PropsDescription.checkboxProps,
      PropsDescription.formControlLabelProps,
      PropsDescription.helperText,
      PropsDescription.errorMessage,
      PropsDescription.hideErrorMessage,
      PropsDescription.formHelperTextProps
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
      PropsDescription.formLabelProps,
      PropsDescription.checkboxProps,
      PropsDescription.formControlLabelProps,
      PropsDescription.helperText,
      PropsDescription.errorMessage,
      PropsDescription.hideErrorMessage,
      PropsDescription.formHelperTextProps
    ];
  }

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFCheckboxGroupPropsTable;
