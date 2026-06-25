"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Abre o cliente de e-mail do usuário com a mensagem preenchida.
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    )
    const subject = encodeURIComponent(form.subject || "WaifuConvert — Contact")
    window.location.href = `mailto:waifuconvert@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  const fieldLabel = "mb-2 flex items-center gap-2 font-heading text-sm text-foreground"
  const bar = <span className="h-3.5 w-1 rounded-full bg-brand-pink" />

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className={fieldLabel}>
            {bar} Name
          </Label>
          <Input
            id="name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="h-12"
            required
          />
        </div>
        <div>
          <Label htmlFor="email" className={fieldLabel}>
            {bar} Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="h-12"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="subject" className={fieldLabel}>
          {bar} Subject
        </Label>
        <Input
          id="subject"
          placeholder="What would you like to talk about?"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="h-12"
        />
      </div>

      <div>
        <Label htmlFor="message" className={fieldLabel}>
          {bar} Message
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us more details..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5}
          required
        />
      </div>

      <button
        type="submit"
        className="btn-brand flex h-12 items-center justify-center gap-2 rounded-lg font-heading text-sm font-semibold tracking-wide"
      >
        {sent ? <CheckCircle2 size={18} /> : <Send size={18} />}
        {sent ? "Message ready" : "Send Message"}
      </button>

      {sent && (
        <p className="text-center text-sm text-success">
          Your email app should have opened. If not, write to waifuconvert@gmail.com.
        </p>
      )}
    </form>
  )
}
