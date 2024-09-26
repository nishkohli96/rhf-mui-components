import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ContentContainer, PageHeading, SubHeading } from "@/components";

const title = "TextField & PasswordInput";
const description =
  "Form utilizing RHFTextField and RHFPasswordInput with validation managed via react-hook-form's register options.";

const ClientForm = dynamic(
  () => import("@/forms/inputs-with-register-options"),
  { ssr: false }
);

export const metadata: Metadata = {
  title,
  description,
};

export default function TextFieldPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description} />
      <ClientForm />
    </ContentContainer>
  );
}
