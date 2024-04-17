import Link from 'next/link';

import { ArrowUpRight, DiscordLogo, XLogo, YoutubeLogo } from '../lib/icons';

const Footer = () => {
  return (
    <div className='flex min-h-[460px] flex-col items-center justify-between gap-10 border-t-2 border-light bg-dark px-28 pb-12 pt-[70px] text-light lg:flex-row lg:gap-0'>
      <div className='flex h-full w-3/5 flex-col justify-between'>
        <div className='flex flex-row gap-16'>
          <div className='text-2xl font-bold'>
            <p>Join ZK Snap community</p>
            <div className='flex flex-row gap-4 pt-4'>
              <Link href={`"www.google.com"`}>
                {' '}
                <XLogo size={22} />
              </Link>
              <Link href={`"www.google.com"`}>
                {' '}
                <DiscordLogo size={22} weight='fill' />
              </Link>
              <Link href={`"www.google.com"`}>
                {' '}
                <YoutubeLogo size={22} weight='fill' />
              </Link>
            </div>
          </div>
          <div className='text-2xl font-bold'>
            <p>Get the latest ZK Snap updates</p>
            <div className='flex flex-row items-center justify-start pt-4'>
              <input
                type='text'
                id='input-group-1'
                className='rounded-3xl border border-light bg-dark px-4 text-base font-normal'
                placeholder='Your email'
              />
              <div className='pointer-events-none -ml-6'>
                <ArrowUpRight size={16} color='#8c969f' />
              </div>
            </div>
          </div>
        </div>
        <div className='m-0 p-0 leading-none'>
          <div className='text-[120px] font-bold leading-none xl:text-[160px]'>
            ZK SNAP
          </div>
          <div className='flex w-5/6 flex-col justify-between leading-4'>
            <div>
              Where DAO voting is simple, anonymous, and userfriendly. Empower
              your voice while preserving privacy.
            </div>
            <br />
            <div>Join the future of governance now!</div>
          </div>
        </div>
      </div>
      <div className='flex h-full w-2/5 flex-row justify-around'>
        <div className='flex flex-col gap-6'>
          <h1 className='text-2xl font-bold text-light'>ZK Snap</h1>
          <div className='text-base font-bold leading-none text-subText'>
            Communities
          </div>
          <div className='text-base font-bold leading-none text-subText'>
            Proposal
          </div>
          <div className='text-base font-bold leading-none text-subText'>
            About Us
          </div>
          <div className='text-base font-bold leading-none text-subText'>
            Blog
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <h1 className='text-2xl font-bold text-light'>Resources</h1>
          <div className='text-base font-bold leading-none text-subText'>
            FAQs
          </div>
          <div className='text-base font-bold leading-none text-subText'>
            Github
          </div>
          <div className='text-base font-bold leading-none text-subText'>
            Docs
          </div>
          <div className='text-base font-bold leading-none text-subText'>
            Request a feature
          </div>
          <div className='text-base font-bold leading-none text-subText'>
            Support
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
