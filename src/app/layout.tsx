import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "@/providers/ContextProvider";
require("@solana/wallet-adapter-react-ui/styles.css");

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TM ICO | Tokenminds",
  description:
    "This is TM ICO website that is ready for development. It includes a hero section, about section, and a blockchain animation. It is built with Next.js, TypeScript, Tailwind CSS, and Vercel. It is also optimized for SEO and performance.",
  keywords: [
    "crypto",
    "ico",
    "blockchain",
    "tokenminds",
    "next.js",
    "typescript",
    "tailwindcss",
    "vercel",
  ],
  authors: [
    {
      name: "Tokenminds",
      url: "https://tokenminds.co",
    },
  ],
  creator: "Tokenminds",
  publisher: "Tokenminds",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tm-ico.vercel.app/",
    siteName: "TM ICO | Tokenminds",
    title: "TM ICO | Tokenminds",
    description:
      "This is TM ICO website that is ready for development. It includes a hero section, about section, and a blockchain animation. It is built with Next.js, TypeScript, Tailwind CSS, and Vercel. It is also optimized for SEO and performance.",
    images: [
      {
        url: "https://tm-ico.vercel.app/assets/images/icon.png",
        width: 1200,
        height: 630,
        alt: "TM ICO | Tokenminds",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="bottom-left" reverseOrder={false} />
          {children}
        </body>
      </html>
    </ContextProvider>
  );
}
