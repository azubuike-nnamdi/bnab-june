// app/booking/layout.tsx
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import 'swiper/css';
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
