'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';

type CopyInstallCommandProps = {
  command: string;
};

const CopyInstallCommand = ({ command }: CopyInstallCommandProps) => {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      size="small"
      variant="text"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          /* Clipboard unavailable (unfocused tab / permissions) — ignore. */
        }
      }}
      sx={{
        minWidth: 42,
        px: 1,
        color: 'text.secondary',
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'none'
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </Button>
  );
};

export default CopyInstallCommand;
