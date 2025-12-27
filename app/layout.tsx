import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobTrackr | Career Pipeline",
  description: "Production-ready job application tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-[#020617] text-slate-200 antialiased overflow-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
