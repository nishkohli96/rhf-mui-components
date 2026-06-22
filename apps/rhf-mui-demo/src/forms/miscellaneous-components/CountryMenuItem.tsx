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
			<Typography color="gray">
				{`+${country.dialCode}`}
			</Typography>
			<Typography marginLeft="8px">
				{country.iso2.toUpperCase()}
			</Typography>
		</>
	);
};

export default CountryMenuItem;
