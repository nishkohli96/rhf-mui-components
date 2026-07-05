import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { pageMetadata } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/switch-slider-rating-with-superstruct'), { ssr: false });


export const metadata = pageMetadata.switchSliderRating;

const SwitchSliderRatingFormPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
    </ContentContainer>
  );
};

export default SwitchSliderRatingFormPage;
