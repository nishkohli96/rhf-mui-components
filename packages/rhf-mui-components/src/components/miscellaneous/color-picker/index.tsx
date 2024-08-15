import { ReactNode } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { ColorPicker as ReactColorPicker, IColor, useColor } from 'react-color-palette';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig } from '../../../types';
import { fieldNameToLabel } from '../../../utils';
import 'react-color-palette/css';

export type RHFColorPickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
	height?: number;
	hideAlpha?: boolean;
	hideInput?: (keyof IColor)[] | boolean;
	defaultValue?: string;
	onValueChange?: (color: IColor) => void;
  disabled?: boolean;
	errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
	label?: ReactNode;
  showLabelAboveFormField?: boolean;
	formLabelProps?: Omit<FormLabelProps, 'error'>;
	helperText?: ReactNode;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
};

function ColorPicker<T extends FieldValues>({
  fieldName,
	defaultValue,
  onValueChange,
	hideInput,
  disabled,
	errorMessage,
	hideErrorMessage,
	label,
  showLabelAboveFormField,
	formLabelProps,
	helperText,
	formHelperTextProps,
  defaultFormLabelSx,
  defaultFormHelperTextSx,
  ...otherProps
}: RHFColorPickerProps<T> & RHFMuiConfig) {
  const [color, setColor] = useColor(defaultValue ?? '#000000');
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
	const isError = Boolean(errorMessage);

  const handleColorChange = (color: IColor) => {
    if (!disabled) {
      setColor(color);
      onValueChange && onValueChange(color);
    }
  };

  return (
    <FormControl error={isError}>
			<FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        error={isError}
        formLabelProps={formLabelProps}
        defaultFormLabelSx={defaultFormLabelSx}
      />
      <ReactColorPicker
        color={color}
        onChange={handleColorChange}
        hideInput={disabled ? true : hideInput}
				{...otherProps}
      />
			<FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        defaultFormHelperTextSx={defaultFormHelperTextSx}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
}

export const RHFColorPicker = withConfigHOC(ColorPicker);