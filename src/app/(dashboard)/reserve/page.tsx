import ReserveDashboard from "@/components/reserve/dashboard";
import ReserveDashboardComingSoon from "@/components/reserve/coming-soon";
import ReserveHero from "@/components/reserve/hero";

const ReserveDashboardPage = () => {
  return (
    <main>
      <ReserveHero />
      <ReserveDashboardComingSoon>
        <ReserveDashboard />
      </ReserveDashboardComingSoon>
    </main>
  );
};

export default ReserveDashboardPage;
