import { useMemo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '@site/src/styles/theme';
import Layout from '@theme/Layout';

function MuiRoot({ children }) {
  const { colorMode } = useColorMode();
  console.log('colorMode: ', colorMode);
  const muiTheme = useMemo(() => createTheme(getTheme(colorMode)), [colorMode]);
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

      {/* <MuiRoot> */}
			
			{/* </MuiRoot> */}
    {/* </Layout> */}

function AppRoot({ children }) {
  return (
		<>
			{children}
		</>
    // <Layout
    //   title={`Hello from`}
    //   description="Description will go into a meta tag in <head />"
    // >
  );
}

export default AppRoot;
