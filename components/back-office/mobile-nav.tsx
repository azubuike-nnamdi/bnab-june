'use client';
import { BackOfficeNavItem } from "@/lib/data/data";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BackOfficeMobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="cursor-pointer text-gray-500 md:hidden absolute -top-3 left-4 z-50"
      >
        {!isMobileMenuOpen ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <TooltipProvider>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-90 flex flex-col items-center py-6 justify-center">
            <nav className="space-y-4">
              {BackOfficeNavItem.map((item) => (
                <Tooltip key={item.id}>
                  <TooltipTrigger
                    className={clsx(
                      'w-full text-white flex items-center py-3 px-4 rounded-md',
                      {
                        "bg-black": pathname === item.href,
                        "hover:bg-gray-700": pathname !== item.href,
                      }
                    )}
                  >
                    <Link href={item.href} className="flex items-center w-full">
                      <item.icon className="mr-2 h-5 w-5" />
                      <span className="text-lg">{item.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{item.title}</span>
                  </TooltipContent>
                </Tooltip>
              ))}
            </nav>
          </div>
        </TooltipProvider>
      )}
    </div>
  )
}
