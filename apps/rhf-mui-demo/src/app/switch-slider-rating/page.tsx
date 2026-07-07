import {
  ContentContainer,
  LinksList,
  PageHeading,
  SubHeading
} from '@/components';
import {
  pageMetadata,
  componentsDocsLink,
  ValidationLibLinks
} from '@/constants';
import SliderSwitchRatingFormWithSuperstruct from '@/forms/slider-switch-rating-with-superstruct/Client';

export const metadata = pageMetadata.switchSliderRating;

const SwitchSliderRatingFormPage = () => {
  const docsLinks = [
    componentsDocsLink.rhfSwitch,
    componentsDocsLink.rhfSlider,
    componentsDocsLink.rhfRating,
    ValidationLibLinks.superstruct
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <SliderSwitchRatingFormWithSuperstruct />
      <LinksList links={docsLinks} />
    </ContentContainer>
  );
};

export default SwitchSliderRatingFormPage;
