import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.25
      }}
    >
      <Typography variant="body1" color="text.secondary">
        Made with ❤️ by Nish
      </Typography>
    </Box>
  );
}
