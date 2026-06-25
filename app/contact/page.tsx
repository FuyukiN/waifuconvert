import type { Metadata } from "next"
import { MessageCircle, Mail } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GothicBackground } from "@/components/gothic-background"
import { KofiWidget } from "@/components/kofi-widget"
import { LegalHero, LegalSection } from "@/components/legal"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us — WaifuConvert",
  description: "Have questions, suggestions, or issues? Our team is here to help!",
}

const faq = [
  { q: "Is the service free?", a: "Yes! Completely free for personal use." },
  { q: "Are there download limits?", a: "No limits, but we ask for conscious usage." },
  { q: "Is my data safe?", a: "We don't store your videos or personal data." },
]

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GothicBackground />
      <SiteHeader variant="sub" />

      <main className="relative z-10 px-6 pb-24 pt-16">
        <div className="mx-auto max-w-5xl">
          <LegalHero
            title="Contact"
            highlight="Us"
            subtitle="Have questions, suggestions, or issues? Our team is here to help!"
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <LegalSection icon={MessageCircle} title="Send Your Message">
              <ContactForm />
            </LegalSection>

            <div className="flex flex-col gap-6">
              <LegalSection icon={Mail} title="Other Ways to Contact">
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:waifuconvert@gmail.com"
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Mail size={18} className="text-primary" />
                    waifuconvert@gmail.com
                  </a>
                  <a
                    href="https://ko-fi.com/waifuconvert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <MessageCircle size={18} className="text-primary" />
                    Support us on Ko-fi
                  </a>
                </div>
              </LegalSection>

              <LegalSection title="Quick FAQ">
                <div className="flex flex-col gap-4">
                  {faq.map((item) => (
                    <div key={item.q}>
                      <p className="font-semibold text-foreground">Q: {item.q}</p>
                      <p className="text-muted-foreground">A: {item.a}</p>
                    </div>
                  ))}
                </div>
              </LegalSection>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <KofiWidget />
    </div>
  )
}
