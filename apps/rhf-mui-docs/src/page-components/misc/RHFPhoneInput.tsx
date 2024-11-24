import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFPhoneInputPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.value_PhoneInput,
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

