import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, ValidationLibLinks } from '@/constants';
import { SwitchSliderRatingFormWithSuperstruct } from '@/forms';

const title = 'Switch, Slider & Rating with Superstruct validation';
const description = 'RHFSwitch, RHFSlider & RHFRating';

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
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <SwitchSliderRatingFormWithSuperstruct />
      <LinksList links={links} />
    </ContentContainer>
  );
}
