import {
  ContentContainer,
  LinksList,
  PageHeading,
  SubHeading
} from '@/components';
import {
  pageMetadata,
  componentsDocsLink,
  SourceCodeLinks,
  CodeSandboxLinks,
  ValidationLibLinks
} from '@/constants';
import SwitchSliderRatingFormWithSuperstruct from '@/forms/switch-slider-rating-with-superstruct/Client';

export const metadata = pageMetadata.switchSliderRating;

const SwitchSliderRatingFormPage = () => {
  const links = [
    componentsDocsLink.rhfSwitch,
    componentsDocsLink.rhfSlider,
    componentsDocsLink.rhfRating,
    ValidationLibLinks.superstruct
  ];
  const codeLinks = [
    SourceCodeLinks.switchSliderRating,
    CodeSandboxLinks.switchSliderRating
  ];
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <SwitchSliderRatingFormWithSuperstruct />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default SwitchSliderRatingFormPage;
