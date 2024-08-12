'use client'
import React, { useState } from 'react'
import { Search } from '../back-office/dashboard/search'
import { UserNav } from '../back-office/dashboard/user-nav'
import { ModeToggle } from '../ui/mode-toggle'

export const Menu = () => {
  const [query, setQuery] = useState("");
  return (
    <main className='border-b px-2 py-4 md:flex justify-end items-center overflow-x-auto'>
      <section className='flex gap-3 items-center px-4'>
        {/* <Search
          searchQuery={query}
          setSearchQuery={setQuery}
          placeholder="Search for items..."
          className="w-full max-w-lg"
        /> */}

        <UserNav />
        <ModeToggle />
      </section>
    </main>
  )
}
