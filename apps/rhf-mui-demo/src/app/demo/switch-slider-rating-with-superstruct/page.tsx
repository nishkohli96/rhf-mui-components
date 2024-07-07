import type { Metadata } from 'next';
import { PageHeading, SubHeading } from '@/components';
import { SwitchSliderRatingFormWithSuperstruct } from '@/forms';

const title = 'Switch, Slider & Rating with Superstruct validation';
const description = 'RHFSwitch, RHFSlider & RHFRating';
export const metadata: Metadata = {
	title,
  description
};

export default function SwitchSliderRatingFormPage() {
  return (
    <main>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <SwitchSliderRatingFormWithSuperstruct />
    </main>
  );
}
