import FaucetDashboard from "@/components/faucet/dashboard";
import FaucetHero from "@/components/faucet/hero";
import FaucetTasks from "@/components/faucet/tasks";
import { getFaucetTasks } from "@/lib/queries/faucet";

const FaucetPage = async () => {
  const tasks = await getFaucetTasks();

  return (
    <main>
      <FaucetHero />
      <FaucetDashboard tasks={tasks} />
      <FaucetTasks tasks={tasks} />
    </main>
  );
};

export default FaucetPage;
