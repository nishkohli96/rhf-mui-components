import Alert from '@mui/material/Alert';

type AvailabilityBannerProps = {
  componentName: string;
  version: string;
}

const AvailabilityBanner = ({
  componentName,
  version
}: AvailabilityBannerProps) => {
  return (
    <Alert severity="info" sx={{ mb: '20px' }}>
      <b>{componentName}</b>
      {` is available from version `}
      <span>
        <b>
          {version}
        </b>
      </span>
      {' '}
      and above.
    </Alert>
  );
};

export default AvailabilityBanner;
