import { useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getFileSize } from '@nish1896/rhf-mui-components/form-helpers';

type FilePreviewItemProps = {
  file: File;
  index: number;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function FilePreviewItem({
  file,
  index,
  onRemove
}: FilePreviewItemProps) {
  const previewUrl = useMemo(
		() => URL.createObjectURL(file),
    [file]
  );
	console.log('previewUrl: ', previewUrl);

  useEffect(() => {
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: 96
      }}
    >
      <IconButton
        size="small"
        onClick={onRemove}
        sx={{
          position: 'absolute',
          top: -8,
          right: -8,
          zIndex: 1,
          bgcolor: 'background.paper',
          boxShadow: 1,
          '&:hover': {
            bgcolor: 'background.paper'
          }
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <Stack spacing={1}>
        <Box
          component="img"
          src={previewUrl}
          alt={file.name}
          sx={{
            width: 96,
            height: 96,
            objectFit: 'cover',
            borderRadius: 1,
            border: theme => `1px solid ${theme.palette.divider}`
          }}
        />
        <Typography
          variant="caption"
          textAlign="center"
          sx={{
            wordBreak: 'break-word'
          }}
        >
          {file.name}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
        >
          {getFileSize(file.size, { precision: 2 })}
        </Typography>
      </Stack>
    </Box>
  );
}
