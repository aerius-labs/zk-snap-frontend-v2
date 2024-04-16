import ProposalInfo from '@/components/proposalInfo';
import ProposalVoting from '@/components/proposalVoting';

export default function Proposal() {
  return (
    <div className='flex h-screen flex-col overflow-scroll'>
      <ProposalVoting />
      <ProposalInfo />
    </div>
  );
}