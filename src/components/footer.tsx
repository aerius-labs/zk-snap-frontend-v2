import Link from 'next/link';
import React from 'react';

import { ArrowUpRight, DiscordLogo, XLogo, YoutubeLogo } from '../lib/icons';

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-between gap-10 border-t-2 border-light bg-dark px-4 py-12 text-light sm:px-8 md:px-12 lg:px-28'>
      <div className='flex w-full flex-col px-6 lg:flex-row lg:gap-12'>
        <div className='flex w-full flex-col gap-12 lg:w-3/5'>
          <div className='flex flex-col gap-8 sm:flex-row sm:gap-16'>
            <div className='text-xl font-bold sm:text-2xl'>
              <p>Join ZK Snap community</p>
              <div className='flex flex-row gap-4 pt-4'>
                <Link href='https://www.google.com' aria-label='Twitter'>
                  <XLogo size={22} />
                </Link>
                <Link href='https://www.google.com' aria-label='Discord'>
                  <DiscordLogo size={22} weight='fill' />
                </Link>
                <Link href='https://www.google.com' aria-label='YouTube'>
                  <YoutubeLogo size={22} weight='fill' />
                </Link>
              </div>
            </div>
            <div className='text-xl font-bold sm:text-2xl'>
              <p>Get the latest ZK Snap updates</p>
              <div className='flex flex-row items-center justify-start pt-4'>
                <input
                  type='email'
                  id='email-input'
                  className='w-full rounded-3xl border border-light bg-dark px-4 py-2 text-base font-normal sm:w-auto'
                  placeholder='Your email'
                />
                <div className='pointer-events-none -ml-10 p-2'>
                  <ArrowUpRight size={16} color='#8c969f' />
                </div>
              </div>
            </div>
          </div>
          <div className='leading-tight'>
            <div className='text-5xl font-bold sm:text-7xl md:text-[120px] xl:text-[160px]'>
              ZK SNAP
            </div>
            <div className='mt-4 flex flex-col justify-between text-sm sm:text-base'>
              <div>
                Where DAO voting is simple, anonymous, and user-friendly.
                Empower your voice while preserving privacy.
              </div>
              <div className='mt-4'>Join the future of governance now!</div>
            </div>
          </div>
        </div>
        <div className='mt-12 flex w-full flex-row justify-between lg:mt-0 lg:w-2/5'>
          <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-bold text-light sm:text-2xl'>
              ZK Snap
            </h2>
            {['Communities', 'Proposal', 'About Us', 'Blog'].map((item) => (
              <div
                key={item}
                className='text-sm font-bold leading-none text-subText sm:text-base'
              >
                {item}
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-bold text-light sm:text-2xl'>
              Resources
            </h2>
            {['FAQs', 'Github', 'Docs', 'Request a feature', 'Support'].map(
              (item) => (
                <div
                  key={item}
                  className='text-sm font-bold leading-none text-subText sm:text-base'
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
