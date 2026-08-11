import MdxPre from './MdxPre';

export type PackageManagerTabsProps = {
  /**
   * Unique id for this block's radio group — must be distinct across every
   * `PackageManagerTabs` instance on the same page (there is no client JS
   * here to disambiguate at runtime).
   */
  id: string;
  /** Everything after the install verb, e.g. `"@nish1896/mui-components"`. */
  command: string;
};

const managers = [
  { key: 'npm', label: 'npm', prefix: 'npm install' },
  { key: 'yarn', label: 'yarn', prefix: 'yarn add' },
  { key: 'pnpm', label: 'pnpm', prefix: 'pnpm add' }
] as const;

/**
 * npm / yarn / pnpm install-command tabs. Pure CSS (radio inputs + the
 * structural `.pm-tab-*` sibling selectors in globals.css) — no client JS,
 * so this stays a Server Component and still works with JS disabled.
 */
const PackageManagerTabs = ({ id, command }: PackageManagerTabsProps) => (
  <div className="pm-tabs">
    {managers.map(({ key, label }) => (
      <input
        key={key}
        type="radio"
        name={id}
        id={`${id}-${key}`}
        className="pm-tab-input"
        aria-label={label}
        defaultChecked={key === 'npm'}
      />
    ))}
    <div className="pm-tab-list" role="tablist" aria-label="Package manager">
      {managers.map(({ key, label }) => (
        <label key={key} htmlFor={`${id}-${key}`}>
          {label}
        </label>
      ))}
    </div>
    <div className="pm-tab-panels">
      {managers.map(({ key, prefix }) => (
        <div key={key} className="pm-tab-panel">
          <MdxPre>
            <code>
              {prefix}
              {' '}
              {command}
            </code>
          </MdxPre>
        </div>
      ))}
    </div>
  </div>
);

export default PackageManagerTabs;
