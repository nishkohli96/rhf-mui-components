import type { ComponentType, InputHTMLAttributes, RefAttributes } from 'react';
import { styled } from '@mui/material/styles';

const HiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
}) as ComponentType<
  InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>
>;

export default HiddenInput;
