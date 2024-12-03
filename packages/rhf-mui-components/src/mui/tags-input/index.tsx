import { ReactNode, KeyboardEvent, ChangeEvent, useState, useContext } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';

type TextFieldInputProps = Omit<
  TextFieldProps,
  | 'name'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'error'
>

export type RHFTagsInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    value: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  maxTags?: number;
} & TextFieldInputProps;

const RHFTagsInput = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  maxTags,
  ...rest
}: RHFTagsInputProps<T>) => {
  const [inputValue, setInputValue] = useState('');
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  const handleKeyPress = (
    event: KeyboardEvent<HTMLTextAreaElement>,
    onChange: (tags: string[]) => void,
    value: string[]
  ) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      if (!value.includes(inputValue.trim())) {
        const updatedTags = [...value, inputValue.trim()];
        if (!maxTags || updatedTags.length <= maxTags) {
          onChange(updatedTags);
        }
      }
      setInputValue('');
    }
  };

  const handleDelete = (tag: string, onChange: (tags: string[]) => void, value: string[]) => {
    const updatedTags = value.filter(item => item !== tag);
    onChange(updatedTags);
  };

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { value = [], onChange, ...otherFieldProps } }) => (
          <Box>
            {label && (
              <Box component="label">
                {label}
              </Box>
            )}
            <MuiTextField
              {...otherFieldProps}
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              onKeyDown={e => handleKeyPress(e, onChange, value)}
              fullWidth
              multiline
              error={!!errorMessage}
              helperText={errorMessage || helperText}
            />
            <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
              {value.map((tag: string) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDelete(tag, onChange, value)}
                />
              ))}
            </Box>
          </Box>
        )}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFTagsInput;
