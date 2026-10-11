'use client';

import { useLayoutEffect, useState } from 'react';

type TocItem = {
  id: string;
  text: string;
  /** 2-4 for h2-h4 headings; 0 for a prop row of the API table. */
  level: number;
};

const API_ID = 'api';

/**
 * MUI-docs-style "Contents" rail. Scans the rendered article for h2/h3/h4
 * headings (plus the prop rows of the API table, shown as a collapsible
 * list under "API") after mount (works for any page — MDX or TSX) and highlights
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
  const [apiOpen, setApiOpen] = useState(true);

  useLayoutEffect(() => {
    /*
     * Prop rows count only inside the API section: other tables (e.g. the
     * "Working" table on Getting Started) reuse PropsTable but have no "API"
     * entry to group them under.
     */
    let currentH2: string | undefined;
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.doc-article h2[id], .doc-article h3[id], .doc-article h4[id], .doc-article tr[id^="prop-"]'
      )
    ).filter(element => {
      if (element.tagName === 'H2') {
        currentH2 = element.id;
      }
      return element.tagName !== 'TR' || currentH2 === API_ID;
    });

    /**
     * One-time read from an external system (the rendered article DOM) — the
     * heading list can't be known during render, so this synchronous setState
     * on mount is the sanctioned use of an effect, not a cascading-render bug.
     */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(
      headings.map(heading => {
        if (heading.tagName === 'TR') {
          return {
            id: heading.id,
            text: heading.querySelector('code')?.textContent ?? heading.id,
            level: 0
          };
        }
        return {
          id: heading.id,
          /* Strip the trailing "#" of the hover anchor from the label. */
          text: (heading.textContent ?? '').replace(/#\s*$/, '').trim(),
          level: Number(heading.tagName.slice(1))
        };
      })
    );
    /* Deep link to a prop: open the list so its entry is visible. */
    if (window.location.hash.startsWith('#prop-')) {

      setApiOpen(true);
    }

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
  const hasProps = items.some(item => item.level === 0);

  return (
    <nav className="doc-toc" aria-label="Page contents">
      {items.length > 0 && (
        <>
          <p className="doc-toc-title">Contents</p>
          <ul>
            {items.map(item => {
              const isProp = item.level === 0;
              if (isProp && !apiOpen) {
                return null;
              }
              const isApi = item.id === API_ID && hasProps;
              return (
                <li
                  key={item.id}
                  className={[
                    item.level === 3 ? 'doc-toc-sub' : '',
                    item.level === 4 ? 'doc-toc-sub2' : '',
                    isProp ? 'doc-toc-prop' : '',
                    isApi ? 'doc-toc-api' : '',
                    item.id === activeId ? 'doc-toc-active' : ''
                  ].join(' ').trim()}
                >
                  <a href={`#${item.id}`}>
                    {item.text}
                  </a>
                  {isApi && (
                    <button
                      type="button"
                      className="doc-toc-toggle"
                      aria-expanded={apiOpen}
                      aria-label={apiOpen ? 'Collapse props' : 'Expand props'}
                      onClick={() => setApiOpen(open => !open)}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </nav>
  );
};

export default PageToc;
