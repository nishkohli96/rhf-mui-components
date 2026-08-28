'use client';

import {
  useState,
  useRef,
  type ComponentPropsWithoutRef
} from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

/**
 * Frame for fenced code blocks in .mdx pages. Shiki has already highlighted
 * the code on the server (VS Code Dark+ palette, inline colors) — this only
 * adds the floating copy button, reading the text straight from the DOM.
 */
const MdxPre = (props: ComponentPropsWithoutRef<'pre'>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = wrapperRef.current?.querySelector('pre')?.innerText ?? '';
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable (permissions/insecure context) — ignore. */
    }
  };

  return (
    <div ref={wrapperRef} className="doc-code-block">
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
      <pre {...props} />
    </div>
  );
};

export default MdxPre;
