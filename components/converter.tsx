"use client"

import { useState } from "react"
import { Download, RotateCcw, Shield, AlertCircle, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

type ConversionState = "idle" | "converting" | "completed" | "error"

interface ConversionResult {
  file: string
  filename: string
  size: number
}

const BACKEND_URL = "https://waifuconvert-backend-production.up.railway.app"

const supportedPlatforms = [
  { name: "YouTube", domains: ["youtube.com", "youtu.be"] },
  { name: "TikTok", domains: ["tiktok.com"] },
  { name: "Instagram", domains: ["instagram.com"] },
  { name: "X / Twitter", domains: ["twitter.com", "x.com"] },
  { name: "Reddit", domains: ["reddit.com"] },
  { name: "Facebook", domains: ["facebook.com", "fb.com"] },
]

const videoQualities = [
  { value: "144", label: "144p — Low Quality" },
  { value: "240", label: "240p — Low Quality" },
  { value: "360", label: "360p — Standard" },
  { value: "480", label: "480p — Standard" },
  { value: "720", label: "720p — High Definition" },
  { value: "1080", label: "1080p — Full HD" },
]

const audioQualities = [
  { value: "96", label: "96 kbps" },
  { value: "128", label: "128 kbps" },
  { value: "192", label: "192 kbps" },
  { value: "256", label: "256 kbps" },
  { value: "320", label: "320 kbps — Highest Quality" },
]

function detectPlatform(url: string): string {
  try {
    const hostname = new URL(url).hostname.toLowerCase().replace("www.", "")
    for (const p of supportedPlatforms) {
      if (p.domains.some((d) => hostname.includes(d))) return p.name.toLowerCase()
    }
  } catch {}
  return "unknown"
}

function formatFileSize(bytes: number): string {
  if (!bytes) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

function SigilOrnament() {
  return (
    <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
      <svg
        className="absolute inset-0 h-full w-full text-primary"
        style={{ animation: "sigil-rotate 20s linear infinite" }}
        viewBox="0 0 80 80"
        fill="none"
      >
        <circle cx="40" cy="40" r="38" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.6" strokeDasharray="4 6" />
        <polygon points="40,4 74,62 6,62" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.5" fill="none" />
        <polygon points="40,76 6,18 74,18" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" fill="none" />
      </svg>
      <svg
        className="absolute inset-0 h-full w-full text-primary"
        style={{ animation: "sigil-counter 12s linear infinite" }}
        viewBox="0 0 80 80"
        fill="none"
      >
        <circle cx="40" cy="40" r="30" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.5" strokeDasharray="2 8" />
        <circle cx="40" cy="40" r="22" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.4" />
      </svg>
      <div
        className="h-8 w-8 rounded-full bg-primary"
        style={{
          boxShadow:
            "0 0 20px var(--brand), 0 0 40px color-mix(in oklch, var(--brand) 40%, transparent)",
          animation: "aura-pulse 3s ease-in-out infinite",
        }}
      />
    </div>
  )
}

export function Converter() {
  const [url, setUrl] = useState("")
  const [format, setFormat] = useState("")
  const [quality, setQuality] = useState("")
  const [conversionState, setConversionState] = useState<ConversionState>("idle")
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null)
  const [error, setError] = useState("")
  const [downloadCooldown, setDownloadCooldown] = useState(false)
  const [cooldownSeconds, setCooldownSeconds] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleConvert = async () => {
    if (!url || !format || !quality) return
    setConversionState("converting")
    setError("")
    setConversionResult(null)
    try {
      const response = await fetch(`${BACKEND_URL}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          format,
          quality,
          platform: detectPlatform(url),
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Conversion failed")
      setConversionResult(data)
      setConversionState("completed")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setConversionState("error")
    }
  }

  const startDownloadCooldown = () => {
    setDownloadCooldown(true)
    setCooldownSeconds(120)
    const countdown = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(countdown)
          setDownloadCooldown(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleDownload = async () => {
    if (downloadCooldown || !conversionResult) return
    setIsDownloading(true)
    startDownloadCooldown()
    try {
      const blob = await (await fetch(`${BACKEND_URL}${conversionResult.file}`)).blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = conversionResult.filename
      a.style.display = "none"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(`${BACKEND_URL}${conversionResult.file}`, "_blank")
    } finally {
      setIsDownloading(false)
    }
  }

  const handleReset = () => {
    setUrl("")
    setFormat("")
    setQuality("")
    setConversionState("idle")
    setConversionResult(null)
    setError("")
    setDownloadCooldown(false)
    setCooldownSeconds(0)
    setIsDownloading(false)
  }

  const formatCooldown = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`

  const labelClass =
    "mb-2 block font-heading text-xs tracking-wider text-muted-foreground"

  return (
    <div className="relative mx-auto mb-20 max-w-xl">
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-60 blur-xl"
        style={{ background: "var(--grad-accent-line)", animation: "aura-pulse 4s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <div className="card-gothic card-gothic-glow relative z-10 rounded-2xl p-8 sm:p-10">
        <SigilOrnament />

        <h2 className="mb-1 text-center font-heading text-lg font-semibold tracking-wide text-foreground">
          Conversion Portal
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Enter a URL and select your output settings
        </p>

        {error && (
          <Alert variant="destructive" className="mb-6 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {conversionState === "idle" && (
          <div className="flex flex-col gap-5">
            <div>
              <label className={labelClass} htmlFor="video-url">
                VIDEO URL
              </label>
              <Input
                id="video-url"
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>FORMAT</label>
                <Select
                  value={format}
                  onValueChange={(v) => {
                    setFormat(v)
                    setQuality("")
                  }}
                >
                  <SelectTrigger className="h-12 w-full">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp3">MP3 — Audio</SelectItem>
                    <SelectItem value="mp4">MP4 — Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className={labelClass}>QUALITY</label>
                <Select value={quality} onValueChange={setQuality} disabled={!format}>
                  <SelectTrigger className="h-12 w-full">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    {(format === "mp3" ? audioQualities : videoQualities).map((q) => (
                      <SelectItem key={q.value} value={q.value}>
                        {q.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              onClick={handleConvert}
              disabled={!url || !format || !quality}
              className="btn-brand flex h-13 min-h-[52px] w-full items-center justify-center gap-2 rounded-lg font-heading text-sm font-semibold tracking-wider"
            >
              <Download size={18} />
              CONVERT &amp; DOWNLOAD
            </button>
          </div>
        )}

        {conversionState === "converting" && (
          <div className="py-8 text-center">
            <div className="relative mx-auto mb-6 h-16 w-16">
              <div className="h-16 w-16 rounded-full border-[3px] border-secondary border-t-primary animate-spin-slow" />
            </div>
            <p className="mb-1 font-heading text-base text-primary">Processing</p>
            <p className="text-sm text-muted-foreground">
              Your file is being prepared...
            </p>
            <div className="mt-4 flex justify-center gap-1.5">
              {[0, 200, 400].map((d) => (
                <div
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                  style={{ animation: "aura-pulse 1.2s ease-in-out infinite", animationDelay: `${d}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {conversionState === "completed" && conversionResult && (
          <div className="py-4 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success text-primary-foreground shadow-[0_0_30px_color-mix(in_oklch,var(--success)_50%,transparent)]">
              <Download size={28} />
            </div>
            <p className="mb-1 font-heading text-base text-success">
              Conversion Complete
            </p>
            <p className="text-sm text-muted-foreground">{conversionResult.filename}</p>
            <p className="mb-6 text-xs text-muted-foreground/70">
              {formatFileSize(conversionResult.size)}
            </p>

            {(downloadCooldown || isDownloading) && (
              <div className="mb-4 rounded-lg border border-brand-rose/30 bg-brand-rose/10 px-4 py-2.5 text-sm text-brand-rose">
                <Shield size={14} className="mr-1.5 inline" />
                {isDownloading
                  ? "Download in progress..."
                  : `Next download in ${formatCooldown(cooldownSeconds)}`}
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleDownload}
                disabled={downloadCooldown || isDownloading}
                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-success font-heading text-sm font-semibold tracking-wide text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download size={15} />
                {isDownloading
                  ? "DOWNLOADING..."
                  : downloadCooldown
                    ? `WAIT ${formatCooldown(cooldownSeconds)}`
                    : "DOWNLOAD FILE"}
              </button>
              <button
                onClick={handleReset}
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 font-heading text-sm tracking-wide text-primary transition hover:bg-secondary"
              >
                <RotateCcw size={14} />
                CONVERT ANOTHER
              </button>
              <button
                onClick={() => window.open("https://ko-fi.com/waifuconvert", "_blank")}
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-brand-rose/30 bg-brand-rose/10 font-heading text-sm tracking-wide text-brand-rose transition hover:bg-brand-rose/20"
              >
                <Heart size={13} />
                SUPPORT THE PROJECT
              </button>
            </div>
          </div>
        )}

        {conversionState === "error" && (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-destructive text-primary-foreground shadow-[0_0_30px_color-mix(in_oklch,var(--destructive)_45%,transparent)]">
              <AlertCircle size={28} />
            </div>
            <p className="mb-1 font-heading text-base text-destructive">
              Conversion Failed
            </p>
            <p className="mb-6 text-sm text-muted-foreground">
              Check your URL and try again
            </p>
            <button
              onClick={handleReset}
              className="btn-brand mx-auto flex h-12 items-center justify-center gap-2 rounded-lg px-8 font-heading text-sm font-semibold tracking-wide"
            >
              <RotateCcw size={15} />
              TRY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
