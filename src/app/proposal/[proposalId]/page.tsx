import { BreadcrumbDemo } from '@/components/breadcrumb';
import ProposalInfo from '@/components/proposal-info';
import ProposalVoting from '@/components/proposal-voting';
import { getProposalById } from '@/lib/actions';

export default async function Proposal({
  params,
}: {
  params: { proposalId: string };
}) {
  const proposalDetails = await getProposalById(params.proposalId);
  const breadcrumbItems = [
    { label: 'Home', href: '/', isCurrentPage: false },
    {
      label: proposalDetails.dao_name,
      href: `/community/${proposalDetails.dao_id}&${proposalDetails.dao_name}`,
      isCurrentPage: false,
    },
    { label: 'Proposal Info', href: '/', isCurrentPage: true },
  ];

  return (
    <div className='flex flex-col'>
      <div className='px-10 py-8'>
        <BreadcrumbDemo items={breadcrumbItems} />
      </div>
      <ProposalVoting proposal={proposalDetails} />
      <ProposalInfo proposal={proposalDetails} />
    </div>
  );
}
