import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers/jotai-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://1mi2mi.com"),
  title: {
    default: "1mi2mi",
    template: `%s | 1mi2mi`,
  },
  description: "1mi2mi",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      type: "image/x-icon",
    },
  ],
  manifest: "/manifest.json",
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
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://enesdmc.com",
    siteName: "1mi2mi",
    title: "1mi2mi",
    description: "1mi2mi",
    images: [
      {
        url: "https://1mi2mi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "1mi2mi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@enesdemirci",
    creator: "@enesdemirci",
    title: "1mi2mi",
    description: "1mi2mi",
    images: ["https://1mi2mi.com/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Enes Demirci" />
        <meta name="publisher" content="Enes Demirci" />
        <link rel="canonical" href="https://1mi2mi.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClerkProvider>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
