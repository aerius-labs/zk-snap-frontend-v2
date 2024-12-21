import Image from 'next/image';
import React from 'react';

import { DaoDetails } from '@/lib/interfaces';

import ImageWithFallback from './image-with-fallback';

const Community = ({ daoDetails }: { daoDetails: DaoDetails }) => {
  const { name, logo } = daoDetails;
  return (
    <div className='group flex h-[148px] w-full items-center justify-between gap-4 rounded-full from-gray-0 to-gray-100 p-4 hover:from-purple-0 hover:to-purple-100 md:w-[346px] md:bg-gradient-to-l'>
      <div className='-ml-2 flex-shrink-0 overflow-hidden rounded-full'>
        <ImageWithFallback
          src={logo}
          alt={`${name} logo`}
          width={130}
          height={130}
          className='h-[130px] w-[130px] object-cover group-hover:shadow-lg'
        />
      </div>
      <div className='flex flex-grow flex-col items-start justify-center overflow-hidden px-4'>
        <h1 className='w-full truncate text-xl font-bold text-light md:text-2xl'>
          {name}
        </h1>
      </div>
    </div>
  );
};

export default Community;
