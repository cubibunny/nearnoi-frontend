"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.9)_100%)]" />

      <div
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#3a3a4a_1px,transparent_1px),linear-gradient(to_bottom,#3a3a4a_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#4a5cb8_1px,transparent_1px),linear-gradient(to_bottom,#4a5cb8_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-0 transition-opacity duration-300"
        style={{
          maskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)`,
          opacity: 1,
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Hero />
        </main>

        <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-between pointer-events-none">
          <Link
            href="/terms"
            className="pointer-events-auto px-4 py-2 rounded-full border border-border/40 bg-background/10 backdrop-blur-xl text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="pointer-events-auto px-4 py-2 rounded-full border border-border/40 bg-background/10 backdrop-blur-xl text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
