import type { Metadata } from 'next';
import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { SwitchSliderRatingFormWithSuperstruct } from '@/forms';

const title = 'Switch, Slider & Rating with Superstruct validation';
const description = 'RHFSwitch, RHFSlider & RHFRating';
export const metadata: Metadata = {
  title,
  description
};

export default function SwitchSliderRatingFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <SwitchSliderRatingFormWithSuperstruct />
    </ContentContainer>
  );
}
