import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { githubRepoLink } from '@/constants';
import packageJson from '../../../../../packages/rhf-mui-components/package.json';

type ComponentSourceLinkProps = {
  /**
   * Path to the component's folder under packages/rhf-mui-components/src.
   * E.g. "mui/textfield".
   */
  path: string;
  /**
   * Set only on /v{N}/ (older) docs pages — links to the git tag that
   * version's line was last released at, instead of the current package
   * version tag.
   */
  versionTag?: string;
  /**
   * For "mui-pickers" components, navigate to the source directory (which
   * holds multiple picker variants), instead of `dir_path/index.tsx`.
   */
  isDateOrTimePicker?: boolean;
};

/**
 * Placed directly in a component's page.mdx (like <PropsTable>) under a
 * literal `## Source Code` heading — a server component, no route
 * introspection needed, since the caller already knows its own path. The
 * real MDX heading gets a real id via rehype-slug, so it shows up in the
 * page's "Contents" rail the same way every other section does.
 */
const ComponentSourceLink = ({
  path,
  versionTag,
  isDateOrTimePicker
}: ComponentSourceLinkProps) => {
  const ref = versionTag ?? `v${packageJson.version}`;
  const dirPath = `${githubRepoLink}/blob/${ref}/packages/rhf-mui-components/src/${path}`;
  const href = isDateOrTimePicker ? dirPath : `${dirPath}/index.tsx`;

  return (
    <Typography variant="body1" color="text.secondary">
      View the full implementation of this component on
      {' '}
      <MuiLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
      >
        GitHub
      </MuiLink>
      .
    </Typography>
  );
};

export default ComponentSourceLink;
