import Link, { LinkProps } from 'next/link';
import Button from '@mui/material/Button';

type StyledLinkProps = LinkProps & { text: string; newTab?: boolean };

export function StyledLink({ text, newTab, ...otherProps }: StyledLinkProps) {
  return (
    <Link {...otherProps} target={newTab ? '_blank' : '_self'}>
      <span className="text-blue-500 underline">
        {text}
      </span>
    </Link>
  );
}

export function PageLink({
  text,
  ...otherProps
}: Omit<StyledLinkProps, 'newTab'>) {
  return (
    <Button
      variant="outlined"
      color="error"
      sx={{
        mr: '20px',
        mb: '20px',
        textTransform: 'none',
        borderWidth: 2
      }}
    >
      <Link {...otherProps}>
        <span className="text-red-400">
          {text}
        </span>
      </Link>
    </Button>
  );
}
