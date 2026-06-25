import type { LucideIcon } from "lucide-react"

export function LegalHero({
  title,
  highlight,
  subtitle,
}: {
  title: string
  highlight: string
  subtitle: string
}) {
  return (
    <div className="relative mb-12 text-center">
      <div className="accent-line mx-auto mb-6 h-1 w-16 rounded-full opacity-70" />
      <h1 className="font-display text-4xl font-bold sm:text-5xl">
        <span className="text-foreground">{title} </span>
        <span className="text-gradient-brand">{highlight}</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
        {subtitle}
      </p>
    </div>
  )
}

export function LegalSection({
  icon: Icon,
  title,
  children,
}: {
  icon?: LucideIcon
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="card-gothic card-gothic-glow overflow-hidden rounded-2xl">
      <div className="flex items-center gap-3 border-b border-border px-6 py-5 sm:px-8">
        <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
        {Icon && <Icon size={20} className="text-primary" />}
        <h2 className="font-heading text-xl font-semibold text-foreground">
          {title}
        </h2>
      </div>
      <div className="px-6 py-6 sm:px-8 sm:py-7">{children}</div>
    </section>
  )
}

export function CheckList({
  items,
  tone = "positive",
}: {
  items: string[]
  tone?: "positive" | "negative"
}) {
  const dot =
    tone === "positive" ? "bg-success" : "bg-brand-rose"
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-muted-foreground">
          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function InfoBox({
  title,
  tone,
  items,
}: {
  title: string
  tone: "positive" | "negative"
  items: string[]
}) {
  const border = tone === "positive" ? "border-success/30" : "border-brand-rose/30"
  const bg = tone === "positive" ? "bg-success/5" : "bg-brand-rose/5"
  const titleColor = tone === "positive" ? "text-success" : "text-brand-rose"
  return (
    <div className={`rounded-xl border ${border} ${bg} p-5`}>
      <p className={`mb-3 font-semibold ${titleColor}`}>{title}</p>
      <CheckList items={items} tone={tone} />
    </div>
  )
}
