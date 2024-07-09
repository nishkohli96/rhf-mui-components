import { ColorPicker, IColor, useColor } from 'react-color-palette';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import 'react-color-palette/css';

type RHFColorPickerProps = {
  selectedColor: string;
  height?: number;
  disabled?: boolean;
  onUpdateColor(value: string): void;
};

export function RHFColorPicker({
  selectedColor,
  height,
  disabled,
  onUpdateColor
}: RHFColorPickerProps) {
  const [color, setColor] = useColor(selectedColor ?? '#381ec1fe');

  const handleColorChange = (color: IColor) => {
    if (!disabled) {
      setColor(color);
      onUpdateColor(color.hex);
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
        height={height ?? 150}
        hideInput={disabled ? true : ['rgb', 'hsv']}
      />
    </FormControl>
  );
}
