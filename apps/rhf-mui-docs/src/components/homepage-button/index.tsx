import Link from '@docusaurus/Link';
import Grid from '@mui/material/Grid';

type HomePageButtonProps = {
  text: string;
  href: string;
  bgColor: string;
};

const HomePageButton = ({ text, href, bgColor }: HomePageButtonProps) => {
  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        display: 'flex',
        justifyContent: 'center'
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
