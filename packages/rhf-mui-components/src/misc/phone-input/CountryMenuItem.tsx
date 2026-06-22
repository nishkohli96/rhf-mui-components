import Typography from '@mui/material/Typography';
import { FlagImage, type ParsedCountry } from 'react-international-phone';

type CountryMenuItemProps = {
  country: ParsedCountry;
};

const CountryMenuItem = ({ country }: CountryMenuItemProps) => {
  return (
    <>
      <FlagImage
        iso2={country.iso2}
        style={{ marginRight: '8px' }}
      />
      <Typography marginRight="8px">
        {country.name}
      </Typography>
      <Typography color="gray">
        {`+${country.dialCode}`}
      </Typography>
    </>
  );
};

export default CountryMenuItem;
