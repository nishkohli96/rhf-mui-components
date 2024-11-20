import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFPhoneInputPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.value_PhoneInput,
    PropsDescription.setValue,
    PropsDescription.onValueChange_PhoneInput,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
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

