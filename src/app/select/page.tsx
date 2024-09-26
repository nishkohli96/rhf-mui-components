import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ContentContainer, PageHeading, SubHeading } from "@/components";

const ClientForm = dynamic(
  () => import("@/forms/select-with-class-validator"),
  { ssr: false }
);

const title = "Select with Class-Validator";
const description =
  "Form utilizing RHFSelect and RHFNativeSelect with validation managed using class-validator.";

export const metadata: Metadata = {
  title,
  description,
};

export default function SelectWithClassValidatorPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description} />
      <ClientForm />
    </ContentContainer>
  );
}
