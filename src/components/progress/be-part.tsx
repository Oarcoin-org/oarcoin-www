import IllustratedBanner from "@/components/illustrated-banner";
import {
  BE_PART_BANNER_BODY,
  BE_PART_BANNER_CTA,
  BE_PART_BANNER_TITLE,
} from "@/lib/constants";

const BePartOfOurProgress = () => {
  return (
    <IllustratedBanner
      title={BE_PART_BANNER_TITLE}
      body={BE_PART_BANNER_BODY}
      leftIllustration="/assets/illustrations/stairs-left.svg"
      rightIllustration="/assets/illustrations/stairs-right.svg"
      cta={BE_PART_BANNER_CTA}
    />
  );
};

export default BePartOfOurProgress;
