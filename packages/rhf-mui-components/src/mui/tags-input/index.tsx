import {
  ReactNode,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  useState,
  useContext
} from 'react';
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
import { FormControl, FormLabel, FormLabelText, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps, ChipProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';

type TextFieldInputProps = Omit<
  TextFieldProps,
  | 'name'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'error'
  | 'multiline'
  | 'rows'
  | 'minRows'
  | 'maxRows'
>

export type RHFTagsInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (tags: string[]) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  chipProps?: ChipProps;
} & TextFieldInputProps;

const RHFTagsInput = <T extends FieldValues>({
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
  chipProps,
  disabled,
  sx: muiTextFieldSx,
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

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    let newTag: string | null = null;
    if (event.key === 'Enter') {
      event.stopPropagation();
      newTag = inputValue;
      setInputValue('');
    }
    return newTag;
  };

  const handlePaste = (
    event: ClipboardEvent<HTMLDivElement>,
    values: string[]
  ) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text');
    const newTags = pasteData
      .split(/[\s,]+/)
      .filter(tag => tag.trim() && !values.includes(tag.trim()));
    return ([...values, ...newTags]);
  };

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
          const { value = [], onChange, ...otherFieldParams } = field;
          const triggerChangeEvents = (fieldValue: string[]) => {
            onChange(fieldValue);
            onValueChange?.(fieldValue);
          }

          return (
            <MuiTextField
              autoComplete={fieldName}
              label={
                !isLabelAboveFormField ? (
                  <FormLabelText label={fieldLabel} required={required} />
                ) : undefined
              }
              value={inputValue}
              onChange={event => handleInputChange(event)}
              onKeyDown={event => {
                const newTag = handleKeyPress(event);
                if (newTag) {
                  triggerChangeEvents([...value, newTag]);
                }
              }}
              onPaste={event => {
                triggerChangeEvents(handlePaste(event, value));
              }}
              disabled={disabled}
              sx={{
                ...muiTextFieldSx,
                /**
                 * Applying this rule ensures that the Tags always remain
                 * above the input, otherwise there would be a 50% width
                 * occupancy of tags and input area, which would feel very
                 * awkward to the user. Similarly, padding for InputBase has
                 * been set to zero, so that the size remain consistent when
                 * comparing it side-by-side with other fields.
                 */
                '& .MuiInputBase-root': {
                  display: 'flex',
                  flexDirection: 'column',
                  padding: theme =>
                    `${theme.spacing(2)} ${theme.spacing(1.75)}`,
                  backgroundColor: 'pink'
                },
                '& .MuiInputBase-input': {
                  padding: 0
                }
              }}
              InputProps={{
                startAdornment: (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      ...(value.length > 0 && { mb: 1 }),
                      width: '100%'
                    }}
                  >
                    {value.map((val, idx) => (
                      <Chip
                        key={idx}
                        label={val}
                        disabled={disabled}
                        onDelete={() => {
                          const tagsList = value.filter(item => item !== val);
                          onChange(tagsList);
                        }}
                        {...chipProps}
                      />
                    ))}
                  </Box>
                )
              }}
              {...rest}
              {...otherFieldParams}
            />
          );
        }}
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
