'use client';

/**
 * Collapsible, copyable presentation for a set of already-resolved code
 * snippets (source + shiki-highlighted HTML). All accordions are collapsed
 * by default. Split out from `CodeSnippets` so the async, filesystem-reading
 * part of that component can stay a Server Component while this stays
 * interactive (`useState` for the copy button, MUI `Accordion` state).
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

/** A snippet with source and highlighted markup already resolved. */
export type ResolvedSnippet = {
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

type CodeSnippetsViewProps = {
  title?: ReactNode;
  description?: ReactNode;
  snippets: ResolvedSnippet[];
};

const CodeSnippetsView = ({
  title,
  description,
  snippets
}: CodeSnippetsViewProps) => {
  return (
    <Box
      sx={{
        mt: 4,
        /* The accordion is the container, so drop the code block's own frame. */
        '& .doc-code-block': { m: 0, border: 0, borderRadius: 0 },
        /* Cap long snippets so collapsing the accordion doesn't require scrolling far up. */
        '& .doc-code-block pre': { maxHeight: 480, overflowY: 'auto' }
      }}
    >
      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
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

export default CodeSnippetsView;
