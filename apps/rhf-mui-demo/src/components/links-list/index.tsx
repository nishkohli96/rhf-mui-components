import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { PageInfo } from '@/types';

type LinksListProps = {
  links: PageInfo[];
  areCodeLinks?: boolean;
};

export const LinksList = ({ links, areCodeLinks }: LinksListProps) => {
  const title = areCodeLinks ? 'Source Code </>' : 'Documentation 📖';
  return (
    <Box sx={{ mt: '20px', ...(areCodeLinks && { mb: '20px' }) }}>
      <Typography color="secondary" variant="h6" sx={{ mb: '10px' }}>
        {title.toUpperCase()}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
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
