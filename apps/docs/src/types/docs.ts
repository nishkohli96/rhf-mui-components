/**
 * Shape of a single row in a component props table, so that they
 * can be maintained centrally and reused across doc pages and versions.
 *
 * `description` and `type` support inline markdown: `` `code` `` spans and
 * `[label](url)` links — rendered by the docs `PropsTable` component.
 * There is no separate "Default" column: when a prop has a default value,
 * state it as its own `\n\n`-separated line in `description` (e.g.
 * `'...control text.\n\n**Default:** \`false\`'`) — `PropsTable` renders
 * each `\n\n`-separated part as its own paragraph within the cell.
 */
export type PropsInfo = {
  name: string;
  description: string;
  type: string;
  required?: boolean;
  /** Set when `type` contains a markdown link instead of a plain code span. */
  hasLinkInType?: boolean;
};
