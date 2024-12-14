import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks, ValidationLibLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/switch-slider-rating-with-superstruct'), { ssr: false });

const title = 'Switch, Slider & Rating with Superstruct validation';
const description = 'Form utilizing RHFSwitch, RHFSlider & RHFRating components with validation managed by Superstruct.';

export const metadata: Metadata = {
  title,
  description
};

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
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <ClientForm />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default SwitchSliderRatingFormPage;
