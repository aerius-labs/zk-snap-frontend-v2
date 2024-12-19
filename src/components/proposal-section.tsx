import Link from 'next/link';

import { Proposal } from '@/lib/interfaces';

import ProposalCard from './proposal-card';

const ProposalSection = ({ proposals }: { proposals: Proposal[] }) => {
  return (
    <div className='bg-dark md:w-screen lg:h-[800px]'>
      <div className='flex h-full flex-col items-center gap-4 rounded-2xl border-2 border-dividers bg-lightDark py-4 lg:mx-24'>
        <div className='flex items-center py-4 text-light'>
          <div className='flex flex-col-reverse gap-6 px-4 xl:flex-row'>
            <div>
              <p className='text-left text-sm text-light md:w-[463px]'>
                are formalized suggestions or requests submitted by members for
                collective decision-making, typically involving governance
                changes, fund allocations, or strategic initiatives.
              </p>
              <hr className='mt-5 h-2.5 border-t-0 bg-light' />
            </div>
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <h1 className='text-4xl font-bold leading-none text-light md:text-[75px]'>
              //PROPOSALS
            </h1>
          </div>
        </div>
        <div className='mt-6 flex justify-center'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {proposals.length !== 0 ? (
              proposals
                .slice(0, 8)
                .map((proposal) => (
                  <ProposalCard
                    key={proposal.proposal_id}
                    proposal={proposal}
                  />
                ))
            ) : (
              // eslint-disable-next-line react/jsx-no-comment-textnodes
              <p className='px-96 text-4xl font-bold tracking-wide text-dividers md:whitespace-nowrap'>
                NO PROPOSALS YET
              </p>
            )}
          </div>
        </div>
        <div className='mt-auto text-base font-bold text-light underline decoration-4 underline-offset-8'>
          <Link href='/proposal'>View More</Link>
        </div>
      </div>
    </div>
  );
};

export default ProposalSection;
