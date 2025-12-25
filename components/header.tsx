"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Header() {
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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] lg:w-[calc(100%-4rem)] max-w-[90rem]">
      <div
        className="absolute inset-0 rounded-full bg-[linear-gradient(to_right,#4a5cb8_1px,transparent_1px),linear-gradient(to_bottom,#4a5cb8_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-0 pointer-events-none"
        style={{
          maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.6) 0%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.6) 0%, transparent 70%)`,
          opacity: 1,
        }}
      />

      <div className="relative flex h-14 lg:h-16 items-center justify-between px-6 lg:px-12 xl:px-16 rounded-full border border-border/40 bg-background/1 backdrop-blur-xl">
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg lg:text-xl font-bold tracking-tight text-foreground font-[family-name:var(--font-display)]">
              NearNoi
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-6 lg:gap-10">
          <Link
            href="https://dashboard.nearnoi.dev/api"
            className="text-sm lg:text-base text-muted-foreground transition-colors hover:text-foreground"
          >
            API
          </Link>
          <Link
            href="https://nearnoi.dev/pricing"
            className="text-sm lg:text-base text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 lg:h-10 lg:px-6">
            <Link href="https://dashboard.nearnoi.dev">Dashboard</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
