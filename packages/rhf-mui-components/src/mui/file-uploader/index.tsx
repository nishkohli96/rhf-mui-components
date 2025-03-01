import { useContext, Fragment, ReactNode, ChangeEvent } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import {
	FormLabelProps,
	FormHelperTextProps,
	FileInputProps
} from '@/types';
import {
  fieldNameToLabel,
  getFileSize,
  keepLabelAboveFormField
} from '@/utils';
import UploadButton from './UploadButton';
import HiddenInput from './HiddenInput';

export type RHFFileUploaderProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  onValueChange?: (
    value: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  helperText?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  renderUploadButton?: (fileInput: ReactNode) => ReactNode;
} & FileInputProps;

const RHFFileUploader = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  renderUploadButton,
  multiple,
  disabled,
  accept = '*',
  ...rest
}: RHFFileUploaderProps<T>) => {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field }) => {
          const { value, onChange, ...otherFieldParams } = field;
          const removeFile = (index: number) => {
            if (multiple) {
              const newFiles = value.filter(
                (_: File, i: number) => i !== index
              );
              onChange(newFiles);
            } else {
              onChange(null);
            }
          };
          const FileInput = () => (
            <HiddenInput
              type="file"
              accept={accept}
              onChange={(event) => {
                const fileList = event.target.files;
                if (fileList && fileList.length > 0) {
                  onChange(multiple ? Array.from(fileList) : fileList[0]);
                }
              }}
              multiple={multiple}
              disabled={disabled}
              {...otherFieldParams}
            />
          );
          return (
            <Fragment>
              {renderUploadButton ? (
                renderUploadButton(<FileInput />)
              ) : (
                <UploadButton
                  fieldName={fieldName}
                  disabled={disabled}
                  multiple={multiple}
                >
                  <FileInput />
                </UploadButton>
              )}
              <FormHelperText
                error={isError}
                errorMessage={errorMessage}
                hideErrorMessage={hideErrorMessage}
                helperText={helperText}
                formHelperTextProps={formHelperTextProps}
              />
              <Box>
                {value &&
                  (Array.isArray(value) ? value : [value]).map(
                    (file: File, index) => (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography>
                          {file.name} ({getFileSize(file.size)})
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeFile(index)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )
                  )}
              </Box>
            </Fragment>
          );
        }}
      />
    </FormControl>
  );
};

export default RHFFileUploader;
