import Banner from "@/components/get-oarcoin/banner";
import GetOarcoinHero from "@/components/get-oarcoin/hero";
import HowItWorks from "@/components/get-oarcoin/how-it-works";
import Uniswap from "@/components/get-oarcoin/uniswap";

const WhereToBuyOarcoin = () => {
  return (
    <main>
      <GetOarcoinHero />
      <Uniswap />
      <HowItWorks />
      <Banner />
    </main>
  );
};

export default WhereToBuyOarcoin;
