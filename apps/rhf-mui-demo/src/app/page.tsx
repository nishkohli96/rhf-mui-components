import Typography from '@mui/material/Typography';
import { PageLinks } from '@/constants';
import { PageHeading, PageLink } from '@/components';

export default function Home() {
  return (
    <main>
      <PageHeading title="Hello from the Home Page of Next App !" />
      <Typography variant="body2" sx={{
        mb: '20px',
        mt: '30px'
      }}
      >
        Click on any of the links below to see their demo
      </Typography>
      {PageLinks.map((link, idx) => (
        <PageLink text={link.title} href={link.href} key={idx} />
      ))}
    </main>
  );
}
