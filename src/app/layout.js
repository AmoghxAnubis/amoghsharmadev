import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "Amogh | Full Stack Developer & ML Engineer",
  description:
    "Portfolio of Amogh — a full-stack developer, ML engineer, cloud architect, blockchain developer, and UI/UX designer crafting digital experiences at the intersection of design and technology.",
  keywords: [
    "Amogh",
    "Full Stack Developer",
    "ML Engineer",
    "Portfolio",
    "React",
    "Next.js",
    "Python",
    "Machine Learning",
    "Cloud Architecture",
    "Blockchain",
    "UI/UX Design",
  ],
  authors: [{ name: "Amogh" }],
  openGraph: {
    title: "Amogh | Full Stack Developer & ML Engineer",
    description:
      "Crafting digital experiences at the intersection of design and technology.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amogh | Full Stack Developer & ML Engineer",
    description:
      "Crafting digital experiences at the intersection of design and technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import SpotifyPlayer from "@/components/SpotifyPlayer/SpotifyPlayer";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
        <SpotifyPlayer />
      </body>
    </html>
  );
}
