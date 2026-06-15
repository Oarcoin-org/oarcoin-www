import DotPageHeader from "@/components/dot-page-header";
import { RESERVE } from "@/lib/constants";

const ReserveHero = () => {
  const { hero } = RESERVE;

  return (
    <DotPageHeader title={hero.title} description={hero.description} />
  );
};

export default ReserveHero;
