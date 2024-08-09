'use client'
import React, { useState } from 'react'
import { Search } from '../dashboard/search'
import { UserNav } from '../dashboard/user-nav'

export const Menu = () => {
  const [query, setQuery] = useState("");
  return (
    <main className='border-b px-2 py-4 flex justify-end items-center'>
      <section className='flex gap-3 items-center px-4'>
        <Search
          searchQuery={query}
          setSearchQuery={setQuery}
          placeholder="Search for items..."
          className="w-full max-w-lg"
        />
        <UserNav />
      </section>
    </main>
  )
}
