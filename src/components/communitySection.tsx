import Link from 'next/link';

import Community from './community';

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
];
const CommunitySection = () => {
  return (
    <div className='h-full w-screen bg-dark py-4'>
      <div className='mx-36 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dividers bg-lightDark p-4 pb-10'>
        <div className='flex flex-row gap-6'>
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <h1 className='pb-4 text-[75px] font-bold leading-none text-light'>
            //COMMUNITITES
          </h1>
          <div>
            <p className='w-[366px] text-right text-xs text-light'>
              are groups of individuals united by shared interests, goals, or
              values, collaborating through blockchain based governance for
              decision-making and resource allocation.
            </p>
            <hr className='mt-5 h-2.5 border-t-0 bg-light' />
          </div>
        </div>
        <div className='3xl:grid-cols-4 grid gap-6 py-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
          {data.map((dao: DaoDetails) => (
            <Link key={dao.id} href='/community/1'>
              <Community daoDetails={dao} />
            </Link>
          ))}
        </div>
        <div className='text-base font-bold text-light underline decoration-4 underline-offset-8'>
          <Link href='/community'>View More</Link>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
