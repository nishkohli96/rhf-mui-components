import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { VersionProps } from '@site/src/types';

const IntroductionPageTable = ({ v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(v1 ? [PropsDescription.register] : []),
    PropsDescription.control,
    PropsDescription.registerOptions,
    ...(!v1
      ? [PropsDescription.required, PropsDescription.disabled]
      : [PropsDescription.setValue]),
    PropsDescription.onValueChange,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.formControlLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return (
    <MarkdownTable rows={tableRows} />
  );
};

export default IntroductionPageTable;
