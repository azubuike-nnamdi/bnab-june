
import { Menu } from "@/components/common/menu";
import { Sidebar } from "@/components/common/sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";



const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Hyea Me Ha",
    default: "Hyea Me Ha",
  },
  description: "...meet me there",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l overflow-x-hidden">
              <div className="h-full sm:px-4 py-6 lg:px-0">
                <Menu />
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}