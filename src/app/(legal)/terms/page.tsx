import DotPageHeader from "@/components/dot-page-header";
import JsonLd from "@/components/seo/json-ld";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { ROUTES } from "@/lib/constants";
import { createMetadata, pageGraph } from "@/lib/seo";

const TITLE = "Terms of Service";
const DESCRIPTION =
  "The terms and disclaimers governing use of oarcoin.org, including risks related to using Oarcoin, investment risks, tax obligations, and limitation of liability.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.terms,
});

const TermsPage = () => {
  return (
    <main>
      <JsonLd
        data={pageGraph({
          title: TITLE,
          description: DESCRIPTION,
          path: ROUTES.terms,
        })}
      />
      <DotPageHeader title="Terms of Service" />
      <section className="pb-16 sm:pb-24">
        <WidthConstraint className="max-w-3xl">
          <article className="space-y-10 text-base leading-relaxed text-foreground">
            <section className="space-y-4">
              <h2 className="font-semibold">1. Information published on oarcoin.org</h2>
              <p>
                The website https://oarcoin.org/ (hereinafter, referred to as the
                &ldquo;Website&rdquo;) provides information and material of a general
                nature. You are not authorized, and nor should you rely on the Website for
                legal advice, business advice, financial advice, or advice of any kind. You
                act at your own risk in reliance on the contents of the Website.
              </p>
              <p>
                Should you make a decision to act or not act, you should contact a licensed
                attorney in the relevant jurisdiction in which you want or need help. In no
                way are the owners of, or contributors to, the Website responsible for the
                actions, decisions, or other behavior taken or not taken by you in reliance
                upon the Website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">2. Risks related to the use of Oarcoin</h2>
              <p>
                The Website will not be responsible for any losses, damages, or claims
                arising from events falling within the scope of the following five
                categories:
              </p>
              <ol className="list-decimal space-y-3 pl-6">
                <li>
                  Mistakes made by the user of any Oarcoin-related software or service,
                  e.g., forgotten passwords, payments sent to by the wrong Oarcoin
                  addresses, and accidental deletion of wallets.
                </li>
                <li>
                  Software problems of the Website and/or any Oarcoin-related software or
                  service, e.g., corrupted wallet file, incorrectly constructed
                  transactions, unsafe cryptographic libraries, malware affecting the
                  Website and/or any Oarcoin-related software or service.
                </li>
                <li>
                  Technical failures in the hardware of the user of any Oarcoin-related
                  software or service, e.g., data loss due to a faulty or damaged storage
                  device.
                </li>
                <li>
                  Security problems experienced by the user of any Oarcoin-related
                  software or service, e.g., unauthorized access to users&apos; wallets
                  and/or accounts.
                </li>
                <li>
                  Actions or inactions of third parties and/or events experienced by third
                  parties, e.g., bankruptcy of service providers, information security
                  attacks on service providers, and fraud conducted by third parties.
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">3. Investment risks</h2>
              <p>
                The investment in Oarcoin can lead to a loss of money over short or even
                long periods. The purchasers of Oarcoin should expect prices to have large
                range fluctuations. The information published on the Website cannot
                guarantee that the purchasers of Oarcoin will not lose money.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">4. Compliance with tax obligations</h2>
              <p>
                The users of the Website are solely responsible for determining that, if
                any, taxes apply to their Oarcoin transactions. The owners of, or
                contributors to, the Website are NOT responsible for determining the taxes
                that apply to Oarcoin transactions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">5. No warranties</h2>
              <p>
                The Website is provided on an &ldquo;as is&rdquo; basis without any
                warranties of any kind regarding the Website and/or any content, data,
                materials, and/or services provided on the Website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">6. Limitation of liability</h2>
              <p>
                Unless otherwise required by law, in no event shall the owners of, or
                contributors to, the Website be liable for any damages of any kind,
                including, but not limited to, loss of use, loss of profits, or loss of
                data arising out of or in any way connected with the use of the Website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">7. Arbitration</h2>
              <p>
                The user of the Website agrees to arbitrate any dispute arising from or in
                connection with the Website or this disclaimer, except for disputes related
                to copyrights, logos, trademarks, trade names, trade secrets, or patents.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">8. Last amendment</h2>
              <p className="text-muted-foreground">
                This disclaimer was amended for the last time on March 10, 2026.
              </p>
            </section>
          </article>
        </WidthConstraint>
      </section>
    </main>
  );
};

export default TermsPage;
