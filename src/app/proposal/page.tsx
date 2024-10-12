import { BreadcrumbDemo } from '@/components/breadcrumb';
import ProposalCard from '@/components/proposalCard';
import { getProposals } from '@/lib/actions';
import { Proposal } from '@/lib/interfaces';

export default async function Proposals() {
  const proposals = await getProposals();
  const allProposals = await getProposals();
  const breadcrumbItems = [
    { label: 'Home', href: '/', isCurrentPage: false },
    { label: 'Proposals', href: '/proposal', isCurrentPage: true },
  ];

  return (
    <div className='flex min-h-screen flex-grow flex-col bg-dark p-8 sm:p-6 sm:px-12 md:p-8 md:px-24'>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <p className='mb-2 text-4xl font-bold tracking-wider text-inactive'>
        //PROPOSALS
      </p>
      <div className='flex-grow rounded-[20px] border-2 border-dividers bg-lightDark pb-10'>
        <div className='flex h-auto w-full flex-col p-8 text-sm sm:h-[100px] sm:flex-row'>
          <BreadcrumbDemo items={breadcrumbItems} />
        </div>
        <div className='mt-6 flex flex-grow justify-center overflow-auto'>
          <div className='grid auto-rows-max grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {proposals.map((proposal: Proposal) => (
              <ProposalCard key={proposal.proposal_id} proposal={proposal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
