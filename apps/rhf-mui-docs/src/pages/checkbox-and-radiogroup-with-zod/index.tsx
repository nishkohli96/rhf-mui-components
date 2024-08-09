// import { PageHeading, SubHeading } from '@/components';
import { CheckboxRadioZodForm } from '@site/src/forms';

// const title = 'CheckboxGroup & RadioGroup with Zod Validation';
// const description = 'RHFCheckbox, RHFCheckboxGroup & RHFRadioGroup form fields with zod validation from @hookform/resolvers/zod'

// export const metadata: Metadata = {
// 	title,
//   description
// };

export default function CheckboxRadioZodFormPage() {
  return (
    <main>
      {/* <PageHeading title={title} />
      <SubHeading title={description}/> */}
      <CheckboxRadioZodForm />
    </main>
  );
}
