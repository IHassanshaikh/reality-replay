import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@xyflow/react/dist/style.css";

export const viewport: Viewport = {
  themeColor: "#1B3B6F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://realityreplay.app"),
  title: {
    default: "Reality Replay — Explore What Could Happen | AI Decision Simulator",
    template: "%s | Reality Replay",
  },
  description:
    "Don't just ask what will happen. Explore what could happen. An AI-powered decision exploration platform that transforms one life decision into multiple alternative timelines across Month 3, Year 1, and Year 3.",
  keywords: [
    "AI Decision Simulator",
    "Decision Making Tool",
    "Branching Timelines",
    "Scenario Engine",
    "Career Crossroads",
    "Hypothetical Possibilities",
    "Interactive Decision Tree",
    "Hassan Shaikh",
  ],
  authors: [{ name: "Hassan Shaikh", url: "https://instagram.com/hassan.techlife" }],
  creator: "Hassan Shaikh",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo.svg" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://realityreplay.app",
    siteName: "Reality Replay",
    title: "Reality Replay — Explore Alternative Futures",
    description:
      "Transform your real life decisions into interactive, navigable multi-horizon timelines. Powered by Gemini 2.5 Flash.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Reality Replay — AI Decision Exploration Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reality Replay — AI Decision Exploration",
    description:
      "Don't just ask what will happen. Explore what could happen. Interactive timeline simulation for major life and career choices.",
    creator: "@hassan_techlife",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Reality Replay",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Hassan Shaikh",
      email: "hassanshaikh9717@gmail.com",
      url: "https://instagram.com/hassan.techlife",
    },
    description:
      "An AI-powered decision exploration platform that transforms one life decision into multiple alternative timelines, allowing users to explore how different choices lead to distinct outcomes.",
  };

  return (
    <html lang="en" className="antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-text-main flex flex-col font-sans selection:bg-sky selection:text-primary">
        {children}
      </body>
    </html>
  );
}
