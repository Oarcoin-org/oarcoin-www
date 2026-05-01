import { Heading } from "../heading";
import PageHero from "../page-hero";

const GetOarcoinHero = () => {
  return (
    <PageHero
      title={
        <Heading
          text="Where to buy Oarcoin"
          highlightWords={[{ text: "Oarcoin", className: "text-primary" }]}
        />
      }
      description="Oarcoin (OAR) is available for trading on decentralized exchanges. You can buy, sell, and trade OAR directly using your wallet, without intermediaries or centralized platforms."
      backgroundImage="/assets/hero/building.svg"
    />
  );
};

export default GetOarcoinHero;
