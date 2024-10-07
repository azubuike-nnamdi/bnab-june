import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HOME_URL, LOGIN_URL } from "@/config/routes";
import { getFirstName } from "@/lib/helper";
import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";



export function UserNav() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut(); // Await the sign out
    // Redirect to the homepage after signing out
    window.location.href = HOME_URL; // Or use your desired URL
  };
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
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="gap-4 flex text-white">
          <Link href={LOGIN_URL}>
            <Button className="text-white">
              Log In
            </Button>
          </Link>
        </div>
      )}
    </main>

  )
}
