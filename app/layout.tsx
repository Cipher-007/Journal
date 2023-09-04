import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import logo from "../public/logo.ico";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diary Insights",
  description: "AI Generated Insights from your diary",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <head>
          <link rel='icon' href='/logo.svg' sizes='any' />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
