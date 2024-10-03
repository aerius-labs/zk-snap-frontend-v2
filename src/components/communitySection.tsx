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
    <div className='h-full bg-dark md:w-screen'>
      <div className='flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dividers bg-lightDark py-4 lg:mx-24'>
        <div className='flex items-center py-4 text-light'>
          <div className='flex flex-col gap-6 px-4 xl:flex-row'>
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <h1 className='text-4xl font-bold leading-none text-light md:text-[75px]'>
              //COMMUNITITES
            </h1>
            <div>
              <p className='text-left text-sm text-light md:w-[463px]'>
                are groups of individuals united by shared interests, goals, or
                values, collaborating through blockchain based governance for
                decision-making and resource allocation.
              </p>
              <hr className='mt-5 h-2.5 border-t-0 bg-light' />
            </div>
          </div>
        </div>
        <div className='mt-6 flex w-full justify-center'>
          <div className='3xl:grid-cols-4 grid w-full gap-6 px-20 py-4 sm:grid-cols-2 xl:grid-cols-3'>
            {data.map((dao: DaoDetails) => (
              <Link key={dao.id} href='/community/1'>
                <Community daoDetails={dao} />
              </Link>
            ))}
          </div>
        </div>
        <div className='text-base font-bold text-light underline decoration-4 underline-offset-8'>
          <Link href='/community'>View More</Link>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
