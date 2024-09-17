import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, ValidationLibLinks } from '@/constants';
import { SelectFormWithClassValidator } from '@/forms';

const title = 'Select with Class-Validator';
const description = 'RHFSelect & RHFNativeSelect form fields with class-validator resolver from @hookform/resolvers/class-validator';

export const metadata: Metadata = {
  title,
  description
};

export default function SelectWithClassValidatorPage() {
  const links = [
    DocsLinks.rhfSelect,
    DocsLinks.rhfNativeSelect,
    ValidationLibLinks.classValidator
  ];

  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <SelectFormWithClassValidator />
      <LinksList links={links} />
    </ContentContainer>
  );
}
