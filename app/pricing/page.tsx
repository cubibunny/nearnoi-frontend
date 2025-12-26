"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Client, Databases } from "appwrite"
import Link from "next/link"

// Appwrite configuration
const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1"
const APPWRITE_PROJECT_ID = "694e37310033e3740bf9"
const DATABASE_ID = "694e411f0016626167da"
const PRICING_COLLECTION_ID = "pricing"
const PRICING_DOCUMENT_ID = "694e42110029899959ec"
const RATES_COLLECTION_ID = "rates"

// Model IDs and metadata
const TEXT_MODEL_IDS = {
  "694e667c001c3e1ba692": { name: "GPT-5.2" },
  "694e669100397928f21d": { name: "GPT-5.2 Pro" },
  "694e66c500165e4c152f": { name: "GPT-5 Mini" },
  "694e66cf00064cb1803e": { name: "GPT-4.1" },
  "694e66e7002175034590": { name: "GPT-4.1 Mini" },
  "694e66f4002aa4ec1e64": { name: "GPT-4.1 Nano" },
}

const IMAGE_MODEL_IDS = {
  "694e6ddb00153001264f": { name: "GPT-Image-1.5" },
  "694e6de7002e239920d5": { name: "GPT-Image-1" },
  "694e6df2000f1c710a60": { name: "GPT-Image-1 Mini" },
}

const WEB_SEARCH_ID = "694e6e170000db008b52"

interface TextModel {
  id: string
  name: string
  inputPrice1M: number
  outputPrice1M: number
}

interface ImageModel {
  id: string
  name: string
  pricePerImage: number
}

interface WebSearchModel {
  pricePer1kCalls: number
}

