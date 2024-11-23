import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { VersionProps } from '@site/src/types';

const RHFSelectPropsTable = ({ v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 
      ? [PropsDescription.control]
      : [PropsDescription.register]
    ),
    PropsDescription.registerOptions,
    PropsDescription.options,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    ...(!v1 
      ? []
      : [PropsDescription.defaultValue]
    ),
    PropsDescription.showDefaultOption,
    PropsDescription.defaultOptionText,
    ...(!v1 
      ? [PropsDescription.onValueChange_Select]
      : [PropsDescription.onValueChange_Select_v1]
    ),
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return (
    <MarkdownTable rows={tableRows} showType/>
  );
};

export default RHFSelectPropsTable;
