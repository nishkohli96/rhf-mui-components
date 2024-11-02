import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {
  CountryData,
  FlagImage,
  parseCountry,
} from 'react-international-phone';

type RenderCountryProps = {
  country: CountryData
}

const RenderCountry = ({ country }: RenderCountryProps) => {
  const countryDetails = parseCountry(country);
  return (
    <MenuItem key={countryDetails.iso2} value={countryDetails.iso2}>
      <FlagImage
        iso2={countryDetails.iso2}
        style={{ marginRight: '8px' }}
      />
      <Typography marginRight="8px">
        {countryDetails.name}
      </Typography>
      <Typography color="gray">
        +
        {countryDetails.dialCode}
      </Typography>
    </MenuItem>
  );
};

export default RenderCountry;

