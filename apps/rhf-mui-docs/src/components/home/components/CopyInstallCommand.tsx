'use client';

import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { CopyCodeIcon } from '@/components/buttons';

type CopyInstallCommandProps = {
  command: string;
};

const CopyInstallCommand = ({ command }: CopyInstallCommandProps) => {
  const [copied, setCopied] = useState(false);

  return (
    <Tooltip
      title={copied ? 'Copied!' : 'Copy code'}
      placement="right"
    >
      <IconButton
        size="small"
        aria-label={copied ? 'Copied to clipboard' : 'Copy install command'}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch {
          /* Clipboard unavailable (unfocused tab / permissions) — ignore. */
          }
        }}
        sx={{
          mx: 1,
          p: 1,
          color: 'text.secondary'
        }}
      >
        <CopyCodeIcon isCopied={copied} />
      </IconButton>
    </Tooltip>
  );
};

export default CopyInstallCommand;
