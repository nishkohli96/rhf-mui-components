import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { PageInfo } from '@/types';

type LinksListProps = {
  links: PageInfo[];
  showCode?: boolean;
};

export function LinksList({ links, showCode }: LinksListProps) {
  const title = showCode ? 'Source Code' : 'Related Links';
  return (
    <Box sx={{ mt: '20px' }}>
      <Typography color="secondary" variant="h6" sx={{ mb: '15px' }}>
        {title.toUpperCase()}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {links.map(link => (
          <Link href={link.href} key={link.title} target="_blank">
            {link.title}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
