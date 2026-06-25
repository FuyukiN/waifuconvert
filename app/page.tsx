import { Shield, Zap, Globe } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GothicBackground } from "@/components/gothic-background"
import { KofiWidget } from "@/components/kofi-widget"
import { Converter } from "@/components/converter"

const supportedPlatforms = [
  "YouTube",
  "TikTok",
  "Instagram",
  "X / Twitter",
  "Reddit",
  "Facebook",
]

const features = [
  { icon: Shield, title: "Ad-Free", desc: "No banners, no pop-ups. Ever." },
  { icon: Zap, title: "Fast & Free", desc: "High-speed conversion at no cost." },
  { icon: Globe, title: "Multi-Platform", desc: "Six major social platforms supported." },
]

const platformTutorials = [
  {
    platform: "YouTube",
    steps: [
      "Navigate to YouTube and find the video you want",
      "Copy the URL from your browser's address bar",
      "Paste it into the field above",
      "Choose your format and quality, then convert",
    ],
  },
  {
    platform: "TikTok",
    steps: [
      "Open TikTok and find the video",
      "Tap Share, then Copy Link",
      "Paste the link into the field above",
      "Select format and start conversion",
    ],
  },
  {
    platform: "Instagram",
    steps: [
      "Go to the post or reel you want",
      "Tap the three-dot menu on the post",
      "Select Copy Link",
      "Paste and configure your settings above",
    ],
  },
  {
    platform: "X / Twitter",
    steps: [
      "Find the tweet containing the video",
      "Click the share icon under the tweet",
      "Choose Copy link to post",
      "Paste here and convert",
    ],
  },
  {
    platform: "Reddit",
    steps: [
      "Navigate to the Reddit post with video",
      "Click Share below the post",
      "Copy the post URL",
      "Paste it here and select your format",
    ],
  },
  {
    platform: "Facebook",
    steps: [
      "Go to the Facebook video post",
      "Click the three-dot menu on the post",
      "Select Copy Link",
      "Paste the URL and configure settings",
    ],
  },
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GothicBackground />
      <SiteHeader variant="home" />

      <main className="relative z-10 px-6 pb-24 pt-16">
        {/* Hero */}
        <section className="mb-14 text-center">
          <p className="mb-4 font-heading text-xs uppercase tracking-[0.3em] text-primary/80">
            Free &bull; Ad-Free &bull; No Limits
          </p>
          <h1 className="font-display mb-3 text-balance text-4xl font-bold leading-tight text-gradient-brand sm:text-5xl md:text-6xl">
            Convert Videos to MP3 &amp; MP4
          </h1>
          <p className="mx-auto max-w-lg text-pretty text-base text-muted-foreground">
            YouTube, TikTok, Instagram, X, Reddit, Facebook — one elegant portal.
          </p>
        </section>

        {/* Platform badges */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-wrap justify-center gap-2.5">
          {supportedPlatforms.map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-secondary-foreground"
            >
              {p}
            </span>
          ))}
        </div>

        <Converter />

        {/* Feature cards */}
        <div className="mx-auto mb-20 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-gothic rounded-xl p-6 text-center transition-transform hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 p-3 text-primary">
                <f.icon size={24} />
              </div>
              <p className="mb-1.5 font-heading text-base font-semibold text-foreground">
                {f.title}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Platform tutorials */}
        <section className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="mb-3 font-heading text-xs uppercase tracking-[0.3em] text-primary/70">
              How It Works
            </p>
            <h2 className="mb-2 font-heading text-3xl font-bold text-gradient-brand">
              Platform Guides
            </h2>
            <p className="text-sm text-muted-foreground">
              Step-by-step instructions for each supported platform
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {platformTutorials.map((t, i) => (
              <div key={t.platform} className="card-gothic rounded-xl p-6">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-pink font-heading text-xs font-bold text-brand-foreground">
                    {i + 1}
                  </span>
                  <h3 className="font-heading text-base font-semibold text-primary">
                    {t.platform}
                  </h3>
                </div>
                <div className="flex flex-col gap-2 border-t border-border pt-4">
                  {t.steps.map((step, si) => (
                    <div key={si} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.65rem] font-bold text-secondary-foreground">
                        {si + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
      <KofiWidget />
    </div>
  )
}
