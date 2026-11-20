import type { Metadata } from "next";
import "./globals.css";
import "@xyflow/react/dist/style.css";

export const metadata: Metadata = {
  title: "Reality Replay — Explore Alternative Futures",
  description:
    "Don't just ask what will happen. Explore what could happen. An AI-powered decision exploration platform that transforms one life decision into multiple alternative timelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-background text-text-main flex flex-col font-sans selection:bg-sky selection:text-primary">
        {children}
      </body>
    </html>
  );
}
