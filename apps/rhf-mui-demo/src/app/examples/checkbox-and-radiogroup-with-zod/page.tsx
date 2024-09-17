import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, ValidationLibLinks } from '@/constants';
import { CheckboxRadioZodForm } from '@/forms';

const title = 'CheckboxGroup & RadioGroup with Zod Validation';
const description = 'RHFCheckbox, RHFCheckboxGroup & RHFRadioGroup form fields with zod validation from @hookform/resolvers/zod';

export const metadata: Metadata = {
  title,
  description
};

export default function CheckboxRadioZodFormPage() {
  const links = [
    DocsLinks.rhfCheckbox,
    DocsLinks.rhfCheckboxGroup,
    DocsLinks.rhfRadioGroup,
    ValidationLibLinks.zod
  ];
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <CheckboxRadioZodForm />
      <LinksList links={links} />
    </ContentContainer>
  );
}
