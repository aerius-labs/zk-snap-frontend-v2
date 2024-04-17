import Link from 'next/link';

import ProposalCard from './proposalCard';

const proposals = [
  {
    id: '1',
    daoName: 'Flare DAO',
    creatorAddress: ' Ox72Eb...C9E3',
    proposalName:
      "Security First: Flare Dao's Proposal for Strengthening Network Safeguards",
    status: 'Active',
    days: '5',
  },
  {
    id: '2',
    daoName: 'Flare DAO',
    creatorAddress: ' Ox72Eb...C9E3',
    proposalName: 'Smart Contract Development',
    status: 'Opens',
    days: '3',
  },
  {
    id: '3',
    daoName: 'Flare DAO',
    creatorAddress: ' Ox72Eb...C9E3',
    proposalName:
      "Security First: Flare Dao's Proposal for Strengthening Network Safeguards",
    status: 'Ended',
    days: '1',
  },
  {
    id: '4',
    daoName: 'Flare DAO',
    creatorAddress: ' Ox72Eb...C9E3',
    proposalName: 'Smart Contract Development',
    status: 'Opens',
    days: '3',
  },
  {
    id: '1',
    daoName: 'Flare DAO',
    creatorAddress: ' Ox72Eb...C9E3',
    proposalName:
      "Security First: Flare Dao's Proposal for Strengthening Network Safeguards",
    status: 'Active',
    days: '5',
  },
  {
    id: '2',
    daoName: 'Flare DAO',
    creatorAddress: ' Ox72Eb...C9E3',
    proposalName: 'Smart Contract Development',
    status: 'Opens',
    days: '3',
  },
  {
    id: '3',
    daoName: 'Flare DAO',
    creatorAddress: ' Ox72Eb...C9E3',
    proposalName:
      "Security First: Flare Dao's Proposal for Strengthening Network Safeguards",
    status: 'Ended',
    days: '1',
  },
  {
    id: '4',
    daoName: 'Flare DAO',
    creatorAddress: ' Ox72Eb...C9E3',
    proposalName: 'Smart Contract Development',
    status: 'Opens',
    days: '3',
  },
];
const ProposalSection = () => {
  return (
    <div className=' size-full bg-dark px-6 py-4'>
      <div className='ml-36 flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dividers bg-lightDark p-4 pb-10'>
        <div className='flex items-center px-10 py-4 text-light'>
          <div className='flex flex-row gap-6'>
            <div>
              <p className='w-[463px] text-left text-xs text-light'>
                are formalized suggestions or requests submitted by members for
                collective decision-making, typically involving governance
                changes, fund allocations, or strategic initiatives.
              </p>
              <hr className='mt-5 h-2.5 border-t-0 bg-light' />
            </div>
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <h1 className='pb-4 text-8xl font-bold leading-none text-light'>
              //PROPOSALS
            </h1>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-7 md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-4 xl:px-20'>
          {proposals.map((proposal: any) => {
            return <ProposalCard key={proposal.id} proposal={proposal} />;
          })}
        </div>
        <div className='text-base font-bold text-light underline decoration-4 underline-offset-8'>
          <Link href='/proposal'>View More</Link>
        </div>
      </div>
    </div>
  );
};

export default ProposalSection;
