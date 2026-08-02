import Typography from '@mui/material/Typography';
import { type CountryDetails } from '@/types';

type CountryMenuItemProps = {
  countryInfo: CountryDetails;
};

const CountryMenuItem = ({ countryInfo }: CountryMenuItemProps) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <Typography variant="h5" component="span">
      {countryInfo.emoji}
    </Typography>
    <Typography>
      {countryInfo.name}
    </Typography>
  </span>
);

export default CountryMenuItem;
