import Link from 'next/link';

import { BreadcrumbDemo } from '@/components/breadcrumb';
import ProposalCard from '@/components/proposalCard';

interface Proposal {
  id: string;
  daoName: string;
  creatorAddress: string;
  proposalName: string;
  status: string;
  days: string;
}

export default function CommunityProposal() {
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
      id: '5',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName:
        "Security First: Flare Dao's Proposal for Strengthening Network Safeguards",
      status: 'Active',
      days: '5',
    },
    {
      id: '6',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName: 'Smart Contract Development',
      status: 'Opens',
      days: '3',
    },
    {
      id: '7',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName:
        "Security First: Flare Dao's Proposal for Strengthening Network Safeguards",
      status: 'Ended',
      days: '1',
    },
    {
      id: '8',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName: 'Smart Contract Development',
      status: 'Opens',
      days: '3',
    },
    {
      id: '9',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName:
        "Security First: Flare Dao's Proposal for Strengthening Network Safeguards",
      status: 'Active',
      days: '5',
    },
    {
      id: '10',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName: 'Smart Contract Development',
      status: 'Opens',
      days: '3',
    },
    {
      id: '11',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName:
        "Security First: Flare Dao's Proposal for Strengthening Network Safeguards",
      status: 'Ended',
      days: '1',
    },
    {
      id: '12',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName: 'Smart Contract Development',
      status: 'Opens',
      days: '3',
    },
    {
      id: '13',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName:
        "Security First: Flare Dao's Proposal for Strengthening Network Safeguards",
      status: 'Active',
      days: '5',
    },
    {
      id: '14',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName: 'Smart Contract Development',
      status: 'Opens',
      days: '3',
    },
    {
      id: '15',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName:
        "Security First: Flare Dao's Proposal for Strengthening Network Safeguards",
      status: 'Ended',
      days: '1',
    },
    {
      id: '16',
      daoName: 'Flare DAO',
      creatorAddress: ' Ox72Eb...C9E3',
      proposalName: 'Smart Contract Development',
      status: 'Opens',
      days: '3',
    },
  ] as Proposal[];

  const breadcrumbItems = [
    { label: 'Home', href: '/', isCurrentPage: false },
    { label: 'Community', href: '/community', isCurrentPage: false },
    { label: 'Flare Dao', href: '/', isCurrentPage: true },
  ];

  return (
    <div className='flex min-h-screen flex-col justify-center bg-dark p-8 sm:px-12 md:px-24'>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <p className='mb-2 text-4xl font-bold tracking-wider text-inactive'>
        //PROPOSALS
      </p>
      <div className='rounded-[20px] border-2 border-dividers bg-lightDark pb-10'>
        <div className='flex h-auto w-full flex-col p-8 text-sm sm:h-[100px] sm:flex-row'>
          <BreadcrumbDemo items={breadcrumbItems} />
          <Link
            href={'/create-proposal'}
            className='ml-auto flex w-full items-center justify-center rounded-[30px] bg-light px-4 py-2.5 font-bold text-lightDark md:w-auto'
          >
            Create Proposal
          </Link>
        </div>
        <div className='mt-6 flex justify-center'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
