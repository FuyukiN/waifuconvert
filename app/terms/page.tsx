"use client"

import { ArrowLeft, Shield, AlertTriangle, Users, FileText, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function TermsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-black dark:via-purple-950/50 dark:to-gray-900 relative overflow-hidden">
      {/* Gothic Anime Background Elements - Same as main page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-purple-300/30 dark:border-purple-500/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-pink-300/30 dark:border-pink-500/20 rotate-12 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 border border-purple-200/20 dark:border-purple-400/10 -rotate-12 animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 border border-pink-200/30 dark:border-pink-400/20 rotate-45 animate-pulse delay-700"></div>

        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-purple-300/20 dark:from-purple-500/20 via-transparent to-transparent transform -skew-x-12"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-pink-300/20 dark:from-pink-500/20 via-transparent to-transparent transform skew-x-12"></div>

        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-purple-400/40 dark:bg-purple-400/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-pink-400/50 dark:bg-pink-400/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-purple-300/30 dark:bg-purple-300/20 rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Header */}
      <header className="border-b border-purple-200 dark:border-purple-800/50 bg-white/90 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to WaifuConvert
            </Button>
          </Link>

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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-purple-400 dark:via-purple-500 to-transparent"></div>
                <div className="w-4 h-0.5 bg-gradient-to-r from-transparent via-pink-400 dark:via-pink-500 to-transparent"></div>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="w-1 h-16 bg-gradient-to-b from-purple-500 to-transparent animate-pulse"></div>
              <div className="space-y-2 relative">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white relative">
                  Terms of{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative">
                    Service
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-lg -z-10"></div>
                  </span>
                </h1>
                <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto animate-pulse"></div>
              </div>
              <div className="w-1 h-16 bg-gradient-to-b from-pink-500 to-transparent animate-pulse delay-500"></div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 relative">
              Simple and clear rules for using WaifuConvert safely and legally
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
            </p>
          </div>

          {/* Terms Cards */}
          <div className="space-y-6">
            <Card className="border-purple-200 dark:border-purple-700/50 shadow-2xl bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-pink-500/50 to-transparent"></div>

              <CardHeader className="border-b border-purple-200 dark:border-purple-800/30 relative">
                <CardTitle className="text-gray-900 dark:text-white flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <Shield className="w-5 h-5 text-purple-500" />
                  <span className="relative">
                    1. Acceptance of Terms
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  By using WaifuConvert, you agree to these terms of service. If you don't agree, please don't use our
                  service.
                </p>
                <p>
                  These terms may be updated periodically. We recommend checking this page regularly for any changes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-700/50 shadow-2xl bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-pink-500/50 to-transparent"></div>

              <CardHeader className="border-b border-purple-200 dark:border-purple-800/30 relative">
                <CardTitle className="text-gray-900 dark:text-white flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <Users className="w-5 h-5 text-purple-500" />
                  <span className="relative">
                    2. Permitted Use
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  <strong className="text-gray-900 dark:text-white">✅ Allowed:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Convert public videos for personal use</li>
                  <li>Download content you own rights to</li>
                  <li>Use for educational and non-commercial purposes</li>
                  <li>Share WaifuConvert link with friends</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-700/50 shadow-2xl bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-pink-500/50 to-transparent"></div>

              <CardHeader className="border-b border-purple-200 dark:border-purple-800/30 relative">
                <CardTitle className="text-gray-900 dark:text-white flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <AlertTriangle className="w-5 h-5 text-purple-500" />
                  <span className="relative">
                    3. Prohibited Use
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  <strong className="text-gray-900 dark:text-white">❌ Prohibited:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Download copyrighted content without permission</li>
                  <li>Use for commercial purposes without authorization</li>
                  <li>Attempt to break or bypass service limitations</li>
                  <li>Use for spam or malicious activities</li>
                  <li>Redistribute downloaded content without rights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-700/50 shadow-2xl bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-pink-500/50 to-transparent"></div>

              <CardHeader className="border-b border-purple-200 dark:border-purple-800/30 relative">
                <CardTitle className="text-gray-900 dark:text-white flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <FileText className="w-5 h-5 text-purple-500" />
                  <span className="relative">
                    4. Responsibilities
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-gray-700 dark:text-gray-300 space-y-4">
                <div>
                  <p>
                    <strong className="text-gray-900 dark:text-white">Your Responsibilities:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Verify you have rights to download the content</li>
                    <li>Respect creators' copyrights</li>
                    <li>Use the service ethically and legally</li>
                    <li>Don't overload our servers</li>
                  </ul>
                </div>

                <div>
                  <p>
                    <strong className="text-gray-900 dark:text-white">Our Responsibilities:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Provide the service to the best of our ability</li>
                    <li>Protect your privacy (we don't store your data)</li>
                    <li>Keep the service secure and updated</li>
                    <li>Be transparent about limitations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-700/50 shadow-2xl bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-pink-500/50 to-transparent"></div>

              <CardHeader className="border-b border-purple-200 dark:border-purple-800/30 relative">
                <CardTitle className="text-gray-900 dark:text-white flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="relative">
                    5. Contact
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-gray-700 dark:text-gray-300">
                <p>
                  Questions about these terms? Contact us through our{" "}
                  <Link
                    href="/contact"
                    className="text-purple-600 dark:text-purple-400 hover:text-pink-600 dark:hover:text-pink-400 underline transition-colors"
                  >
                    contact page
                  </Link>
                  .
                </p>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {new Date().toLocaleDateString("en-US")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-200 dark:border-purple-800/50 bg-white/90 dark:bg-black/80 backdrop-blur-sm mt-16 relative">
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
                  © 2025 WaifuConvert. All rights reserved.
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-500">Gothic elegance meets modern functionality</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
