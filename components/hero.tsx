"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/60 px-4 py-1.5 text-sm text-white">
            <Sparkles className="h-4 w-4" />
            <span>v1 now in development!</span>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            AI Models, Powered by <span className="text-primary">Crypto</span>
          </h1>

          <p className="mb-10 text-pretty text-base text-muted-foreground sm:text-lg lg:text-xl leading-relaxed">
            Access leading AI models through our unified API.<br />Pay seamlessly with NEAR, no credit card required.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="https://dashboard.nearnoi.dev">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary bg-transparent"
            >
              <Link href="https://dashboard.nearnoi.dev/api">View Documentation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
