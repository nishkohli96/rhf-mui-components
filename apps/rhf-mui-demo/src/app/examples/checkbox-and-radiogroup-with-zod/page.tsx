import type { Metadata } from 'next';
import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { CheckboxRadioZodForm } from '@/forms';

const title = 'CheckboxGroup & RadioGroup with Zod Validation';
const description = 'RHFCheckbox, RHFCheckboxGroup & RHFRadioGroup form fields with zod validation from @hookform/resolvers/zod';

export const metadata: Metadata = {
  title,
  description
};

export default function CheckboxRadioZodFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <CheckboxRadioZodForm />
    </ContentContainer>
  );
}
