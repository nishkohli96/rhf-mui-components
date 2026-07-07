import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import {
  DocsLinks,
  pageMetadata,
  ValidationLibLinks
} from '@/constants';

const ClientForm = dynamic(() => import('@/forms/switch-slider-rating-with-superstruct'), { ssr: false });


export const metadata = pageMetadata.switchSliderRating;

const SwitchSliderRatingFormPage = () => {
  const links = [
    DocsLinks.rhfSwitch,
    DocsLinks.rhfSlider,
    DocsLinks.rhfRating,
    ValidationLibLinks.superstruct
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
      <LinksList links={links} />
    </ContentContainer>
  );
};

export default SwitchSliderRatingFormPage;
