import Image from 'next/image';
import Link from 'next/link';

import { Bell, File, House, UsersThree } from '../lib/icons';

const Sidebar = () => {
  return (
    <div className='fixed bottom-0 left-0 h-full pt-10'>
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
          <Link href='/' className='z-20'>
            <House
              color='#3D3D45'
              size={40}
              className='cursor-pointer p-2 hover:rounded-full hover:bg-light'
            />
          </Link>
          <Link href='/community' className='z-20'>
            <UsersThree
              color='#3D3D45'
              size={40}
              className='cursor-pointer p-2 hover:rounded-full hover:bg-light'
            />
          </Link>
          <Link href='/proposal' className='z-20'>
            <File
              color='#3D3D45'
              size={40}
              className='cursor-pointer p-2 hover:rounded-full hover:bg-light'
            />
          </Link>
          <hr className='z-20 h-1 bg-dividers' />
          <Link href='/' className='z-20'>
            <Bell
              color='#3D3D45'
              size={40}
              className='cursor-pointer p-2 hover:rounded-full hover:bg-light'
            />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
