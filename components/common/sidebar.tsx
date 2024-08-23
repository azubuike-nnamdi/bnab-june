"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BackOfficeNavItem } from "@/lib/data/data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import clsx from "clsx"
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function Sidebar({ className }: Readonly<SidebarProps>) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="hidden md:block">
        <div className="space-y-4 py-4">
          <TooltipProvider>
            <div className="px-3 py-2">
              <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Hyea Me Ha
                  </h2>
                  <span className="text-yellow-500 text-sm">...meet me there</span>
                </div>
                <div className="space-y-1">
                  {BackOfficeNavItem.map((item) => (
                    <Tooltip key={item.id}>
                      <TooltipTrigger className={clsx('w-full', {
                        "bg-black text-white rounded-sm": pathname === item.href,
                        "text-muted-foreground hover:text-foreground":
                          pathname !== item.href,
                      },)}>
                        <Link href={item.href}>
                          <Button variant="ghost" className="w-full justify-start">
                            <item.icon className="mr-2 h-4 w-4" />
                            <span className="text-md">{item.title}</span>
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>{item.title}</span>
                      </TooltipContent>
                    </Tooltip>
                  ))}

                </div>
              </nav>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
