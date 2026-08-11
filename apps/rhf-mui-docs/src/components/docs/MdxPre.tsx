'use client';

import {
  useId,
  useRef,
  useSyncExternalStore,
  type ComponentPropsWithoutRef
} from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

/**
 * Shared "which block is currently copied" store.
 *
 * The copied checkmark persists until a *different* block is copied, so only
 * one block ever shows as copied at a time. Because each code block renders its
 * own independent `MdxPre`, that single-active state lives in a module-level
 * store the instances subscribe to via `useSyncExternalStore` — no context
 * provider needed around the MDX content.
 */
let activeCopyId: string | null = null;
const copyListeners = new Set<() => void>();

function setActiveCopyId(id: string | null) {
  activeCopyId = id;
  copyListeners.forEach(listener => listener());
}

function subscribeActiveCopyId(listener: () => void) {
  copyListeners.add(listener);
  return () => copyListeners.delete(listener);
}

/**
 * Frame for fenced code blocks in .mdx pages. Shiki has already highlighted
 * the code on the server (VS Code Dark+ palette, inline colors) — this only
 * adds the floating copy button, reading the text straight from the DOM.
 */
const MdxPre = (props: ComponentPropsWithoutRef<'pre'>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blockId = useId();
  const activeId = useSyncExternalStore(
    subscribeActiveCopyId,
    () => activeCopyId,
    () => null
  );
  const copied = activeId === blockId;

  const handleCopy = async () => {
    const code = wrapperRef.current?.querySelector('pre')?.innerText ?? '';
    try {
      await navigator.clipboard.writeText(code);
      /* Mark this block as the single active copy; clears any previous one. */
      setActiveCopyId(blockId);
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
