import DotPageHeader from "@/components/dot-page-header";
import JsonLd from "@/components/seo/json-ld";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { ROUTES } from "@/lib/constants";
import { createMetadata, pageGraph } from "@/lib/seo";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Oarcoin (OAR) collects, uses, and safeguards information. OAR is an open system with minimal data collection — no accounts or personal information required to participate.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.privacy,
});

const PrivacyPolicyPage = () => {
  return (
    <main>
      <JsonLd
        data={pageGraph({
          title: TITLE,
          description: DESCRIPTION,
          path: ROUTES.privacy,
        })}
      />
      <DotPageHeader title="Privacy Policy" />
      <section className="pb-16 sm:pb-24">
        <WidthConstraint className="max-w-3xl">
          <article className="space-y-10 text-base leading-relaxed text-foreground">
            <section className="space-y-4">
              <h2 className="font-semibold">1. Introduction</h2>
              <p>
                Oarcoin.org (&ldquo;OAR&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
                &ldquo;us&rdquo;) respects your privacy and is committed to protecting it.
                This Privacy Policy explains how we collect, use, and safeguard
                information when you interact with the OAR website, applications, and
                services (collectively, the &ldquo;Services&rdquo;).
              </p>
              <p>
                OAR is designed as an open system with minimal data collection. We do not
                require users to create accounts or provide personal information to
                participate.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="font-semibold">2. Information We Collect</h2>
              <p>We aim to collect as little information as possible.</p>

              <div className="space-y-3">
                <h3 className="font-medium">a. Information You Provide</h3>
                <p>
                  We generally do not require personal information. However, you may
                  voluntarily provide information when:
                </p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>Contacting us</li>
                  <li>Participating in community channels</li>
                  <li>Submitting feedback</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">b. Automatically Collected Information</h3>
                <p>
                  When you use our Services, we may collect limited technical data,
                  including:
                </p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>Device type and browser information</li>
                  <li>IP address (for security and abuse prevention)</li>
                  <li>Interaction data (e.g. pages visited, actions taken)</li>
                </ul>
                <p>
                  This information is used to improve performance and protect the system.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">c. Blockchain Data</h3>
                <p>
                  Transactions involving OAR occur on public blockchain networks. This
                  means:
                </p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>Wallet addresses</li>
                  <li>Transaction history</li>
                  <li>Token balances</li>
                </ul>
                <p>may be publicly visible and cannot be altered or deleted by us.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">3. How We Use Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Operate and maintain the Services</li>
                <li>Prevent fraud, abuse, and automated attacks (e.g., faucet misuse)</li>
                <li>Improve functionality and user experience</li>
                <li>Monitor system performance and security</li>
              </ul>
              <p>We do not sell or rent user data.</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">4. Cookies and Tracking</h2>
              <p>We may use cookies or similar technologies to:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Improve website functionality</li>
                <li>Understand usage patterns</li>
                <li>Enhance performance</li>
              </ul>
              <p>You can control cookies through your browser settings.</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">5. Data Sharing</h2>
              <p>We do not share personal information except:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>When required by law or legal process</li>
                <li>To protect the integrity and security of the system</li>
                <li>
                  With service providers who help operate the website (under strict
                  confidentiality)
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">6. Third-Party Services</h2>
              <p>OAR may interact with third-party platforms, including:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Decentralized exchanges such as Uniswap</li>
                <li>Blockchain networks such as Base</li>
                <li>Analytics or infrastructure providers</li>
              </ul>
              <p>
                These services operate independently and have their own privacy policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">7. Data Security</h2>
              <p>
                We take reasonable measures to protect the information we collect.
                However:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>No system is completely secure</li>
                <li>Blockchain transactions are irreversible</li>
                <li>Users are responsible for securing their wallets and private keys</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">8. Your Privacy Choices</h2>
              <p>You can:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Use the Services without providing personal information</li>
                <li>Disable cookies in your browser</li>
                <li>Choose whether to interact with third-party services</li>
              </ul>
              <p>
                Because blockchain data is public, some information cannot be removed once
                recorded.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be
                posted on this page with an updated &ldquo;Last Amendment&rdquo; date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-semibold">10. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, you can contact us
                through official OAR communication channels.
              </p>
              <p className="text-muted-foreground">
                This privacy policy was amended for the last time on March 10th, 2026.
              </p>
            </section>
          </article>
        </WidthConstraint>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
