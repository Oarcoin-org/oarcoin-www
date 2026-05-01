import { Heading } from "../heading";
import PageHero from "../page-hero";

const HowDoesItWorkHero = () => {
  return (
    <PageHero
      title={
        <Heading
          text="How does Oarcoin work?"
          highlightWords={[{ text: "Oarcoin", className: "text-primary" }]}
        />
      }
      backgroundImage="/assets/hero/settings.svg"
    />
  );
};

export default HowDoesItWorkHero;
