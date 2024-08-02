import React from 'react'
import { Search } from '../dashboard/search'
import { UserNav } from '../dashboard/user-nav'

export const Menu = () => {
  return (
    <main className='border-b px-2 py-4 flex justify-end items-center'>
      <section className='flex gap-3 items-center px-4'>
        <Search />
        <UserNav />
      </section>
    </main>
  )
}
