import { render, screen } from '@testing-library/react';

import ProposalSection from '@/components/proposalSection';
import { ProposalStatus } from '@/lib/interfaces';

jest.mock('@/components/ProposalCard', () => {
  return function MockProposalCard({ proposal }: any) {
    return (
      <div data-testid={`proposal-card-${proposal.proposal_id}`}>Mock Card</div>
    );
  };
});

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('ProposalSection', () => {
  const mockProposals = [
    {
      proposal_id: '1',
      title: 'Proposal 1',
      dao_name: 'DAO 1',
      creator: '0x123',
      status: ProposalStatus.Active,
      start_time: '2024-03-01T00:00:00Z',
      end_time: '2024-03-31T00:00:00Z',
      dao_logo: 'logo1.png',
    },
    {
      proposal_id: '2',
      title: 'Proposal 2',
      dao_name: 'DAO 2',
      creator: '0x456',
      status: ProposalStatus.Inactive,
      start_time: '2024-04-01T00:00:00Z',
      end_time: '2024-04-30T00:00:00Z',
      dao_logo: 'logo2.png',
    },
  ];

  it('renders the header text correctly', () => {
    render(<ProposalSection proposals={mockProposals} />);

    expect(screen.getByText('//PROPOSALS')).toBeInTheDocument();
  });

  it('renders the correct number of proposal cards', () => {
    render(<ProposalSection proposals={mockProposals} />);

    const cards = screen.getAllByTestId(/proposal-card-/);
    expect(cards).toHaveLength(2);
  });

  it('renders the "View More" link correctly', () => {
    render(<ProposalSection proposals={mockProposals} />);

    const viewMoreLink = screen.getByText('View More');
    expect(viewMoreLink).toHaveAttribute('href', '/proposal');
  });

  it('renders the description text', () => {
    render(<ProposalSection proposals={mockProposals} />);

    expect(screen.getByText(/are formalized suggestions/)).toBeInTheDocument();
  });

  it('handles empty proposals array', () => {
    render(<ProposalSection proposals={[]} />);

    const cards = screen.queryAllByTestId(/proposal-card-/);
    expect(cards).toHaveLength(0);
  });
});
