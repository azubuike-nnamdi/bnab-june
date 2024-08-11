import Link from "next/link"

import { cn } from "@/lib/utils"
import { CUSTOMER_URL, DASHBOARD_URL, SETTING_URL } from "@/config/routes"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={DASHBOARD_URL}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href={CUSTOMER_URL}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        href={SETTING_URL}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}
