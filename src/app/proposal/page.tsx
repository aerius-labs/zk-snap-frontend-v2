import Link from 'next/link';

import ProposalCard from '@/components/proposalCard';
import { CaretLeft } from '@/lib/icons';
import { BreadcrumbDemo } from '@/components/breadcrumb';

interface Proposal {
  id: string;
  daoName: string;
  creatorAddress: string;
  proposalName: string;
  status: string;
  days: string;
}

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
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/', isCurrentPage: false },
    { label: 'Proposals', href: '/proposal', isCurrentPage: true },
  ];

  return (
    <div className='flex min-h-screen flex-col justify-center bg-dark p-8 sm:px-12 md:px-24'>
      <p className='mb-2 text-4xl font-bold tracking-wider text-inactive'>
        //PROPOSALS
      </p>
      <div className='rounded-[20px] border-2 border-dividers bg-lightDark pb-10'>
        <div className='flex h-auto w-full flex-col items-center p-8 text-sm sm:h-[100px] sm:flex-row'>
          <BreadcrumbDemo items={breadcrumbItems} />
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
