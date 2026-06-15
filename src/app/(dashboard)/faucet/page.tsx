import FaucetDashboard from "@/components/faucet/dashboard";
import FaucetHero from "@/components/faucet/hero";
import FaucetTasks from "@/components/faucet/tasks";

const FaucetPage = () => {
  return (
    <main>
      <FaucetHero />
      <FaucetDashboard />
      <FaucetTasks />
    </main>
  );
};

export default FaucetPage;
