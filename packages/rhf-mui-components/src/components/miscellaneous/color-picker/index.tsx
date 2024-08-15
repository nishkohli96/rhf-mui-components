import { ReactNode } from 'react';
import { ColorPicker, IColor, useColor } from 'react-color-palette';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import 'react-color-palette/css';

type RHFColorPickerProps = {
	height?: number;
	hideAlpha?: boolean;
	hideInput?: (keyof IColor)[] | boolean;
	defaultColor?: string;
	onValueChange?: (color: IColor) => void;
  disabled?: boolean;
	errorMsg?: ReactNode;
  hideErrorMsg?: boolean;
};

export function RHFColorPicker({
	defaultColor,
  onValueChange,
	hideInput,
  disabled,
  ...otherProps
}: RHFColorPickerProps) {
  const [color, setColor] = useColor(defaultColor ?? '#000000');

  const handleColorChange = (color: IColor) => {
    if (!disabled) {
      setColor(color);
      onValueChange && onValueChange(color);
    }
  };

  return (
    <FormControl fullWidth>
			<FormLabel>
				Color Picker 
			</FormLabel>
      <ColorPicker
        color={color}
        onChange={handleColorChange}
        hideInput={disabled ? true : hideInput}
				{...otherProps}
      />
    </FormControl>
  );
}
