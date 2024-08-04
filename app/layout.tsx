import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import TanstackProvider from "@/context/tanstackProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Hyea Me Ha",
  description: "Welcome to BNAB Junes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <TanstackProvider>
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
