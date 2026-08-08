import { Fragment, type ReactNode } from 'react';
import type { PropsInfo } from '@/types';

/**
 * Matches the inline markdown constructs used by prop descriptions in
 * `constants/props-table`: [label](url), `code`, **bold**, _italic_.
 */
const inlineMdPattern
  = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|_[^_]+_)/g;
const linkPattern = /^\[([^\]]+)\]\(([^)]+)\)$/;

/** Renders a description/type string with minimal inline markdown support. */
const renderInlineMd = (text: string): ReactNode => (
  <Fragment>
    {text.split(inlineMdPattern).map((part, index) => {
      const link = part.match(linkPattern);
      if (link) {
        return (
          <a
            key={index}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link[1]}
          </a>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index}>
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('_') && part.endsWith('_')) {
        return (
          <em key={index}>
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    })}
  </Fragment>
);

type PropsTableProps = {
  /**
   * Table rows, one per component prop — compose them from
   * `componentProps` / `PropsDescription` in `constants/props-table`.
   */
  rows: PropsInfo[];
};

/**
 * API reference table for a component's props. Renders a plain server-side
 * `<table>` so it inherits the `.doc-article table` styles and stays fully
 * crawlable. Rows are typed `PropsInfo[]` maintained centrally, keeping prop
 * docs consistent across components and package versions.
 */
const PropsTable = ({ rows }: PropsTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.name}>
            <td>
              <code>
                {row.name}
              </code>
              {row.required && (
                <span
                  aria-label="required"
                  style={{
                    color: 'var(--mui-palette-error-main)',
                    marginLeft: 2,
                    fontWeight: 700
                  }}
                >
                  *
                </span>
              )}
            </td>
            <td>
              {row.hasLinkInType
                ? renderInlineMd(row.type)
                : (
                  <code>
                    {row.type}
                  </code>
                )}
            </td>
            <td>
              {row.description.split('\n\n').map((paragraph, index) => (
                <div key={index} style={index > 0 ? { marginTop: 6 } : undefined}>
                  {renderInlineMd(paragraph)}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropsTable;
