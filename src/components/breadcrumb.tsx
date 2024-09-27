import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadCrumbItem {
  label: string;
  href: string;
  isCurrentPage: boolean;
}

export function BreadcrumbDemo({ items }: { items: BreadCrumbItem[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <div className='flex items-center gap-0' key={index}>
            <BreadcrumbItem className='flex flex-row items-center justify-start gap-3 p-1 text-center text-base font-bold text-inactive'>
              {item.isCurrentPage ? (
                <BreadcrumbPage className='text-light'>
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink className='hover:text-light' href={item.href}>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
