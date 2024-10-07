'use client';
import { menuItems } from "@/lib/data/data";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { redirect, usePathname } from "next/navigation";
import clsx from "clsx";
import { HOME_URL, LOGIN_URL, REGISTER_URL } from "@/config/routes";
import { getFirstName } from "@/lib/helper";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut(); // Await the sign out
    redirect(HOME_URL); // Redirect to the homepage after sign out
  };
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center w-full h-20 px-6 py-2 text-white bg-black nav">
      <div>
        <Link className="link-underline link-underline-black" href={HOME_URL} rel="noreferrer">
          <h1 className="text-3xl font-signature font-bold">Hyea Me Ha</h1>
          <span className="text-yellow-500">...meet me there</span>
        </Link>
      </div>

      <ul className="hidden md:flex">
        {menuItems.map(({ id, title, path, subMenu }) => (
          <li key={id} className={clsx("nav-links px-4 cursor-pointer capitalize font-medium hover:scale-105 duration-200 link-underline", { "text-yellow-500": pathname === path, "text-gray-500 hover:text-white": pathname !== path })}>
            {subMenu ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  {title} <ChevronDown className="ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {subMenu.map(({ id, path, title }) => (
                    <DropdownMenuItem key={id}>
                      <Link href={path}>{title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={path}>{title}</Link>
            )}
          </li>
        ))}
      </ul>

      {/* Sign Menu */}
      <div className="hidden md:flex gap-5 items-center">
        <Link href={"tel:+233 24 111 1122"} className="flex gap-2 items-center">
          <Phone className="h-3 w-3" />
          <span>+233 24 111 1122</span>
        </Link>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              {getFirstName(session?.user?.name)}
              <ChevronDown className="ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Button
                className="w-full"
                onClick={handleSignOut}
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
            <Link href={REGISTER_URL}>
              <Button
                variant={'outline'}
                className="text-black">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>

      <button
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 text-gray-500 md:hidden absolute top-4 right-4 z-50"
      >
        {nav ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
      </button>


      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500 z-50 md:hidden">
          {menuItems.map(({ id, path, title, subMenu }) => (
            <li key={id} className="px-4 cursor-pointer capitalize py-6 text-4xl">
              {subMenu ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center">
                    {title} <ChevronDown className="ml-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {subMenu.map(({ id, path, title }) => (
                      <DropdownMenuItem key={id}>
                        <Link onClick={() => setNav(false)} href={path}>
                          {title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link onClick={() => setNav(false)} href={path}>{title}</Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
