import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

interface BreadCrumbItem {
  label: string;
  href: string;
  isCurrentPage: boolean;
}

export function BreadcrumbDemo({ items }: { items: BreadCrumbItem[] }) {
  const renderFullBreadcrumb = () => (
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
  );

  const renderTruncatedBreadcrumb = () => {
    if (items.length <= 2) return renderFullBreadcrumb();

    const home = items[0];
    const current = items[items.length - 1];
    const parent = items[items.length - 2];

    return (
      <BreadcrumbList>
        <BreadcrumbItem className='flex flex-row items-center justify-start gap-3 p-1 text-center text-base font-bold text-inactive'>
          <BreadcrumbLink className='hover:text-light' href={home.href}>
            {home.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.length > 3 && (
          <>
            <BreadcrumbItem className='flex flex-row items-center justify-start gap-3 p-1 text-center text-base font-bold text-inactive'>
              <span className='text-inactive'>...</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem className='flex flex-row items-center justify-start gap-3 p-1 text-center text-base font-bold text-inactive'>
          <BreadcrumbLink className='hover:text-light' href={parent.href}>
            {parent.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className='flex flex-row items-center justify-start gap-3 p-1 text-center text-base font-bold text-inactive'>
          <BreadcrumbPage className='text-light'>
            {current.label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    );
  };

  return (
    <Breadcrumb>
      <div className='hidden md:block'>{renderFullBreadcrumb()}</div>
      <div className='md:hidden'>{renderTruncatedBreadcrumb()}</div>
    </Breadcrumb>
  );
}
