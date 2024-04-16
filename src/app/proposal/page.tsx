import ProposalCard from '@/components/proposalCard';

export default function Proposals() {
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
  return (
    <div className='flex min-h-screen flex-col justify-center bg-dark px-[40px] py-[65px] md:px-[64] lg:px-[124px] 2xl:px-[184px]'>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <p className='mb-2 text-4xl font-bold tracking-wider text-inactive'>
        //PROPOSALS
      </p>
      <div className='rounded-[20px] border-2 border-dividers bg-lightDark pb-10'>
        <div className='flex h-[100px] w-full items-center px-4 text-sm text-light'>
          <div>{'< Home / Communities / Flare DAO'}</div>
          <button
            type='button'
            className='ml-auto rounded-[50px] bg-light px-1.5 py-2 font-bold text-lightDark'
          >
            Create Proposal
          </button>
        </div>
        <div className='flex justify-center'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {proposals.map((proposal: any) => {
              return <ProposalCard key={proposal.id} proposal={proposal} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
