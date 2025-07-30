"use client"

import { useState, useEffect } from "react"
import { Heart, Upload } from "lucide-react"
import { ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface CustomLogoProps {
  logoUrl?: string
  onLogoChange?: (url: string) => void
}

export function CustomLogo({ logoUrl, onLogoChange }: CustomLogoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [currentLogo, setCurrentLogo] = useState("")
  const [tempUrl, setTempUrl] = useState("")

  // 🎌 SUA LOGO WAIFU ESCOLHIDA COMO PADRÃO
  const defaultLogo = "https://i.pinimg.com/736x/e1/7e/df/e17edf724637fd9ee932fc43ff9aecf1.jpg"

  useEffect(() => {
    // Carrega logo do localStorage ou usa sua logo escolhida
    const savedLogo = localStorage.getItem("waifuconvert-logo")
    const logoToUse = savedLogo || logoUrl || defaultLogo
    setCurrentLogo(logoToUse)
    setTempUrl(logoToUse)
    if (onLogoChange) {
      onLogoChange(logoToUse)
    }
  }, [logoUrl, onLogoChange])

  const handleSave = () => {
    if (tempUrl) {
      setCurrentLogo(tempUrl)
      localStorage.setItem("waifuconvert-logo", tempUrl)
      if (onLogoChange) {
        onLogoChange(tempUrl)
      }
    }
    setIsEditing(false)
  }

  const handleReset = () => {
    setCurrentLogo(defaultLogo)
    setTempUrl(defaultLogo)
    localStorage.setItem("waifuconvert-logo", defaultLogo)
    if (onLogoChange) {
      onLogoChange(defaultLogo)
    }
    setIsEditing(false)
  }

  const handleUseDefault = () => {
    setCurrentLogo(defaultLogo)
    setTempUrl(defaultLogo)
    localStorage.setItem("waifuconvert-logo", defaultLogo)
    if (onLogoChange) {
      onLogoChange(defaultLogo)
    }
    setIsEditing(false)
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="relative group">
        {currentLogo ? (
          <img
            src={currentLogo || "/placeholder.svg"}
            alt="WaifuConvert Logo"
            className="w-10 h-10 rounded-lg object-cover border border-purple-500/30 shadow-lg"
            onError={() => {
              // Se a imagem falhar, volta para a padrão
              setCurrentLogo(defaultLogo)
              localStorage.setItem("waifuconvert-logo", defaultLogo)
            }}
          />
        ) : (
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg border border-purple-500/30">
            <Heart className="w-5 h-5 text-white" />
          </div>
        )}

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-purple-600 hover:bg-purple-700 text-white opacity-0 group-hover:opacity-100 transition-opacity p-0"
            >
              <Upload className="w-3 h-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-900 border-purple-300 dark:border-purple-700/50 text-gray-900 dark:text-white">
            <DialogHeader>
              <DialogTitle className="text-purple-600 dark:text-purple-300 flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span>Customize Logo</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Logo Image URL
                </label>
                <Input
                  type="url"
                  placeholder="https://example.com/your-logo.png"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-800 border-purple-300 dark:border-purple-600/50 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Paste a direct link to your logo image (PNG, JPG, SVG)
                </p>
              </div>

              {tempUrl && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                  <img
                    src={tempUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="w-16 h-16 rounded-lg object-cover mx-auto border border-purple-300 dark:border-purple-500/30"
                    onError={() => setTempUrl("")}
                  />
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  onClick={handleSave}
                  className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
                  disabled={!tempUrl}
                >
                  💾 Save Logo
                </Button>
                <Button
                  onClick={handleUseDefault}
                  variant="outline"
                  className="border-purple-300 dark:border-purple-600/50 text-purple-600 dark:text-purple-300 bg-transparent hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  🎌 Default
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-purple-300 dark:border-purple-600/50 text-purple-600 dark:text-purple-300 bg-transparent hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  🔄 Reset
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  💡 Your logo choice is saved permanently in your browser
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          WaifuConvert
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">Gothic Video Converter</p>
      </div>
    </div>
  )
}
