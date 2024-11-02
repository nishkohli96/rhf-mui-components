import { MenuItem, Typography } from '@mui/material';
import { ParsedCountry, FlagImage } from 'react-international-phone';

type RenderCountryProps = {
  country: ParsedCountry;
};

const RenderCountry = ({ country }: RenderCountryProps) => (
  <MenuItem value={country.iso2}>
    <FlagImage iso2={country.iso2} style={{ marginRight: '8px' }} />
    <Typography marginRight="8px">{country.name}</Typography>
    <Typography color="gray">+{country.dialCode}</Typography>
  </MenuItem>
);

export default RenderCountry;
