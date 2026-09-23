import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Evergreen Reviews — Turn happy customers into Google reviews",
    template: "%s · Evergreen Reviews",
  },
  description:
    "Evergreen Reviews helps local service businesses build a simple, consistent system for generating genuine Google reviews.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} h-full`}>
      <body className="min-h-full bg-sand-50 font-sans text-ink-900 antialiased">
        {children}
      </body>
    </html>
  );
}
