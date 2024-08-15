import { ReactNode } from 'react';
import { ColorPicker as ReactColorPicker, IColor, useColor } from 'react-color-palette';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig } from '../../../types';
import 'react-color-palette/css';

export type RHFColorPickerProps = {
	height?: number;
	hideAlpha?: boolean;
	hideInput?: (keyof IColor)[] | boolean;
	defaultColor?: string;
	onValueChange?: (color: IColor) => void;
  disabled?: boolean;
	errorMsg?: ReactNode;
  hideErrorMsg?: boolean;
	formLabel?: ReactNode;
	formLabelProps?: Omit<FormLabelProps, 'error'>;
	helperText?: ReactNode;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
};

function ColorPicker({
	defaultColor,
  onValueChange,
	hideInput,
  disabled,
	errorMsg,
	hideErrorMsg,
	formLabel,
	formLabelProps,
	helperText,
	formHelperTextProps,
  defaultFormLabelSx,
  defaultFormHelperTextSx,
  ...otherProps
}: RHFColorPickerProps & RHFMuiConfig) {
  const [color, setColor] = useColor(defaultColor ?? '#000000');
	const isError = Boolean(errorMsg);

  const handleColorChange = (color: IColor) => {
    if (!disabled) {
      setColor(color);
      onValueChange && onValueChange(color);
    }
  };

  return (
    <FormControl error={isError}>
			<FormLabel
        label={formLabel}
        isVisible={Boolean(formLabel)}
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
        errorMsg={errorMsg}
        hideErrorMsg={hideErrorMsg}
        helperText={helperText}
        defaultFormHelperTextSx={defaultFormHelperTextSx}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
}

export const RHFColorPicker = withConfigHOC(ColorPicker);