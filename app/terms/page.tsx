"use client"

import { Header } from "@/components/header"

export default function TermsPage() {
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

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-24 md:py-32 max-w-4xl">
          <div className="prose prose-invert prose-lg max-w-none">
            <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 25, 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using the NearNoi platform ("Service"), accessible from nearnoi.me and dashboard.nearnoi.me, you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
              <p className="text-muted-foreground">
                NearNoi provides an API gateway that allows users to access various Artificial Intelligence models, including but not limited to those provided by OpenAI, Anthropic, and others. The Service enables users to pay for these services using the NEAR Protocol cryptocurrency.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Obligations & AI Policy Compliance</h2>
              <p className="text-muted-foreground mb-4">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. Specifically, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You will comply with all applicable laws and regulations.</li>
                <li>You will strictly adhere to the usage policies, terms of service, and safety guidelines of the underlying model providers, including <strong>OpenAI's Usage Policies</strong>, <strong>Sharing & Publication Policy</strong>, and any other applicable terms.</li>
                <li>You will not use the Service to generate harmful, illegal, or abusive content.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Payments and Billing</h2>
              <p className="text-muted-foreground">
                All payments on NearNoi are processed using the NEAR Protocol. You are responsible for ensuring you have sufficient funds and for the security of your NEAR wallet. Payments made for API credits or subscriptions are generally non-refundable, except as required by law or at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Data Sharing and Third-Party Providers</h2>
              <p className="text-muted-foreground">
                NearNoi acts as an intermediary. By using the Service, you explicitly consent to the transmission of your input data and the reception of output data to and from third-party AI model providers (e.g., OpenAI). You acknowledge that these providers may process and retain data in accordance with their own privacy policies and terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall NearNoi, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us at support@nearnoi.me.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
