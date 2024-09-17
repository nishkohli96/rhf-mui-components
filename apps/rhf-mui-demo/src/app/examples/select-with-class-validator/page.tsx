import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { SelectFormWithClassValidator } from '@/forms';

const title = 'Select with Class-Validator';
const description = 'RHFSelect & RHFNativeSelect form fields with class-validator resolver from @hookform/resolvers/class-validator';

export const metadata: Metadata = {
  title,
  description
};

export default function SelectWithClassValidatorPage() {
  const links = [
    {
      title: 'RHFSelect',
      href: 'https://rhf-mui-components.netlify.app/components/select/RHFSelect'
    },
    {
      title: 'RHFNativeSelect',
      href: 'https://rhf-mui-components.netlify.app/components/select/RHFNativeSelect'
    },
    {
      title: 'Class Validator',
      href: 'https://www.npmjs.com/package/class-validator'
    }
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
