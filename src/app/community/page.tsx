import Link from 'next/link';

import Community from '@/components/community';
import { CaretLeft, MagnifyingGlass } from '@/lib/icons';
import { BreadcrumbDemo } from '@/components/breadcrumb';

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
];

const breadcrumbItems = [
  { label: 'Home', href: '/', isCurrentPage: false },
  { label: 'Communities', href: '/community', isCurrentPage: true },
];

const Communities = () => {
  return (
    <div className='m-0 h-auto w-full gap-5 bg-dark px-36 py-16'>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <h1 className='pb-4 text-4xl font-bold text-inactive'>//COMMUNITIES</h1>
      <div className='rounded-2xl border-2 border-dividers bg-lightDark'>
        <div className='flex h-[100px] flex-row items-center justify-between px-8'>
          <BreadcrumbDemo items={breadcrumbItems} />
          <MagnifyingGlass color='#F3F3F3' size={24} />
        </div>
        <div className='grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {data.map((dao: DaoDetails) => (
            <Link key={dao.id} href={`/community/1`}>
              <Community daoDetails={dao} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communities;
