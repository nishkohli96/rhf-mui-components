import Link from '@docusaurus/Link';

type HomePageButtonProps = {
  text: string;
  href: string;
  bgColor: string;
};

const HomePageButton = ({ text, href, bgColor }: HomePageButtonProps) => {
  return (
    <Link
      className="button button--lg"
      to={href}
      style={{ backgroundColor: bgColor }}
    >
      {text}
    </Link>
  );
};

export default HomePageButton;
