import Box from '@mui/material/Box';

type RootLayoutProps = {
  children: React.ReactNode;
};


export default function DemoLayout({ children }: RootLayoutProps) {
  return (
    <Box sx={{ p: '30px 20px' }}>
      {children}
    </Box>
  );
}
