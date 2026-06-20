import ReserveDashboard from "@/components/reserve/dashboard";
import ReserveDashboardComingSoon from "@/components/reserve/coming-soon";
import ReserveHero from "@/components/reserve/hero";
import JsonLd from "@/components/seo/json-ld";
import { ROUTES } from "@/lib/constants";
import { createMetadata, pageGraph } from "@/lib/seo";

const TITLE = "OAR Reserve Dashboard";
const DESCRIPTION =
  "A real-time view of the OAR Reserve — a self-growing treasury powered by every transaction. Track reserve balance, holders, and growth as the network expands.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.reserve,
});

const ReserveDashboardPage = () => {
  return (
    <main>
      <JsonLd
        data={pageGraph({
          title: TITLE,
          description: DESCRIPTION,
          path: ROUTES.reserve,
        })}
      />
      <ReserveHero />
      <ReserveDashboardComingSoon>
        <ReserveDashboard />
      </ReserveDashboardComingSoon>
    </main>
  );
};

export default ReserveDashboardPage;
