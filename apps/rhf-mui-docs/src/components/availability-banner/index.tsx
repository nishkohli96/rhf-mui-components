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
    <Alert severity="info">
      {`${componentName} is available from version`}
      {' '}
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
