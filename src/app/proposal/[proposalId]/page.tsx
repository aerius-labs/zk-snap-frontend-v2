import { BreadcrumbDemo } from '@/components/breadcrumb';
import ProposalInfo from '@/components/proposalInfo';
import ProposalVoting from '@/components/proposalVoting';
import { getProposalById } from '@/lib/actions';

export default async function Proposal({
  params,
}: {
  params: { proposalId: string };
}) {
  const breadcrumbItems = [
    { label: 'Home', href: '/', isCurrentPage: false },
    { label: 'Proposals', href: '/proposal', isCurrentPage: false },
    { label: 'Proposal Info', href: '/', isCurrentPage: true },
  ];

  const proposalDetails = await getProposalById(params.proposalId);
  console.log('proposalDetails', proposalDetails);

  return (
    <div className='flex flex-col'>
      <div className='px-10 py-8'>
        <BreadcrumbDemo items={breadcrumbItems} />
      </div>
      <ProposalVoting />
      <ProposalInfo />
    </div>
  );
}
