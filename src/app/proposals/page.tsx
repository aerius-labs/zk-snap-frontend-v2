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
    <div className='min-h-screen bg-true-black-900 px-6 py-4'>
      <p className='mb-2 text-4xl font-bold tracking-wider text-true-gray-700 md:ml-36'>
        // PROPOSALS
      </p>
      <div className='rounded-[20px] border-2 border-true-gray-400 bg-true-black-800 px-4 pb-10 md:ml-36'>
        <div className='mb-2 flex items-start py-4 text-sm text-true-white-100'>
          <div>{'< Home / Communities / Flare DAO'}</div>
          <button className='ml-auto rounded-[50px] bg-true-white-100 px-1.5 py-2 font-bold text-true-black-800'>
            Create Proposal
          </button>
        </div>
        <div className='grid grid-cols-1 gap-6 px-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {proposals.map((proposal: any) => {
            return <ProposalCard key={proposal.id} proposal={proposal} />;
          })}
        </div>
      </div>
    </div>
  );
}
