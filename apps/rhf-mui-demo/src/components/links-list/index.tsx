import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

type LinksListProps = {
  links: Array<{
    title: string;
    href: string;
  }>;
};

export function LinksList({ links }: LinksListProps) {
  return (
    <Box sx={{ mt: '20px' }}>
      <Typography color="secondary" variant="h6" sx={{ mb: '15px' }}>
        RELATED LINKS
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {links.map((link) => (
          <Link href={link.href} key={link.title} target="_blank">
            {link.title}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
