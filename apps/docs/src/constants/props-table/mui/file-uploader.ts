import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';

/** Props reference rows for `MUIFileUploader`. */
const fileUploaderRows = (args: PropsDescriptionArgs): PropsInfo[] => [
  P.fieldName,
  P.value_FileUploader,
  P.onValueChange_FileUploader,
  P.accept,
  P.multiple_FileUploader,
  P.maxSize,
  P.maxFiles,
  P.onUploadError,
  P.fullWidth_FileUploader,
  P.dropZoneProps,
  P.disableDragAndDrop,
  P.renderUploadButton,
  P.existingFiles,
  P.renderExistingFileIte,
  P.renderFileItem,
  P.existingFileListProps,
  P.uploadedFileListProps,
  P.inputRef_FileUploader,
  P.label,
  resolveProp(P.showLabelAboveFormField, args),
  resolveProp(P.formLabelProps, args),
  P.hideLabel,
  P.required,
  P.errorMessage,
  P.renderError,
  P.hideErrorMessage,
  resolveProp(P.helperText, args),
  resolveProp(P.formHelperTextProps, args),
  P.customIds
];

export default fileUploaderRows;
