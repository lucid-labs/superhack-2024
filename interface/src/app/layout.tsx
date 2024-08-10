import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuciBot ChatD5",
  description: "Lucibot powered by Lucidity's AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/lucidity.png" />
      </head>
        <body className={inter.className}>{children}</body>
    </html>
  );
}
