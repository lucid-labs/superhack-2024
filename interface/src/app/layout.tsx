import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
      {/* <body className={inter.className}>{children}</body> */}
      <body className={inter.className}>
        <div className="flex overflow-hidden">
          <div className="">
            <Sidebar />
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
