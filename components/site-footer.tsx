import Link from "next/link"
import { Heart } from "lucide-react"

const links = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
]

export function SiteFooter() {
  return (
    <footer className="footer-blur relative">
      <div className="accent-line absolute left-0 right-0 top-0 h-px opacity-60" />
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-pink text-brand-foreground">
            <Heart size={18} fill="currentColor" />
          </div>
          <div>
            <p className="font-heading text-xs text-muted-foreground">
              &copy; 2027 WaifuConvert. All rights reserved.
            </p>
            <p className="text-[0.65rem] tracking-wide text-muted-foreground/70">
              Gothic elegance meets modern functionality
            </p>
          </div>
        </div>
        <nav className="flex gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-heading text-sm tracking-wide text-primary transition-colors hover:text-brand-pink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
