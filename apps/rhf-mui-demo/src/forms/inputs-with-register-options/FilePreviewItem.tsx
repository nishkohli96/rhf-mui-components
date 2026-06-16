import { useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getFileSize } from '@nish1896/rhf-mui-components/form-helpers';

type FilePreviewItemProps = {
  file: File;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function FilePreviewItem({
  file,
  onRemove
}: FilePreviewItemProps) {
  const previewUrlRef = useRef<string | null>(null);

  const setImageRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }

      if (node) {
        const previewUrl = URL.createObjectURL(file);
        previewUrlRef.current = previewUrl;
        node.src = previewUrl;
      }
    },
    [file]
  );

  return (
    <Stack alignItems="center">
      <Box
        sx={{
          position: 'relative',
          width: 50,
          height: 50
        }}
      >
        <Box
          component="img"
          ref={setImageRef}
          alt={file.name}
          sx={{
            width: 50,
            height: 50,
            objectFit: 'cover',
            borderRadius: 1,
            border: (theme) => `1px solid ${theme.palette.divider}`
          }}
        />

        <IconButton
          size="small"
          onClick={onRemove}
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
            zIndex: 1,
            width: 20,
            height: 20,
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': {
              bgcolor: 'background.paper'
            }
          }}
        >
          <CloseIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>
      <Typography
        variant="caption"
        textAlign="center"
        sx={{ wordBreak: 'break-word', fontWeight: 600 }}
      >
        {file.name}
      </Typography>
      <Typography variant="caption" color="text.secondary" textAlign="center">
        {getFileSize(file.size, { precision: 2 })}
      </Typography>
    </Stack>
  );
}
