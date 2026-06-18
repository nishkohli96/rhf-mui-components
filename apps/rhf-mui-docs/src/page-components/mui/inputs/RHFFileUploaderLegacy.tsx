import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFFileUploaderLegacyPropsTable = ({
	muiVersion,
	docsVersion,
	v2
}: VersionProps) => {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.control,
		PropsDescription.registerOptions,
		PropsDescription.required,
		...(!v2
			? [PropsDescription.accept_FileUploader]
			: [PropsDescription.accept_FileUploader_v2]),
		PropsDescription.multiple_FileUploader,
		PropsDescription.maxFiles,
		PropsDescription.maxSize_FileUploader,
		PropsDescription.showFileSize,
		PropsDescription.hideFileList,
		PropsDescription.onValueChange_FileUploader,
		PropsDescription.onUploadError,
		getPropDetailsByVersion(PropsDescription.renderUploadButton, {
			docsVersion
		}),
		getPropDetailsByVersion(PropsDescription.renderFileItem, { docsVersion }),
		PropsDescription.disabled,
		getPropDetailsByVersion(PropsDescription.label, {
			docsVersion,
			muiVersion
		}),
		getPropDetailsByVersion(PropsDescription.showLabelAboveFormField, {
			muiVersion
		}),
		getPropDetailsByVersion(PropsDescription.formLabelProps, {
			docsVersion,
			muiVersion
		}),
		PropsDescription.hideErrorMessage,
		getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
		getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
			docsVersion,
			muiVersion
		}),
		PropsDescription.fullWidth_FileUploader
	];

	return (
		<MarkdownTable
			rows={tableRows as PropsInfo[]}
			showType
		/>
	);
};

export default RHFFileUploaderLegacyPropsTable;
