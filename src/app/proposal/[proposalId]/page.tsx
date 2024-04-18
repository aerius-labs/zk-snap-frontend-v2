import Link from 'next/link';

import ProposalInfo from '@/components/proposalInfo';
import ProposalVoting from '@/components/proposalVoting';
import { CaretLeft } from '@/lib/icons';

export default function Proposal() {
  return (
    <div className='sticky flex h-screen flex-col overflow-scroll'>
      <div className='flex flex-row items-center justify-start gap-3 bg-lightDark p-2.5 px-24 py-6 text-center text-base font-bold text-inactive'>
        <Link className='w-4' href='/'>
          {' '}
          <CaretLeft size={20} />
        </Link>
        <Link className='hover:text-light' href='/'>
          Home
        </Link>
        <span>/</span>
        <Link className='hover:text-light' href='/community'>
          Proposal
        </Link>
        <span>/</span>
        <Link className='text-light' href='/proposal/1'>
          Proposal Info
        </Link>
      </div>
      <ProposalVoting />
      <ProposalInfo />
    </div>
  );
}
