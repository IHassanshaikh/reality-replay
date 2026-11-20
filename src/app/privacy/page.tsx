import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ShieldCheck, Lock, EyeOff, Server, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Reality Replay",
  description:
    "Privacy Policy for Reality Replay. Learn how your decision data, personal context, and simulations are handled privately by default.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3 border-b border-border pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>PRIVATE BY DEFAULT</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-main">
              Privacy Policy
            </h1>
            <p className="text-xs text-text-muted font-mono">
              Last updated: November 2026 · Maintained by Hassan Shaikh
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-sm text-text-body leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-xl text-text-main">
                1. Our Core Privacy Philosophy
              </h2>
              <p>
                Life decisions and career dilemmas are inherently personal and sensitive. At <strong>Reality Replay</strong>, we treat your decision inputs, options, personal constraints, and financial runway metrics with strict confidentiality. Your saved decision replays are <strong>private by default</strong> and never published to public discovery feeds or search engine indexes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-xl text-text-main">
                2. Information We Process
              </h2>
              <p>When you use Reality Replay to explore hypothetical futures, you provide:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-text-body">
                <li><strong>Decision Dilemma:</strong> The primary question you are exploring.</li>
                <li><strong>Options:</strong> Up to 4 alternatives you wish to project.</li>
                <li><strong>Bio & Background Context:</strong> Role, domain, experience level, financial runway, and risk profile.</li>
                <li><strong>Diagnostic Probe Answers:</strong> Primary motivation, worst-case fear, urgency window, and stakeholders.</li>
                <li><strong>Personal Priorities:</strong> The core values guiding your trade-off analysis.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-xl text-text-main">
                3. AI Processing & Third-Party APIs
              </h2>
              <p>
                To generate multi-horizon scenario timelines, your normalized decision context is processed by <strong>Google Gemini API</strong> (Gemini 2.5 Flash). We transmit only the context necessary to synthesize your scenario graph. Data processed through the enterprise Gemini API is governed by Google Cloud&apos;s privacy policies and is not used to train global public foundational models.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-xl text-text-main">
                4. Data Storage & Retention
              </h2>
              <p>
                Saved replays and branches are persisted in secure local storage and protected server stores. You have full sovereignty over your data and can delete any saved replay at any time from your Dashboard. Deletion permanently purges the associated scenario trees, timeline milestones, and assumptions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading font-bold text-xl text-text-main">
                5. Contact Us Regarding Privacy
              </h2>
              <p>
                For any privacy questions or data deletion requests, contact Hassan Shaikh directly:
              </p>
              <div className="p-4 rounded-xl border border-border bg-surface flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <span className="font-bold text-text-main block">Hassan Shaikh</span>
                  <a
                    href="mailto:hassanshaikh9717@gmail.com"
                    className="text-primary hover:underline font-mono text-xs"
                  >
                    hassanshaikh9717@gmail.com
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