export default function PricingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [nearPrice, setNearPrice] = useState<number | null>(null)
  const [textModels, setTextModels] = useState<TextModel[]>([])
  const [imageModels, setImageModels] = useState<ImageModel[]>([])
  const [webSearch, setWebSearch] = useState<WebSearchModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const client = new Client()
          .setEndpoint(APPWRITE_ENDPOINT)
          .setProject(APPWRITE_PROJECT_ID)

        const databases = new Databases(client)

        // Fetch NEAR price
        const pricingDoc = await databases.getDocument(
          DATABASE_ID,
          PRICING_COLLECTION_ID,
          PRICING_DOCUMENT_ID
        )
        setNearPrice(parseFloat(pricingDoc.price_usd))

        // Fetch text models
        const textModelPromises = Object.entries(TEXT_MODEL_IDS).map(async ([id, meta]) => {
          const doc = await databases.getDocument(DATABASE_ID, RATES_COLLECTION_ID, id)
          return {
            id,
            name: meta.name,
            inputPrice1M: doc["price1M"] || 0,
            outputPrice1M: doc["price1M-output"] || 0,
          }
        })
        const textModelData = await Promise.all(textModelPromises)
        setTextModels(textModelData)

        // Fetch image models
        const imageModelPromises = Object.entries(IMAGE_MODEL_IDS).map(async ([id, meta]) => {
          const doc = await databases.getDocument(DATABASE_ID, RATES_COLLECTION_ID, id)
          return {
            id,
            name: meta.name,
            pricePerImage: doc["price1K"] || 0,
          }
        })
        const imageModelData = await Promise.all(imageModelPromises)
        setImageModels(imageModelData)

        // Fetch web search
        const webSearchDoc = await databases.getDocument(DATABASE_ID, RATES_COLLECTION_ID, WEB_SEARCH_ID)
        setWebSearch({
          pricePer1kCalls: webSearchDoc["price1K"] || 0,
        })

        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch pricing data:", err)
        setError("Failed to load pricing data. Please try again later.")
        setLoading(false)
      }
    }

    fetchPricingData()
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

        <main className="flex-1 container mx-auto px-4 py-24 md:py-32 max-w-6xl">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                Simple, Transparent <span className="text-primary">Pricing</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pay only for what you use. All prices in NEAR tokens.
              </p>
            </div>

            {/* NEAR Price Card */}
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/80 to-card/50 backdrop-blur-xl p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30">
                    <img 
                      src="/near_icon.png" 
                      alt="NEAR Protocol" 
                      className="w-12 h-12"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">NEAR Protocol</h2>
                    <p className="text-muted-foreground">Current Market Price</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  {loading ? (
                    <div className="animate-pulse">
                      <div className="h-12 w-32 bg-muted rounded-lg" />
                    </div>
                  ) : nearPrice ? (
                    <div className="text-5xl font-bold text-primary">
                      ${nearPrice.toFixed(2)}
                      <span className="text-lg text-muted-foreground ml-2">USD</span>
                    </div>
                  ) : (
                    <div className="text-2xl text-muted-foreground">--</div>
                  )}
                </div>
              </div>
              <div className="relative mt-6 pt-4 border-t border-border/30 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Powered by</span>
                <Link 
                  href="https://www.coingecko.com/en/coins/near" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  CoinGecko API
                </Link>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
                {error}
              </div>
            )}

            {/* Text Models Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Text Models</h2>
                <p className="text-muted-foreground">Prices per 1M tokens in NEAR</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 bg-background/30">
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Model</th>
                      <th className="px-6 py-4 text-right font-semibold text-foreground">Input <span className="text-muted-foreground font-normal text-sm">/1M tokens</span></th>
                      <th className="px-6 py-4 text-right font-semibold text-foreground">Output <span className="text-muted-foreground font-normal text-sm">/1M tokens</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      [...Array(6)].map((_, idx) => (
                        <tr key={idx} className="border-b border-border/20">
                          <td className="px-6 py-4"><div className="h-5 w-32 bg-muted/50 rounded animate-pulse" /></td>
                          <td className="px-6 py-4 text-right"><div className="h-5 w-20 bg-muted/50 rounded animate-pulse ml-auto" /></td>
                          <td className="px-6 py-4 text-right"><div className="h-5 w-20 bg-muted/50 rounded animate-pulse ml-auto" /></td>
                        </tr>
                      ))
                    ) : (
                      textModels.map((model) => (
                        <tr key={model.id} className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-foreground">{model.name}</td>
                            <td className="px-6 py-4 text-right">
                            <span className="text-primary font-semibold">{model.inputPrice1M.toFixed(2)}</span>
                            <img 
                              src="/near_icon.png" 
                              alt="NEAR Protocol" 
                              className="w-4 h-4 inline ml-1"
                            />
                            </td>
                            <td className="px-6 py-4 text-right">
                            <span className="text-primary font-semibold">{model.outputPrice1M.toFixed(2)}</span>
                            <img 
                              src="/near_icon.png" 
                              alt="NEAR Protocol" 
                              className="w-4 h-4 inline ml-1"
                            />
                            </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Image Models Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Image Models</h2>
                <p className="text-muted-foreground">
                  Fixed price per image generation<sup className="text-primary">1</sup>
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 bg-background/30">
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Model</th>
                      <th className="px-6 py-4 text-right font-semibold text-foreground">Price per Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      [...Array(3)].map((_, idx) => (
                        <tr key={idx} className="border-b border-border/20">
                          <td className="px-6 py-4"><div className="h-5 w-36 bg-muted/50 rounded animate-pulse" /></td>
                          <td className="px-6 py-4 text-right"><div className="h-5 w-20 bg-muted/50 rounded animate-pulse ml-auto" /></td>
                        </tr>
                      ))
                    ) : (
                      imageModels.map((model) => (
                        <tr key={model.id} className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-foreground">{model.name}</td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-primary font-semibold">{model.pricePerImage.toFixed(2)}</span>
                            <img 
                              src="/near_icon.png" 
                              alt="NEAR Protocol" 
                              className="w-4 h-4 inline ml-1"
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Web Search Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Web Search Tool</h2>
                <p className="text-muted-foreground">
                  Price per 1,000 tool calls<sup className="text-primary">2</sup>
                </p>
              </div>

              <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">Web Search</h3>
                    <p className="text-sm text-muted-foreground">Real-time web search capabilities for AI models</p>
                  </div>
                  {loading ? (
                    <div className="h-10 w-28 bg-muted/50 rounded animate-pulse" />
                  ) : webSearch ? (
                    <div className="text-4xl font-bold">
                      <span className="text-primary">{webSearch.pricePer1kCalls.toFixed(2)}</span>
                        <img 
                        src="/near_icon.png" 
                        alt="NEAR Protocol" 
                        className="w-5 h-5 inline ml-1"
                        />
                    </div>
                  ) : (
                    <div className="text-2xl text-muted-foreground">--</div>
                  )}
                </div>
              </div>
            </div>

            {/* Footnotes */}
            <div className="pt-8 border-t border-border/30 space-y-3 text-sm">
              <p className="text-muted-foreground">
                <sup className="text-primary">1</sup> Fixed price per image generation. Each request supports up to 1K text tokens and up to 4 4K resolution image inputs.
              </p>
              <p className="text-muted-foreground">
                <sup className="text-primary">2</sup> Web Search pricing is per 1,000 tool calls made to the web search functionality.
              </p>
              <p className="text-muted-foreground mt-6 pt-4 border-t border-border/20">
                All prices are in NEAR (Ⓝ) tokens. Prices are automatically updated based on real-time NEAR/USD exchange rates.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
