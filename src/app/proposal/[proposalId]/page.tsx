import Link from 'next/link';

import { BreadcrumbDemo } from '@/components/breadcrumb';
import ProposalInfo from '@/components/proposalInfo';
import ProposalVoting from '@/components/proposalVoting';

export default function Proposal() {
  const breadcrumbItems = [
    { label: 'Home', href: '/', isCurrentPage: false },
    { label: 'Proposals', href: '/proposal', isCurrentPage: false },
    { label: 'Proposal Info', href: '/', isCurrentPage: true },
  ];
  return (
    <div className='flex flex-col'>
      <div className='px-20 py-8'>
        <BreadcrumbDemo items={breadcrumbItems} />
      </div>
      <ProposalVoting />
      <ProposalInfo />
    </div>
  );
}
