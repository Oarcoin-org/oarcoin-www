import { Heading } from "../heading";
import PageHero from "../page-hero";

const GettingStartedHero = () => {
  return (
    <PageHero
      title={
        <Heading
          text="Getting Started with Oarcoin"
          highlightWords={[{ text: "Oarcoin", className: "text-primary" }]}
        />
      }
      description="Using Oarcoin to transact is easy and accessible to everyone"
      backgroundImage="/assets/hero/people.svg"
    />
  );
};

export default GettingStartedHero;
