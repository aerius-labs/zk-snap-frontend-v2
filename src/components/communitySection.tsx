import Link from 'next/link';

import { DaoDetails } from '@/lib/interfaces';

import Community from './community';

const CommunitySection = ({ daos }: { daos: DaoDetails[] }) => {
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
        <div className='mt-6 flex justify-center'>
          <div className='3xl:grid-cols-4 grid w-full gap-6 px-20 py-4 sm:grid-cols-2 xl:grid-cols-3'>
            {daos.map((dao: DaoDetails) => (
              <Link key={dao.id} href={`/community/${dao.id}`}>
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
