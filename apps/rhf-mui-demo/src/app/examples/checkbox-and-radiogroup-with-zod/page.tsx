import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { CheckboxRadioZodForm } from '@/forms';

const title = 'CheckboxGroup & RadioGroup with Zod Validation';
const description = 'RHFCheckbox, RHFCheckboxGroup & RHFRadioGroup form fields with zod validation from @hookform/resolvers/zod';

export const metadata: Metadata = {
  title,
  description
};

export default function CheckboxRadioZodFormPage() {
  const links = [
    {
      title: 'RHFCheckbox',
      href: 'https://rhf-mui-components.netlify.app/components/checkbox/RHFCheckbox'
    },
    {
      title: 'RHFCheckboxGroup',
      href: 'https://rhf-mui-components.netlify.app/components/checkbox/RHFCheckboxGroup'
    },
    {
      title: 'RHFRadioGroup',
      href: 'https://rhf-mui-components.netlify.app/components/input-controls/RHFRadioGroup'
    },
    {
      title: 'Zod',
      href: 'https://www.npmjs.com/package/zod'
    }
  ];
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <CheckboxRadioZodForm />
    </ContentContainer>
  );
}
