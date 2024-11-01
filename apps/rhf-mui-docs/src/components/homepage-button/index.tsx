import Link from '@docusaurus/Link';
import Grid from '@mui/material/Grid';

type HomePageButtonProps = {
  text: string;
  href: string;
  bgColor: string;
	align: 'flex-start' | 'center' | 'flex-end'
};

const HomePageButton = ({ text, href, bgColor, align }: HomePageButtonProps) => {
  const isCenterbtn = align === 'center';
	return (
    <Grid
      item
      xs={12}
      md={4}
			lg={isCenterbtn ? 2 : 5}
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', md: align }
      }}
    >
      <Link
        className="button button--lg"
        to={href}
        style={{ backgroundColor: bgColor }}
      >
        {text}
      </Link>
    </Grid>
  );
};

export default HomePageButton;
