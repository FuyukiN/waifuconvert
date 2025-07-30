"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { KofiBanner } from "@/components/kofi-banner"

export default function BannerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-black dark:via-purple-950/50 dark:to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="text-purple-600 dark:text-purple-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao WaifuConvert
            </Button>
          </Link>
        </div>

        {/* Título */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Banner{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Ko-fi</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Seu banner personalizado para o Ko-fi</p>
        </div>

        {/* Banner */}
        <KofiBanner />

        {/* Alternativas */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="border-purple-200 dark:border-purple-700/50">
            <CardHeader>
              <CardTitle className="text-purple-600 dark:text-purple-300">🎨 Ferramentas Recomendadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Canva:</strong> Templates Ko-fi prontos
                <br />
                <span className="text-gray-500">canva.com → "Ko-fi banner"</span>
              </div>
              <div>
                <strong>Figma:</strong> Design profissional
                <br />
                <span className="text-gray-500">figma.com → Criar novo design</span>
              </div>
              <div>
                <strong>GIMP:</strong> Software gratuito
                <br />
                <span className="text-gray-500">gimp.org → Download grátis</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-700/50">
            <CardHeader>
              <CardTitle className="text-purple-600 dark:text-purple-300">📐 Especificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Tamanho Ko-fi:</strong> 1200x400px
              </div>
              <div>
                <strong>Cores:</strong> Purple (#7c3aed) → Pink (#ec4899)
              </div>
              <div>
                <strong>Fonte:</strong> Bold, sans-serif
              </div>
              <div>
                <strong>Texto:</strong> "Support WaifuConvert ☕"
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
