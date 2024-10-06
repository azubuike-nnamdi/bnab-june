import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LOGIN_URL } from "@/config/routes";
import { getFirstName } from "@/lib/helper";
import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


export function UserNav() {
  const { data: session } = useSession();

  return (
    <main>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            {getFirstName(session?.user?.name)}

            <ChevronDown className="ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Button
              className="w-full text-white"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="gap-4 flex">
          <Link href={LOGIN_URL}>
            <Button>
              Log In
            </Button>
          </Link>
        </div>
      )}
    </main>

  )
}
