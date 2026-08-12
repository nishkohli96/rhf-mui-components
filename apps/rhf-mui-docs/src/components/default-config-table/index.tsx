import { defaultLibConfig } from '@/constants';

/** Pretty-prints an `sx`-style object as `{ key: value, key: value }`. */
function formatSxValue(value: Record<string, unknown>): string {
  const entries = Object.entries(value);
  if (entries.length === 0) {
    return '{}';
  }
  return `{ ${entries.map(([key, val]) => `${key}: ${JSON.stringify(val)}`).join(', ')} }`;
}

/**
 * Renders `defaultLibConfig` — the built-in `sx` defaults every component
 * falls back to before `ConfigProvider` overrides are applied.
 */
const DefaultConfigTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            {defaultLibConfig.header.propName}
          </th>
          <th>
            {defaultLibConfig.header.defaultValue}
          </th>
        </tr>
      </thead>
      <tbody>
        {defaultLibConfig.options.map(option => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label -- false positive: row cells are plain visible text (`<code>{...}</code>`), just nested one level deeper than the rule's default depth-2 check reaches
          <tr key={option.key}>
            <td>
              <code>
                {option.key}
              </code>
            </td>
            <td>
              <code>
                {formatSxValue(option.value)}
              </code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DefaultConfigTable;
