"use client"

import { useState } from "react"
import { Moon, Sun, Download, Heart, RotateCcw, Zap, Shield, Globe, Sparkles, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTheme } from "next-themes"
import { CustomLogo } from "@/components/custom-logo"
import Link from "next/link"

type ConversionState = "idle" | "converting" | "completed" | "error"

// 🔧 ÚNICA MUDANÇA NA INTERFACE - Para trabalhar com Cobalt
interface ConversionResult {
  downloadUrl: string // ← Mudou de 'file' para 'downloadUrl'
  filename: string
  size?: number // ← Opcional agora
  platform?: string // ← Novo campo
  method?: string // ← Novo campo
}

export default function WaifuConvert() {
  const [url, setUrl] = useState("")
  const [format, setFormat] = useState("")
  const [quality, setQuality] = useState("")
  const [conversionState, setConversionState] = useState<ConversionState>("idle")
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null)
  const [error, setError] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const { theme, setTheme } = useTheme()

  // 🚀 SUA URL DO RAILWAY (MESMA DE ANTES)
  const BACKEND_URL = "https://waifuconvert-backend-production.up.railway.app"

  const supportedPlatforms = [
    { name: "YouTube", color: "bg-red-600 hover:bg-red-700", domains: ["youtube.com", "youtu.be"] },
    {
      name: "TikTok",
      color: "bg-gray-800 hover:bg-gray-900 dark:bg-gray-900 dark:hover:bg-black",
      domains: ["tiktok.com"],
    },
    {
      name: "Instagram",
      color: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      domains: ["instagram.com"],
    },
    { name: "Twitter", color: "bg-blue-600 hover:bg-blue-700", domains: ["twitter.com", "x.com"] },
    { name: "Reddit", color: "bg-orange-600 hover:bg-orange-700", domains: ["reddit.com"] },
    { name: "Facebook", color: "bg-blue-700 hover:bg-blue-800", domains: ["facebook.com", "fb.com"] },
  ]

  const videoQualities = [
    { value: "144", label: "144p (Low Quality)" },
    { value: "240", label: "240p (Low Quality)" },
    { value: "360", label: "360p (Standard)" },
    { value: "480", label: "480p (Standard)" },
    { value: "720", label: "720p (High Definition)" },
    { value: "1080", label: "1080p (Full HD)" },
  ]

  const audioQualities = [
    { value: "96", label: "96 kbps" },
    { value: "128", label: "128 kbps" },
    { value: "192", label: "192 kbps" },
    { value: "256", label: "256 kbps" },
    { value: "320", label: "320 kbps (Highest Quality)" },
  ]

  // Detect platform from URL (MANTIDO IGUAL)
  const detectPlatform = (url: string): string => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.toLowerCase().replace("www.", "")

      for (const platform of supportedPlatforms) {
        if (platform.domains.some((domain) => hostname.includes(domain))) {
          return platform.name.toLowerCase()
        }
      }
      return "unknown"
    } catch {
      return "unknown"
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // 🔧 ÚNICA MUDANÇA IMPORTANTE - Função de conversão atualizada para Cobalt
  const handleConvert = async () => {
    if (!url || !format || !quality) return

    setConversionState("converting")
    setError("")
    setConversionResult(null)

    try {
      const platform = detectPlatform(url)

      console.log("🚀 Enviando para Cobalt backend...")

      // 🌐 USANDO A MESMA URL DO RAILWAY
      const response = await fetch(`${BACKEND_URL}/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.trim(),
          format,
          quality,
          platform,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Conversion failed")
      }

      console.log("✅ Sucesso com Cobalt:", data)

      setConversionResult(data)
      setConversionState("completed")
    } catch (err) {
      console.error("❌ Erro na conversão:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setConversionState("error")
    }
  }

  // 🔧 MUDANÇA NA FUNÇÃO DE DOWNLOAD - Para trabalhar com Cobalt
  const handleDownload = async () => {
    if (!conversionResult) return

    try {
      // Cobalt retorna URL direta, então fazemos download direto
      const link = document.createElement("a")
      link.href = conversionResult.downloadUrl
      link.download = conversionResult.filename
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Erro no download:", error)
      // Fallback: abrir em nova aba
      window.open(conversionResult.downloadUrl, "_blank")
    }
  }

  const handleConvertAgain = () => {
    setUrl("")
    setFormat("")
    setQuality("")
    setConversionState("idle")
    setConversionResult(null)
    setError("")
  }

  const platformTutorials = [
    {
      platform: "YouTube",
      steps: [
        "Navigate to YouTube and locate the video you wish to convert",
        "Copy the video URL from your browser's address bar",
        "Paste the URL into the input field above",
        "Select your preferred format (MP3 or MP4) and quality settings",
        "Click 'Convert & Download' to begin the conversion process",
      ],
    },
    {
      platform: "TikTok",
      steps: [
        "Open TikTok and find the video you want to convert",
        "Tap the 'Share' button on the video",
        "Select 'Copy Link' from the sharing options",
        "Paste the link here and choose your desired format",
        "Initiate the conversion and download your content",
      ],
    },
    {
      platform: "Instagram",
      steps: [
        "Go to the Instagram post or reel you want to convert",
        "Click the three dots menu on the post",
        "Select 'Copy Link' from the available options",
        "Paste the URL and configure your conversion settings",
        "Download your Instagram content seamlessly",
      ],
    },
    {
      platform: "Twitter",
      steps: [
        "Locate the tweet containing the video you want",
        "Click the share icon beneath the tweet",
        "Select 'Copy link to Tweet' from the menu",
        "Paste the link and choose your conversion preferences",
        "Convert and download your Twitter video content",
      ],
    },
    {
      platform: "Reddit",
      steps: [
        "Navigate to the Reddit post with the video content",
        "Click the 'Share' button below the post",
        "Copy the post URL to your clipboard",
        "Paste it here and select your format preferences",
        "Convert your favorite Reddit videos effortlessly",
      ],
    },
    {
      platform: "Facebook",
      steps: [
        "Go to the Facebook video post you want to convert",
        "Click the three dots menu on the post",
        "Select 'Copy Link' from the dropdown menu",
        "Paste the URL and choose your conversion settings",
        "Download Facebook videos without complications",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-black dark:via-purple-950/50 dark:to-gray-900 relative overflow-hidden">
      {/* Gothic Anime Background Elements - MANTIDO IGUAL */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-purple-300/30 dark:border-purple-500/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-pink-300/30 dark:border-pink-500/20 rotate-12 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 border border-purple-200/20 dark:border-purple-400/10 -rotate-12 animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 border border-pink-200/30 dark:border-pink-400/20 rotate-45 animate-pulse delay-700"></div>

        {/* Anime-style light rays */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-purple-300/20 dark:from-purple-500/20 via-transparent to-transparent transform -skew-x-12"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-pink-300/20 dark:from-pink-500/20 via-transparent to-transparent transform skew-x-12"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-purple-400/40 dark:bg-purple-400/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-pink-400/50 dark:bg-pink-400/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-purple-300/30 dark:bg-purple-300/20 rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Header - MANTIDO IGUAL */}
      <header className="border-b border-purple-200 dark:border-purple-800/50 bg-white/90 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <CustomLogo logoUrl={logoUrl} onLogoChange={setLogoUrl} />

          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border-purple-300 dark:border-purple-600/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 dark:from-purple-600/20 to-pink-100/50 dark:to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 relative z-10" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 z-10" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Hero Section - PEQUENA MUDANÇA NO TEXTO */}
          <div className="text-center space-y-4 relative">
            {/* Anime-style decorative elements */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-purple-400 dark:via-purple-500 to-transparent"></div>
                <div className="w-4 h-0.5 bg-gradient-to-r from-transparent via-pink-400 dark:via-pink-500 to-transparent"></div>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="w-1 h-16 bg-gradient-to-b from-purple-500 to-transparent animate-pulse"></div>
              <div className="space-y-2 relative">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative">
                  Convert Videos to{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative">
                    MP3 & MP4
                    {/* Anime-style glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-lg -z-10"></div>
                  </span>
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto animate-pulse"></div>
              </div>
              <div className="w-1 h-16 bg-gradient-to-b from-pink-500 to-transparent animate-pulse delay-500"></div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 relative">
              {/* 🔧 ÚNICA MUDANÇA NO TEXTO - Mencionar melhoria */}
              Elegant, fast, and ad-free video conversion platform
              <br />
              <span className="text-sm text-purple-600 dark:text-purple-400">🚀 Now with improved success rate!</span>
              {/* Subtle anime-style underline */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
            </p>
          </div>

          {/* Enhanced Supported Platforms - MANTIDO IGUAL */}
          <div className="flex flex-wrap justify-center gap-3">
            {supportedPlatforms.map((platform, index) => (
              <Badge
                key={platform.name}
                className={`${platform.color} text-white border-0 px-4 py-2 text-sm font-medium shadow-lg transition-all duration-300 cursor-default relative overflow-hidden group`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">{platform.name}</span>
              </Badge>
            ))}
          </div>

          {/* Enhanced Conversion Form - MANTIDO QUASE IGUAL */}
          <Card className="border-purple-200 dark:border-purple-700/50 shadow-2xl bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm relative overflow-hidden">
            {/* Anime-style card decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-pink-500/50 to-transparent"></div>

            <CardHeader className="text-center border-b border-purple-200 dark:border-purple-800/30 relative">
              <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="relative">
                  Conversion Portal
                  <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                </span>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-500"></div>
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Enter your video URL and configure conversion parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Error Alert */}
              {error && (
                <Alert className="border-red-300 dark:border-red-700/50 bg-red-50 dark:bg-red-900/20">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
                </Alert>
              )}

              {conversionState === "idle" && (
                <>
                  {/* URL Input - MANTIDO IGUAL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center space-x-2">
                      <div className="w-1 h-4 bg-purple-500 animate-pulse"></div>
                      <span>Video URL</span>
                    </label>
                    <div className="relative">
                      <Input
                        type="url"
                        placeholder="https://youtube.com/watch?v=..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="border-purple-300 dark:border-purple-600/50 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 pl-4 pr-12"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Format and Quality Selection - MANTIDO IGUAL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center space-x-2">
                        <div className="w-1 h-4 bg-purple-500 animate-pulse"></div>
                        <span>Format</span>
                      </label>
                      <Select
                        value={format}
                        onValueChange={(value) => {
                          setFormat(value)
                          setQuality("")
                        }}
                      >
                        <SelectTrigger className="border-purple-300 dark:border-purple-600/50 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 dark:from-purple-600/10 to-pink-50/50 dark:to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <SelectValue placeholder="Select format" className="relative z-10" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-purple-300 dark:border-purple-600/50">
                          <SelectItem
                            value="mp3"
                            className="text-gray-900 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/50 focus:bg-purple-50 dark:focus:bg-purple-900/50"
                          >
                            MP3 (Audio Only)
                          </SelectItem>
                          <SelectItem
                            value="mp4"
                            className="text-gray-900 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/50 focus:bg-purple-50 dark:focus:bg-purple-900/50"
                          >
                            MP4 (Video)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center space-x-2">
                        <div className="w-1 h-4 bg-pink-500 animate-pulse"></div>
                        <span>Quality</span>
                      </label>
                      <Select value={quality} onValueChange={setQuality} disabled={!format}>
                        <SelectTrigger className="border-purple-300 dark:border-purple-600/50 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white disabled:opacity-50 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 dark:from-pink-600/10 to-purple-50/50 dark:to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <SelectValue placeholder="Select quality" className="relative z-10" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-purple-300 dark:border-purple-600/50">
                          {format === "mp3"
                            ? audioQualities.map((q) => (
                                <SelectItem
                                  key={q.value}
                                  value={q.value}
                                  className="text-gray-900 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/50 focus:bg-purple-50 dark:focus:bg-purple-900/50"
                                >
                                  {q.label}
                                </SelectItem>
                              ))
                            : videoQualities.map((q) => (
                                <SelectItem
                                  key={q.value}
                                  value={q.value}
                                  className="text-gray-900 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/50 focus:bg-purple-50 dark:focus:bg-purple-900/50"
                                >
                                  {q.label}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Enhanced Convert Button - MANTIDO IGUAL */}
                  <Button
                    onClick={handleConvert}
                    disabled={!url || !format || !quality}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center space-x-3 relative z-10">
                      <Download className="w-6 h-6" />
                      <span>Convert & Download</span>
                      <div className="w-1 h-6 bg-white/30"></div>
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                  </Button>
                </>
              )}

              {conversionState === "converting" && (
                <div className="text-center space-y-6 py-8">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {/* 🔧 PEQUENA MUDANÇA NO TEXTO */}🚀 Processing with Enhanced Engine
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Your video is being converted with improved success rate...
                    </p>
                    <div className="flex justify-center space-x-2 mt-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              {conversionState === "completed" && conversionResult && (
                <div className="text-center space-y-6 py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <Download className="w-8 h-8 text-white" />
                    {/* Anime-style success glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-full blur-lg animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Conversion Complete</h3>
                    <p className="text-gray-600 dark:text-gray-300">Your video has been successfully converted</p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <p className="font-medium">{conversionResult.filename}</p>
                      {/* 🔧 MUDANÇA PEQUENA - Mostrar info adicional se disponível */}
                      {conversionResult.size && <p>Size: {formatFileSize(conversionResult.size)}</p>}
                      {conversionResult.platform && (
                        <p className="text-purple-600 dark:text-purple-400">
                          Platform: {conversionResult.platform} | Method: {conversionResult.method}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleDownload}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Download className="w-4 h-4 mr-2 relative z-10" />
                      <span className="relative z-10">Download File</span>
                    </Button>

                    <Button
                      onClick={handleConvertAgain}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <RotateCcw className="w-4 h-4 mr-2 relative z-10" />
                      <span className="relative z-10">Convert Again</span>
                    </Button>

                    <Button
                      onClick={() => window.open("https://ko-fi.com/waifuconvert", "_blank")}
                      variant="outline"
                      className="border-purple-300 dark:border-purple-500/50 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 dark:from-purple-600/10 to-pink-50/50 dark:to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Heart className="w-4 h-4 mr-2 relative z-10" />
                      <span className="relative z-10">Support Project</span>
                    </Button>
                  </div>
                </div>
              )}

              {conversionState === "error" && (
                <div className="text-center space-y-6 py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Conversion Failed</h3>
                    <p className="text-gray-600 dark:text-gray-300">Please try again or check your URL</p>
                  </div>

                  <Button
                    onClick={handleConvertAgain}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Features - MANTIDO IGUAL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Shield,
                title: "Ad-Free",
                desc: "Clean experience without intrusive advertisements",
                color: "purple",
              },
              { icon: Zap, title: "Fast & Free", desc: "High-speed conversions at no cost to you", color: "pink" },
              { icon: Globe, title: "Multi-Platform", desc: "Support for six major social platforms", color: "purple" },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="text-center border-purple-200 dark:border-purple-700/50 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${feature.color}-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                ></div>
                <CardContent className="pt-6">
                  <feature.icon className={`w-12 h-12 text-${feature.color}-500 mx-auto mb-4`} />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Tutorial Section - MANTIDO IGUAL */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-12 relative">
            {/* Anime-style section divider */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400/50 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-pink-400/50 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-purple-400/50 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-purple-500"></div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white relative">
                Platform Tutorials
                <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Comprehensive guides for each supported platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platformTutorials.map((tutorial, index) => (
              <Card
                key={tutorial.platform}
                className="border-purple-200 dark:border-purple-700/50 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Anime-style card accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <CardHeader className="border-b border-purple-200 dark:border-purple-800/30 relative">
                  <CardTitle className="flex items-center space-x-3 text-lg">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full flex items-center justify-center font-semibold relative">
                      {index + 1}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur animate-pulse"></div>
                    </div>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative">
                      {tutorial.platform}
                      <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ol className="space-y-3">
                    {tutorial.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full flex items-center justify-center font-semibold relative">
                          {stepIndex + 1}
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur animate-pulse"></div>
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Enhanced Ko-fi Floating Button - MANTIDO IGUAL */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 border border-purple-300/30 dark:border-purple-500/30 relative overflow-hidden group"
          onClick={() => window.open("https://ko-fi.com/waifuconvert", "_blank")}
        >
          {/* Anime-style button glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex flex-col items-center relative z-10">
            <Heart className="w-5 h-5" />
            <span className="text-xs">Ko-fi</span>
          </div>
        </Button>
      </div>

      {/* Enhanced Footer - MANTIDO IGUAL */}
      <footer className="border-t border-purple-200 dark:border-purple-800/50 bg-white/90 dark:bg-black/80 backdrop-blur-sm mt-16 relative">
        {/* Anime-style footer accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50"></div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center border border-purple-300/30 dark:border-purple-500/30 relative">
                <Heart className="w-4 h-4 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg blur animate-pulse"></div>
              </div>
              <div>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  © 2024 WaifuConvert. All rights reserved.
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-500">Gothic elegance meets modern functionality</p>
              </div>
            </div>

            <div className="flex space-x-6">
              <Link href="/terms">
                <Button
                  variant="link"
                  className="text-purple-600 dark:text-purple-300 p-0 h-auto hover:text-pink-600 dark:hover:text-pink-300 transition-colors relative group"
                >
                  <span className="relative z-10">Terms</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                </Button>
              </Link>
              <Link href="/privacy">
                <Button
                  variant="link"
                  className="text-purple-600 dark:text-purple-300 p-0 h-auto hover:text-pink-600 dark:hover:text-pink-300 transition-colors relative group"
                >
                  <span className="relative z-10">Privacy</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="link"
                  className="text-purple-600 dark:text-purple-300 p-0 h-auto hover:text-pink-600 dark:hover:text-pink-300 transition-colors relative group"
                >
                  <span className="relative z-10">Contact</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
