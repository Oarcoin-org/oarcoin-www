import { DIRECTORY } from "@/lib/constants";

import PageHero from "../page-hero";
import SubmitProjectDialog from "./submit-project-dialog";

const DirectoryHero = () => {
  const { hero } = DIRECTORY;

  return (
    <PageHero
      title={hero.title}
      description={hero.description}
      backgroundImage={hero.backgroundImage}
      actions={<SubmitProjectDialog />}
    />
  );
};

export default DirectoryHero;
