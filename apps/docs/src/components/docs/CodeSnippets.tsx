'use client';

/**
 * Collapsible, copyable source viewers for the reusable `Styled*` components
 * used on this page. Each snippet is read and syntax-highlighted at build time
 * (see `page.tsx`) with the same shiki config as the MDX pipeline, then rendered
 * here inside a `.doc-code-block` so it inherits the site's code-block styling.
 * All accordions are collapsed by default.
 */

import { type ReactNode, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

export type ComponentSnippet = {
  /** File name shown as the accordion title. */
  title: string;
  /** Raw source, copied to the clipboard. */
  code: string;
  /** shiki-highlighted HTML rendered in the code block. */
  html: string;
};

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* Clipboard unavailable (permissions/insecure context) — ignore. */
    }
  };

  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy code'} placement="left">
      <IconButton
        size="small"
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
        className="doc-code-copy"
      >
        {copied
          ? <CheckIcon fontSize="inherit" />
          : <ContentCopyIcon fontSize="inherit" />}
      </IconButton>
    </Tooltip>
  );
};

type CodeSnippetsProps = {
  title: ReactNode;
  description: ReactNode;
  snippets: ComponentSnippet[];
};

const CodeSnippets = ({
  title,
  description,
  snippets
}: CodeSnippetsProps) => {
  return (
    <Box
      sx={{
        mt: 4,
        /* The accordion is the container, so drop the code block's own frame. */
        '& .doc-code-block': { m: 0, border: 0, borderRadius: 0 }
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
      {snippets.map(snippet => (
        <Accordion key={snippet.title} disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
              <CodeIcon fontSize="small" color="action" />
              <Typography sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                {snippet.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <div className="doc-code-block">
              <CopyButton code={snippet.code} />
              <div dangerouslySetInnerHTML={{ __html: snippet.html }} />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CodeSnippets;
