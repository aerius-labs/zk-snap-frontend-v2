import Image from 'next/image';

import { Bell, File, House, UsersThree } from '../lib/icons';

const Sidebar = () => {
  return (
    <div className='fixed bottom-0 left-0 h-full pt-10'>
      <div className='relative mb-10'>
        <Image
          src='/bg-logo-sidebar.svg'
          alt='Bg Logo Sidebar'
          width={75}
          height={180}
          className='relative -z-10'
        />
        <Image
          src='/zk-snap-logo.svg'
          alt='Bg Logo Sidebar'
          width={50}
          height={50}
          className='absolute top-14'
        />
      </div>
      <div className='relative'>
        <Image
          src='/bg-nav-sidebar.svg'
          alt='Bg Logo Sidebar'
          width={75}
          height={25}
          className='relative -z-10'
        />
        <div className='absolute left-5 top-16 flex flex-col gap-12'>
          <House
            color='#3D3D3D'
            size={40}
            className='p-2 hover:rounded-full hover:bg-light'
          />
          <UsersThree
            color='#3D3D3D'
            size={40}
            className='p-2 hover:rounded-full hover:bg-light'
          />
          <File
            color='#3D3D3D'
            size={40}
            className='p-2 hover:rounded-full hover:bg-light'
          />
          <hr className='h-1 bg-dividers' />
          <Bell
            color='#3D3D3D'
            size={40}
            className='p-2 hover:rounded-full hover:bg-light'
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
