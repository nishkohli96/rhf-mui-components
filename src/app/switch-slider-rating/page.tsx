import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import SliderSwitchRatingFormWithSuperstruct from '@/forms/slider-switch-rating-with-superstruct/Client';

export const metadata = pageMetadata.switchSliderRating;

const SwitchSliderRatingFormPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <SliderSwitchRatingFormWithSuperstruct />
    </ContentContainer>
  );
};

export default SwitchSliderRatingFormPage;
