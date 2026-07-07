import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { type PageInfo } from '@/types';

type LinksListProps = {
  links: PageInfo[];
};

const LinksList = ({ links }: LinksListProps) => {
  return (
    <Box sx={{ mt: '20px' }}>
      <Typography color="secondary" variant="h6" sx={{ mb: '10px' }}>
        DOCUMENTATION 📖
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
};

export default LinksList;
