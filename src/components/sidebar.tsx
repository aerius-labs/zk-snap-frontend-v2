'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, File, House, UsersThree } from '../lib/icons';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: House, label: 'Home' },
    { href: '/community', icon: UsersThree, label: 'Community' },
    { href: '/proposal', icon: File, label: 'Proposal' },
    { href: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  const NavItem = ({ href, icon: Icon, label }: any) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'flex w-full flex-col items-center justify-center',
          isActive ? 'text-gray-200' : 'text-muted-foreground'
        )}
      >
        <Icon size={24} className='mb-1' />
        <span className='text-xs'>{label}</span>
      </Link>
    );
  };

  return (
    <>
      <div className='fixed bottom-0 left-0 hidden h-full pt-10 xl:block'>
        <div className='relative mb-10'>
          <Image
            src='/bg-logo-sidebar.svg'
            alt='Bg Logo Sidebar'
            width={70}
            height={180}
            className='relative z-10'
          />
          <Image
            src='/zk-snap-logo.svg'
            alt='Zk Snap Logo'
            width={50}
            height={50}
            className='absolute top-14 z-20'
          />
        </div>
        <div className='relative'>
          <Image
            src='/bg-nav-sidebar.svg'
            alt='Bg Nav Sidebar'
            width={70}
            height={25}
            className='relative z-10'
          />
          <nav className='absolute left-5 top-16 flex flex-col gap-12'>
            {navItems.map((item, index) => (
              <React.Fragment key={item.href}>
                <Link href={item.href} className='z-20'>
                  <item.icon
                    color='#3D3D45'
                    size={40}
                    className='cursor-pointer p-2 hover:rounded-full hover:bg-light'
                  />
                </Link>
                {index === 2 && <hr className='z-20 h-1 bg-dividers' />}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-neutral-950 xl:hidden'>
        <nav className='flex justify-around py-2'>
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
