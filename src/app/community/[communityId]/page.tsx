import Link from 'next/link';

import { BreadcrumbDemo } from '@/components/breadcrumb';
import ProposalCard from '@/components/proposalCard';
import { getDaoById, getProposalsByDaoId } from '@/lib/actions';
import { Proposal } from '@/lib/interfaces';
export default async function CommunityProposal({
  params,
}: {
  params: { communityId: string };
}) {
  const proposals = await getProposalsByDaoId(params.communityId);
  const breadcrumbItems = [
    { label: 'Home', href: '/', isCurrentPage: false },
    { label: 'Community', href: '/community', isCurrentPage: false },
    { label: 'Flare Dao', href: '/', isCurrentPage: true },
  ];

  return (
    <div className='flex min-h-screen flex-grow flex-col bg-dark p-8 sm:px-12 md:px-24'>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <p className='mb-2 text-4xl font-bold tracking-wider text-inactive'>
        //PROPOSALS
      </p>
      <div className='flex-grow rounded-[20px] border-2 border-dividers bg-lightDark pb-10'>
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
            {proposals.map((proposal: Proposal) => (
              <ProposalCard key={proposal.proposal_id} proposal={proposal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
