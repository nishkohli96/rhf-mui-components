import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ContentContainer, PageHeading, SubHeading } from "@/components";

const ClientForm = dynamic(
  () => import("@/forms/switch-slider-rating-with-superstruct"),
  { ssr: false }
);

const title = "Switch, Slider & Rating with Superstruct validation";
const description =
  "Form utilizing RHFSwitch, RHFSlider & RHFRating components with validation managed by Superstruct.";

export const metadata: Metadata = {
  title,
  description,
};

export default function SwitchSliderRatingFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description} />
      <ClientForm />
    </ContentContainer>
  );
}
