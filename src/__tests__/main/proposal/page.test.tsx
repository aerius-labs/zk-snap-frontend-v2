import { render, screen } from '@testing-library/react';
import Proposals from '@/app/proposal/page';
import { getProposals } from '@/lib/actions';
import { Proposal, ProposalStatus } from '@/lib/interfaces';

// Mock the dependencies
jest.mock('@/lib/actions');
jest.mock('@/components/breadcrumb', () => ({
  BreadcrumbDemo: ({
    items,
  }: {
    items: Array<{ href: string; label: string }>;
  }) => (
    <div data-testid='breadcrumb'>
      {items.map((item) => (
        <span key={item.href}>{item.label}</span>
      ))}
    </div>
  ),
}));
jest.mock('@/components/proposalCard', () => ({
  __esModule: true,
  default: ({ proposal }: { proposal: Proposal }) => (
    <div data-testid={`proposal-card-${proposal.proposal_id}`}>
      Proposal Card
    </div>
  ),
}));

describe('Proposals', () => {
  const mockProposals = [
    { proposal_id: '1', title: 'Proposal 1' },
    { proposal_id: '2', title: 'Proposal 2' },
  ];

  beforeEach(() => {
    (getProposals as jest.Mock).mockClear();
    (getProposals as jest.Mock).mockResolvedValue(mockProposals);
  });

  it('renders the proposals page title', async () => {
    render(await Proposals());
    expect(screen.getByText('//PROPOSALS')).toBeInTheDocument();
  });

  it('renders the breadcrumb with correct items', async () => {
    render(await Proposals());
    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toContainElement(screen.getByText('Home'));
    expect(breadcrumb).toContainElement(screen.getByText('Proposals'));
  });

  it('renders proposal cards for each proposal', async () => {
    render(await Proposals());
    mockProposals.forEach((proposal) => {
      expect(
        screen.getByTestId(`proposal-card-${proposal.proposal_id}`)
      ).toBeInTheDocument();
    });
  });

  it('fetches proposals data on render', async () => {
    render(await Proposals());
    expect(getProposals).toHaveBeenCalledTimes(2); // Called twice in the component
  });

  it('handles empty proposals array', async () => {
    (getProposals as jest.Mock).mockResolvedValue([]);
    render(await Proposals());
    expect(screen.queryByTestId(/proposal-card/)).not.toBeInTheDocument();
  });
});
