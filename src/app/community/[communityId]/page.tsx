import Link from 'next/link';

import { BreadcrumbDemo } from '@/components/breadcrumb';
import ProposalCard from '@/components/proposal-card';
import { getDaoById, getProposalsByDaoId } from '@/lib/actions';
import { Proposal } from '@/lib/interfaces';

export default async function CommunityProposal({
  params,
}: {
  params: { communityId: string };
}) {
  const id = params.communityId;
  const daoDetails = await getDaoById(id);
  try {
    const proposals = await getProposalsByDaoId(id);
    const breadcrumbItems = [
      { label: 'Home', href: '/', isCurrentPage: false },
      { label: 'Community', href: '/community', isCurrentPage: false },
      { label: daoDetails.name, href: '/', isCurrentPage: true },
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
              href={`/create-proposal?daoId=${id}&daoName=${daoDetails.name}`}
              className='ml-auto flex w-full items-center justify-center rounded-[30px] bg-light px-4 py-2.5 font-bold text-lightDark md:w-auto'
            >
              Create Proposal
            </Link>
          </div>
          <div className='mt-6 flex justify-center'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {proposals.length > 0 ? (
                proposals.map((proposal: Proposal) => (
                  <ProposalCard
                    key={proposal.proposal_id}
                    proposal={proposal}
                  />
                ))
              ) : (
                <div className='col-span-full text-center text-light'>
                  No proposals found for this community
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className='flex min-h-screen flex-grow flex-col bg-dark p-8 sm:px-12 md:px-24'>
        <div className='flex-grow rounded-[20px] border-2 border-red-500 bg-lightDark p-8'>
          <div className='text-center'>
            <h2
              className='mb-4 text-2xl font-bold text-red-500'
              data-testid='error-heading'
            >
              Error Loading Proposals
            </h2>
            <p className='text-light' data-testid='error-message'>
              {error instanceof Error
                ? error.message
                : 'An unexpected error occurred'}
            </p>
            <Link
              href='/community'
              className='mt-6 inline-block rounded-[30px] bg-light px-6 py-3 font-bold text-lightDark'
            >
              Return to Communities
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
