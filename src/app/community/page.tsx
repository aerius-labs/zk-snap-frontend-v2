import Link from 'next/link';

import { BreadcrumbDemo } from '@/components/breadcrumb';
import Community from '@/components/community';
import { MagnifyingGlass } from '@/lib/icons';

interface DaoDetails {
  id: number;
  daoName: string;
  members: string;
  activeProps: string;
  daoImage: string;
}

const data = [
  {
    id: 1,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_3FYOy_AoxGVPQG9pjhdEgbvKLIs7uUP8g&s',
  },
  {
    id: 2,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_3FYOy_AoxGVPQG9pjhdEgbvKLIs7uUP8g&s',
  },
  {
    id: 3,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_3FYOy_AoxGVPQG9pjhdEgbvKLIs7uUP8g&s',
  },
  {
    id: 4,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_3FYOy_AoxGVPQG9pjhdEgbvKLIs7uUP8g&s',
  },
  {
    id: 5,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_3FYOy_AoxGVPQG9pjhdEgbvKLIs7uUP8g&s',
  },
  {
    id: 6,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_3FYOy_AoxGVPQG9pjhdEgbvKLIs7uUP8g&s',
  },
  {
    id: 7,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_3FYOy_AoxGVPQG9pjhdEgbvKLIs7uUP8g&s',
  },
  {
    id: 8,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_3FYOy_AoxGVPQG9pjhdEgbvKLIs7uUP8g&s',
  },
  {
    id: 9,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_3FYOy_AoxGVPQG9pjhdEgbvKLIs7uUP8g&s',
  },
  {
    id: 10,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_3FYOy_AoxGVPQG9pjhdEgbvKLIs7uUP8g&s',
  },
  {
    id: 11,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_3FYOy_AoxGVPQG9pjhdEgbvKLIs7uUP8g&s',
  },
] as DaoDetails[];

const breadcrumbItems = [
  { label: 'Home', href: '/', isCurrentPage: false },
  { label: 'Communities', href: '/community', isCurrentPage: true },
];

const Communities = () => {
  return (
    <div className='h-auto w-full bg-dark px-8 py-8 md:px-24'>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <h1 className='mb-2 text-4xl font-bold text-inactive sm:mb-6 sm:text-3xl md:text-4xl'>
        //COMMUNITIES
      </h1>
      <div className='rounded-2xl border-2 border-dividers bg-lightDark'>
        <div className='flex flex-row items-center justify-between p-8 md:h-[100px]'>
          <BreadcrumbDemo items={breadcrumbItems} />
          <MagnifyingGlass color='#F3F3F3' size={24} />
        </div>
        <div className='grid grid-cols-1 gap-6 p-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
          {data.map((dao) => (
            <Link key={dao.id} href={`/community/${dao.id}`}>
              <Community daoDetails={dao} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communities;
