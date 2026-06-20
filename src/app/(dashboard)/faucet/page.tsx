import FaucetDashboard from "@/components/faucet/dashboard";
import FaucetHero from "@/components/faucet/hero";
import FaucetTasks from "@/components/faucet/tasks";
import JsonLd from "@/components/seo/json-ld";
import { ROUTES } from "@/lib/constants";
import { getFaucetTasks } from "@/lib/queries/faucet";
import { createMetadata, pageGraph } from "@/lib/seo";

const TITLE = "OAR Faucet";
const DESCRIPTION =
  "Earn OAR every day. The fairest way to earn Oarcoin — no insiders, just participation. Complete tasks, claim your daily reward, and build your streak.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.faucet,
});

const FaucetPage = async () => {
  const tasks = await getFaucetTasks();

  return (
    <main>
      <JsonLd
        data={pageGraph({
          title: TITLE,
          description: DESCRIPTION,
          path: ROUTES.faucet,
        })}
      />
      <FaucetHero />
      <FaucetDashboard tasks={tasks} />
      <FaucetTasks tasks={tasks} />
    </main>
  );
};

export default FaucetPage;
