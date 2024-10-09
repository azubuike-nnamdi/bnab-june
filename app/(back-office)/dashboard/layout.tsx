// app/admin/layout.tsx

'use client';


import { Menu } from "@/components/common/menu";
import { Sidebar } from "@/components/common/sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { HOME_URL } from "@/config/routes";
import { useSession } from "next-auth/react";
import { Roboto_Mono } from "next/font/google";
import { redirect } from "next/navigation";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = useSession();
  const userRole = session?.data?.user?.role
  const role = process.env.NEXT_PUBLIC_SYSTEM_ROLE;

  if (userRole !== role) {
    redirect(HOME_URL)
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className={`${roboto.className} grid lg:grid-cols-5`}>
        <Sidebar className="hidden lg:block" />
        <div className="col-span-3 lg:col-span-4 lg:border-l overflow-x-hidden">
          <div className="h-full sm:px-4 py-6 lg:px-0">
            <Menu />
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
