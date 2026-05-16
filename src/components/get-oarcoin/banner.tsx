import IllustratedBanner from "@/components/illustrated-banner";
import { GET_OARCOIN_BANNER_BODY, GET_OARCOIN_BANNER_TITLE } from "@/lib/constants";

const Banner = () => {
  return (
    <IllustratedBanner
      title={GET_OARCOIN_BANNER_TITLE}
      body={GET_OARCOIN_BANNER_BODY}
      leftIllustration="/assets/illustrations/hand-left.svg"
      rightIllustration="/assets/illustrations/hand-right.svg"
    />
  );
};

export default Banner;
