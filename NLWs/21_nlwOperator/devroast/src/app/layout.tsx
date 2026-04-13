import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { TRPCProvider } from "@/components/providers/TRPCProvider";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "devroast",
  description: "Get your code roasted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} bg-background font-sans text-foreground antialiased`}
      >
        <TRPCProvider>
          <Navbar />
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
