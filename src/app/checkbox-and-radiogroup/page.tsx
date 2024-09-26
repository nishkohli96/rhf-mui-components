import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ContentContainer, PageHeading, SubHeading } from "@/components";

const ClientForm = dynamic(
  () => import("@/forms/checkbox-and-radiogroup-with-zod"),
  { ssr: false }
);

const title = "CheckboxGroup & RadioGroup with Zod Validation";
const description =
  "Form utilizing RHFCheckbox, RHFCheckboxGroup & RHFRadioGroup components with validation managed by Zod.";

export const metadata: Metadata = {
  title,
  description,
};

export default function CheckboxRadioZodFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description} />
      <ClientForm />
    </ContentContainer>
  );
}
