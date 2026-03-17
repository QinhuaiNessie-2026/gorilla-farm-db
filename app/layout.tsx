import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Geist_Mono } from "next/font/google";
import "./globals.css";

const uiSans = DM_Sans({
  variable: "--font-ui-sans",
  subsets: ["latin"],
});

const displaySerif = DM_Serif_Display({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "生态数据库 | Gorilla Farm",
  description: "Gorilla Farm 生态数据库：农作物、物种、生态事件与数据概览。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${uiSans.variable} ${displaySerif.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
