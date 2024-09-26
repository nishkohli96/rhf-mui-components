import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ContentContainer, PageHeading, SubHeading } from "@/components";

const ClientForm = dynamic(() => import("@/forms/date-time-pickers"), {
  ssr: false,
});

const title = "Date & Time Pickers";
const description =
  "A form using RHFDatePicker, RHFTimePicker & RHFDateTimePicker components.";

export const metadata: Metadata = {
  title,
  description,
};

export default function DateTimePickerFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description} />
      <ClientForm />
    </ContentContainer>
  );
}
