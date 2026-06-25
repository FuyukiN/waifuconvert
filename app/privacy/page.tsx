import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Eye, Clock, Lock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GothicBackground } from "@/components/gothic-background"
import { KofiWidget } from "@/components/kofi-widget"
import { LegalHero, LegalSection, InfoBox, CheckList } from "@/components/legal"

export const metadata: Metadata = {
  title: "Privacy Policy — WaifuConvert",
  description: "Your privacy is our priority. See how we protect your data.",
}

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GothicBackground />
      <SiteHeader variant="sub" />

      <main className="relative z-10 px-6 pb-24 pt-16">
        <div className="mx-auto max-w-3xl">
          <LegalHero
            title="Privacy"
            highlight="Policy"
            subtitle="Your privacy is our priority. See how we protect your data."
          />

          <div className="flex flex-col gap-6">
            <LegalSection icon={ShieldCheck} title="Policy Summary">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InfoBox
                  title="What we do"
                  tone="positive"
                  items={[
                    "Process only URLs you submit",
                    "Delete files automatically",
                    "Don't create accounts or profiles",
                    "Don't sell data",
                  ]}
                />
                <InfoBox
                  title="What we DON'T do"
                  tone="negative"
                  items={[
                    "Don't store your videos",
                    "Don't collect personal data",
                    "Don't track your history",
                    "Don't share information",
                  ]}
                />
              </div>
            </LegalSection>

            <LegalSection icon={Eye} title="Data We Collect">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-3 font-semibold text-foreground">
                    Minimal Required Data:
                  </p>
                  <ul className="flex flex-col gap-2 text-muted-foreground">
                    {[
                      ["Video URL:", "Only to process your request"],
                      ["IP Address:", "For basic server logs (deleted in 24h)"],
                      ["User-Agent:", "For technical compatibility"],
                    ].map(([b, t]) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">
                          <strong className="text-foreground">{b}</strong> {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-3 font-semibold text-foreground">
                    Data We DON&apos;T Collect:
                  </p>
                  <CheckList
                    tone="negative"
                    items={[
                      "Name, email, or personal information",
                      "Browsing history",
                      "Precise geographic location",
                      "Payment or financial data",
                    ]}
                  />
                </div>
              </div>
            </LegalSection>

            <LegalSection icon={Clock} title="Data Retention">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-3 font-semibold text-foreground">Retention Times:</p>
                  <ul className="flex flex-col gap-2 text-muted-foreground">
                    {[
                      ["Converted files:", "2 hour maximum"],
                      ["Server logs:", "24 hours"],
                      ["Processed URLs:", "Not stored"],
                      ["Temporary cache:", "30 minutes"],
                    ].map(([b, t]) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">
                          <strong className="text-foreground">{b}</strong> {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-3 font-semibold text-foreground">
                    Automatic Deletion:
                  </p>
                  <CheckList
                    items={[
                      "Automatic cleanup every 30 minutes",
                      "Orphaned files removed immediately",
                      "Logs rotated daily",
                      "Cache cleared automatically",
                    ]}
                  />
                </div>
              </div>
            </LegalSection>

            <LegalSection icon={Lock} title="Data Security">
              <p className="mb-3 font-semibold text-foreground">Security Measures:</p>
              <CheckList
                items={[
                  "Encrypted HTTPS connections",
                  "Restricted server access",
                  "24/7 security monitoring",
                  "Regular security updates",
                  "Isolated conversion processes",
                ]}
              />
            </LegalSection>

            <LegalSection title="Contact">
              <p className="leading-relaxed text-muted-foreground">
                Privacy questions? Contact us through our{" "}
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
