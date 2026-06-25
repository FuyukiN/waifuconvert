import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Users, AlertTriangle, FileText } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GothicBackground } from "@/components/gothic-background"
import { KofiWidget } from "@/components/kofi-widget"
import { LegalHero, LegalSection, InfoBox } from "@/components/legal"

export const metadata: Metadata = {
  title: "Terms of Service — WaifuConvert",
  description: "Simple and clear rules for using WaifuConvert safely and legally.",
}

export default function TermsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GothicBackground />
      <SiteHeader variant="sub" />

      <main className="relative z-10 px-6 pb-24 pt-16">
        <div className="mx-auto max-w-3xl">
          <LegalHero
            title="Terms of"
            highlight="Service"
            subtitle="Simple and clear rules for using WaifuConvert safely and legally."
          />

          <div className="flex flex-col gap-6">
            <LegalSection icon={Shield} title="1. Acceptance of Terms">
              <div className="flex flex-col gap-3 text-muted-foreground">
                <p className="leading-relaxed">
                  By using WaifuConvert, you agree to these terms of service. If you
                  don&apos;t agree, please don&apos;t use our service.
                </p>
                <p className="leading-relaxed">
                  These terms may be updated periodically. We recommend checking this
                  page regularly for any changes.
                </p>
              </div>
            </LegalSection>

            <LegalSection icon={Users} title="2. Permitted Use">
              <InfoBox
                title="Allowed:"
                tone="positive"
                items={[
                  "Convert public videos for personal use",
                  "Download content you own rights to",
                  "Use for educational and non-commercial purposes",
                  "Share WaifuConvert link with friends",
                ]}
              />
            </LegalSection>

            <LegalSection icon={AlertTriangle} title="3. Prohibited Use">
              <InfoBox
                title="Prohibited:"
                tone="negative"
                items={[
                  "Download copyrighted content without permission",
                  "Use the service for commercial purposes",
                  "Overload our servers with automated requests",
                  "Redistribute downloaded content without rights",
                ]}
              />
            </LegalSection>

            <LegalSection icon={FileText} title="4. Responsibilities">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-3 font-semibold text-foreground">
                    Your Responsibilities:
                  </p>
                  <ul className="flex flex-col gap-2 text-muted-foreground">
                    {[
                      "Verify you have rights to download the content",
                      "Respect creators' copyrights",
                      "Use the service ethically and legally",
                      "Don't overload our servers",
                    ].map((i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-3 font-semibold text-foreground">
                    Our Responsibilities:
                  </p>
                  <ul className="flex flex-col gap-2 text-muted-foreground">
                    {[
                      "Provide the service to the best of our ability",
                      "Protect your privacy (we don't store your data)",
                      "Keep the service secure and updated",
                      "Be transparent about limitations",
                    ].map((i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink" />
                        <span className="leading-relaxed">{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="5. Contact">
              <p className="leading-relaxed text-muted-foreground">
                Questions about these terms? Contact us through our{" "}
                <Link
                  href="/contact"
                  className="text-primary underline underline-offset-4 transition-colors hover:text-brand-pink"
                >
                  contact page
                </Link>
                .
              </p>
              <p className="mt-5 text-sm text-muted-foreground/70">
                Last updated: 6/25/2027
              </p>
            </LegalSection>
          </div>
        </div>
      </main>

      <SiteFooter />
      <KofiWidget />
    </div>
  )
}
