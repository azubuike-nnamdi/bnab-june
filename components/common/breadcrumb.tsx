'use client';

import { BreadCrumbProps } from '@/types/declaration';
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const BreadCrumb = ({ title, links }: BreadCrumbProps) => {
  const pathname = usePathname();
  return (
    <main>
      <section className="w-full bg-black py-4">
        <div className="container mx-auto sm:p-24 p-8">
          <h1 className="text-white sm:text-4xl text-2xl mb-4 font-bold">{title}</h1>
          <Breadcrumb>
            <BreadcrumbList className="flex flex-wrap items-center text-white">
              {links.map((link, index) => (
                <React.Fragment key={link.id}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={link?.path} className={clsx(
                      'hover:text-gray-400',
                      pathname === link.path && 'text-yellow-500'
                    )}>{link?.text}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < links.length - 1 && <BreadcrumbSeparator className="mx-2">/</BreadcrumbSeparator>}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
    </main>
  );
};
