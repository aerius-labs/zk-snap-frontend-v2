import ProposalInfo from '@/components/proposalInfo';
import ProposalVoting from '@/components/proposalVoting';

export default function Proposal() {
  return (
    <div className='h-screen'>
      <ProposalVoting />
      <ProposalInfo />
    </div>
  );
}
