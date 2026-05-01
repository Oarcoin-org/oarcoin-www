import { Heading } from "../heading";
import PageHero from "../page-hero";

const ProgressHero = () => {
  return (
    <PageHero
      title={
        <Heading
          text="OAR Progress"
          highlightWords={[{ text: "Oarcoin", className: "text-primary" }]}
        />
      }
      description="OAR is not built behind closed doors.It evolves in the open through participation, usage, and continuous development."
      backgroundImage="/assets/hero/pillars.svg"
    />
  );
};

export default ProgressHero;
