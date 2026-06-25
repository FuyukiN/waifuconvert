import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const LOGO_URL =
  "https://i.pinimg.com/736x/41/25/1c/41251c2f4b07dfb4f36f3f19d27d8117.jpg"

export function SiteHeader({ variant = "home" }: { variant?: "home" | "sub" }) {
  return (
    <header className="header-blur sticky top-0 z-50">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-6">
        {variant === "home" ? (
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-lg border border-primary/50 shadow-[0_0_12px_rgba(168,85,247,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO_URL || "/placeholder.svg"}
                alt="Mascote WaifuConvert"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-heading text-lg font-bold tracking-wide text-gradient-brand">
                WaifuConvert
              </div>
              <div className="font-heading text-[0.62rem] tracking-[0.12em] text-muted-foreground">
                GOTHIC VIDEO CONVERTER
              </div>
            </div>
          </Link>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-sm font-semibold text-primary transition-colors hover:text-brand-pink"
          >
            <ArrowLeft size={18} />
            Back to WaifuConvert
          </Link>
        )}

        <ThemeToggle />
      </div>
    </header>
  )
}
