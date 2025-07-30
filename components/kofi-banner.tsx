"use client"

import { Heart, Coffee } from "lucide-react"

export function KofiBanner() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Banner Principal */}
      <div
        className="relative w-full h-48 bg-gradient-to-r from-purple-900 via-purple-700 to-pink-700 rounded-lg overflow-hidden shadow-2xl"
        style={{
          background: `
            linear-gradient(135deg, 
              #4c1d95 0%, 
              #7c3aed 25%, 
              #a855f7 50%, 
              #d946ef 75%, 
              #ec4899 100%
            )
          `,
        }}
      >
        {/* Elementos Decorativos de Fundo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-8 w-16 h-16 border border-white/30 rotate-45 animate-pulse"></div>
          <div className="absolute top-8 right-12 w-12 h-12 border border-white/20 rotate-12 animate-pulse delay-500"></div>
          <div className="absolute bottom-6 left-16 w-20 h-20 border border-white/10 -rotate-12 animate-pulse delay-1000"></div>
          <div className="absolute bottom-4 right-8 w-8 h-8 border border-white/25 rotate-45 animate-pulse delay-700"></div>
        </div>

        {/* Raios de Luz Anime */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/40 via-transparent to-transparent transform -skew-x-12"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform skew-x-12"></div>
        </div>

        {/* Partículas Flutuantes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-white/60 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-white/70 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-white/40 rounded-full animate-bounce delay-1000"></div>
        </div>

        {/* Conteúdo Principal */}
        <div className="relative z-10 flex items-center justify-center h-full px-8">
          <div className="text-center space-y-4">
            {/* Ícone de Café Estilizado */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 bg-white/10 rounded-full blur-lg animate-pulse"></div>
              </div>
            </div>

            {/* Texto Principal */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white relative">
                <span className="relative z-10">Support</span>
                <div className="absolute inset-0 text-white/20 blur-sm">Support</div>
              </h1>

              <h2 className="text-5xl font-bold relative">
                <span
                  className="bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent relative z-10"
                  style={{
                    textShadow: "0 0 20px rgba(255,255,255,0.5)",
                  }}
                >
                  WaifuConvert
                </span>
                <div className="absolute inset-0 text-white/10 blur-lg">WaifuConvert</div>
              </h2>

              <p className="text-white/90 text-lg font-medium">☕ Help keep the magic alive</p>
            </div>

            {/* Decoração Inferior */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-white/50"></div>
              <Heart className="w-4 h-4 text-pink-200 animate-pulse" />
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-white/50"></div>
            </div>
          </div>
        </div>

        {/* Borda Decorativa */}
        <div className="absolute inset-0 rounded-lg border-2 border-white/20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/40 via-pink-300/60 to-white/40"></div>
      </div>

      {/* Instruções */}
      <div className="mt-6 text-center space-y-2">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          📸 <strong>Como usar:</strong> Tire um screenshot deste banner e use no seu Ko-fi
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-xs">
          Ou use as ferramentas sugeridas abaixo para criar uma versão personalizada
        </p>
      </div>
    </div>
  )
}
