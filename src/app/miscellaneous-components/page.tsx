import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ContentContainer, PageHeading, SubHeading } from "@/components";

const ClientForm = dynamic(() => import("@/forms/miscellaneous-components"), {
  ssr: false,
});

const title = "Miscellaneous Components";
const description =
  "Form demonstrating usage of external components like ColorPicker & RichTextEditor with react-hook-form.";

export const metadata: Metadata = {
  title,
  description,
};

export default function MiscellaneousComponentsFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description} />
      <ClientForm />
    </ContentContainer>
  );
}
