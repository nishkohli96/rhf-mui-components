import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import {
  pageMetadata,
  DocsLinks,
  SourceCodeLinks,
  CodeSandboxLinks,
  ValidationLibLinks
} from '@/constants';

// const ClientForm = dynamic(() => import('@/forms/switch-slider-rating-with-superstruct'), { ssr: false });

export const metadata = pageMetadata.switchSliderRating;

const SwitchSliderRatingFormPage = () => {
  const links = [
    DocsLinks.rhfSwitch,
    DocsLinks.rhfSlider,
    DocsLinks.rhfRating,
    ValidationLibLinks.superstruct
  ];
  const codeLinks = [
    SourceCodeLinks.switchSliderRating,
    CodeSandboxLinks.switchSliderRating
  ];
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      {/* <ClientForm /> */}
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default SwitchSliderRatingFormPage;
