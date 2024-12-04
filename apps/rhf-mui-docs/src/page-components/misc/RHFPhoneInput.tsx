import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { VersionProps } from '@site/src/types';

const RHFPhoneInputPropsTable = ({ v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    ...(!v1 ? [PropsDescription.required]: []),
    PropsDescription.value_PhoneInput,
    PropsDescription.required,
    PropsDescription.onValueChange_PhoneInput,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps,
    PropsDescription.phoneInputProps
  ];

  return (
    <MarkdownTable rows={tableRows} showType/>
  );
};

export default RHFPhoneInputPropsTable;

