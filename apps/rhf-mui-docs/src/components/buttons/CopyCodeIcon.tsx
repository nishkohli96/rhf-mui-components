import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CheckIcon from '@mui/icons-material/Check';

type CopyCodeIconProps = {
  isCopied: boolean;
};

export default function CopyCodeIcon({
  isCopied
}: CopyCodeIconProps) {
  return (
    <Box sx={{ position: 'relative', display: 'flex' }}>
      {isCopied
        ? <ContentPasteIcon fontSize="inherit" />
        : <ContentCopyIcon fontSize="inherit" />}
      {isCopied && (
        <CheckIcon
          fontSize="inherit"
          sx={{
            position: 'absolute',
            bottom: -4,
            right: -4,
            fontSize: 10,
            bgcolor: 'background.paper',
            color: 'success.main',
            borderRadius: '50%',
            boxShadow: 1
          }}
        />
      )}
    </Box>
  );
}
