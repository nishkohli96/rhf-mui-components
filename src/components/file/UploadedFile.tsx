'use client';

import type { MouseEvent } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type UploadedFileProps = {
  file: File;
  onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function UploadedFile({
  file,
  onRemove
}: UploadedFileProps) {

  const handleOpenFile = () => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank', 'noopener,noreferrer');
    /**
		 * Give browser time to load the blob URL, and then revoke
		 * it to prevent memory leak.
		 */
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
    >
      <Typography
        component="button"
        type="button"
        onClick={handleOpenFile}
        sx={{
          border: 0,
          background: 'transparent',
          p: 0,
          color: 'primary.main',
          textDecoration: 'underline',
          textDecorationColor: 'primary.main',
          cursor: 'pointer',
          textAlign: 'left',
          font: 'inherit'
        }}
      >
        {file.name}
      </Typography>

      <IconButton
        size="small"
        aria-label={`Remove ${file.name}`}
        onClick={onRemove}
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
