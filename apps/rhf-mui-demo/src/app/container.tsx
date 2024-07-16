'use client';

import { useContext } from 'react';
import { AppThemeContext } from '@/context/theme';
import { ThemeProvider } from '@mui/material/styles';

type ContentContainerProps = {
  children: React.ReactNode;
};

export default function ContentContainer({ children }: ContentContainerProps) {
	const { mode } = useContext(AppThemeContext);
	return (

	);
}