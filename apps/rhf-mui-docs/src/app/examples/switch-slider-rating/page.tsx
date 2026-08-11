import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import SliderSwitchRatingForm from '@/forms/slider-switch-rating/Client';

export const metadata = pageMetadata.switchSliderRatingExample;

export default function SwitchSliderRatingFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <SliderSwitchRatingForm />
    </ContentContainer>
  );
}
