import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks, ValidationLibLinks } from '@/constants';
import { SwitchSliderRatingFormWithSuperstruct } from '@/forms';

const title = 'Switch, Slider & Rating with Superstruct validation';
const description = 'Form utilizing RHFSwitch, RHFSlider & RHFRating components with validation managed by Superstruct.';

export const metadata: Metadata = {
  title,
  description
};

export default function SwitchSliderRatingFormPage() {
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
      <SwitchSliderRatingFormWithSuperstruct />
      <LinksList links={codeLinks} areCodeLinks />
      <LinksList links={links} />
    </ContentContainer>
  );
}
