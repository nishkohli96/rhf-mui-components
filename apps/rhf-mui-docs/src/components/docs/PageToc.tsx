'use client';

import { useLayoutEffect, useState } from 'react';

type TocItem = {
  id: string;
  text: string;
  level: number;
};

/**
 * MUI-docs-style "Contents" rail. Scans the rendered article for h2/h3
 * headings after mount (works for any page — MDX or TSX) and highlights
 * the section currently in view. Pure navigation aid: page content itself
 * is server-rendered, so SEO does not depend on this component.
 *
 * Uses `useLayoutEffect`, not `useEffect`: the scan needs the real DOM
 * (headings aren't known ahead of render), but running it in `useEffect`
 * means the browser paints the article first with an empty Contents rail,
 * then pops the links in once the effect fires — a visible flash on every
 * load. `useLayoutEffect` runs synchronously before paint, so the rail is
 * already populated by the time anything is shown on screen.
 */
const PageToc = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>();

  useLayoutEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.doc-article h2[id], .doc-article h3[id]'
      )
    );

    /**
     * One-time read from an external system (the rendered article DOM) — the
     * heading list can't be known during render, so this synchronous setState
     * on mount is the sanctioned use of an effect, not a cascading-render bug.
     */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(
      headings.map(heading => ({
        id: heading.id,
        /* Strip the trailing "#" of the hover anchor from the label. */
        text: (heading.textContent ?? '').replace(/#\s*$/, '').trim(),
        level: heading.tagName === 'H2' ? 2 : 3
      }))
    );

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      /* Treat a heading as active while it sits in the upper viewport. */
      { rootMargin: '-90px 0px -70% 0px' }
    );
    headings.forEach(heading => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  /*
   * The <nav> is always rendered (even while `items` is empty pre-scan) so
   * its layout column is reserved from the very first paint. If it returned
   * null until the client-side scan ran, the article would render full-width
   * on the server, then reflow narrower once the TOC appeared — the visible
   * "content jumps, links pop in" flash. Reserving the column keeps the
   * article width stable; only the links themselves fade in.
   */
  return (
    <nav className="doc-toc" aria-label="Page contents">
      {items.length > 0 && (
        <>
          <p className="doc-toc-title">Contents</p>
          <ul>
            {items.map(item => (
              <li
                key={item.id}
                className={[
                  item.level === 3 ? 'doc-toc-sub' : '',
                  item.id === activeId ? 'doc-toc-active' : ''
                ].join(' ').trim()}
              >
                <a href={`#${item.id}`}>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
};

export default PageToc;
