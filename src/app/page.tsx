import { Suspense } from 'react';

import CommunitySection from '@/components/communitySection';
import FAQ from '@/components/faq';
import ConnectWorldCoinID from '@/components/idkitWidget';
import ProposalSection from '@/components/proposalSection';
import { getDAOs, getProposals } from '@/lib/actions';
import { CaretDown } from '@/lib/icons';
import { DaoDetails } from '@/lib/interfaces';

export default async function Home() {
  const daos: DaoDetails[] = await getDAOs();
  const proposals = await getProposals();
  return (
    <main className='flex flex-col items-center justify-between gap-10 bg-dark'>
      <div className='flex h-screen w-screen flex-col items-center justify-center bg-hero bg-cover bg-center bg-no-repeat xl:justify-end'>
        <div className='text-center text-[140px] font-bold leading-none text-light md:text-left xl:text-[260px]'>
          ZK SNAP
        </div>
        <div className='flex flex-col items-center justify-center px-4'>
          <div className='text-center text-lg font-normal text-light'>
            Where DAO voting is simple, anonymous, and userfriendly. Empower
            your voice while preserving privacy.
          </div>
          <div className='text-center text-lg font-normal text-light'>
            Join the future of governance now!
            <ConnectWorldCoinID />
          </div>
        </div>
        <div className='mt-4 hidden animate-bounce lg:block'>
          <CaretDown color='#F3F3F3' size={40} />
        </div>
      </div>
      <Suspense fallback={<div>Loading community section...</div>}>
        <CommunitySection daos={daos} />
      </Suspense>
      <Suspense fallback={<div>Loading proposal section...</div>}>
        <ProposalSection proposals={proposals} />
      </Suspense>
      <Suspense fallback={<div>Loading FAQ...</div>}>
        <FAQ />
      </Suspense>
    </main>
  );
}
