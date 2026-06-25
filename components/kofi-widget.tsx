"use client"

import Script from "next/script"

declare global {
  interface Window {
    kofiWidgetOverlay?: {
      draw: (username: string, options: Record<string, string>) => void
    }
  }
}

export function KofiWidget() {
  return (
    <Script
      src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        window.kofiWidgetOverlay?.draw("waifuconvert", {
          type: "floating-chat",
          "floating-chat.donateButton.text": "Support me",
          "floating-chat.donateButton.background-color": "#794bc4",
          "floating-chat.donateButton.text-color": "#fff",
        })
      }}
    />
  )
}
