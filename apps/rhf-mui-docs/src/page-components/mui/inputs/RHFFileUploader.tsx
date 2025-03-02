import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFFileUploaderPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
		PropsDescription.required,
		PropsDescription.accept_FileUploader,
		PropsDescription.multiple_FileUploader,
    PropsDescription.maxFiles,
		PropsDescription.maxSize_FileUploader,
		PropsDescription.showFileSize,
		PropsDescription.hideFileList,
    PropsDescription.onValueChange_FileUploader,
    PropsDescription.onUploadError,
		PropsDescription.renderUploadButton,
		PropsDescription.renderFileItem,
		PropsDescription.disabled,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.helperText,
    PropsDescription.formHelperTextProps,
		PropsDescription.fullWidth_FileUploader,
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFFileUploaderPropsTable;
