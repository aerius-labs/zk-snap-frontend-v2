import { render, screen } from '@testing-library/react';

import Proposal from '@/app/proposal/[proposalId]/page';
import { getProposalById } from '@/lib/actions';
import { ProposalDetails } from '@/lib/interfaces';

jest.mock('@/lib/actions');
jest.mock('@/components/breadcrumb', () => ({
  BreadcrumbDemo: ({
    items,
  }: {
    items: Array<{ href: string; label: string }>;
  }) => (
    <div data-testid='breadcrumb'>
      {items.map((item, index) => (
        <span key={`${item.href}-${index}`}>{item.label}</span>
      ))}
    </div>
  ),
}));
jest.mock('@/components/proposal-info', () => ({
  __esModule: true,
  default: ({ proposal }: { proposal: ProposalDetails }) => (
    <div data-testid='proposal-info'>Proposal Info Component</div>
  ),
}));
jest.mock('@/components/proposal-voting', () => ({
  __esModule: true,
  default: ({ proposal }: { proposal: ProposalDetails }) => (
    <div data-testid='proposal-voting'>Proposal Voting Component</div>
  ),
}));

describe('Proposal Detail Page', () => {
  const mockProposalId = '123';
  const mockProposalDetails = {
    id: mockProposalId,
    title: 'Test Proposal',
  };

  beforeEach(() => {
    (getProposalById as jest.Mock).mockClear();
    (getProposalById as jest.Mock).mockResolvedValue(mockProposalDetails);
  });

  it('renders the breadcrumb with correct items', async () => {
    render(await Proposal({ params: { proposalId: mockProposalId } }));

    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toContainElement(screen.getByText('Home'));
    expect(breadcrumb).toContainElement(screen.getByText('Proposals'));
    expect(breadcrumb).toContainElement(screen.getByText('Proposal Info'));
  });

  it('fetches proposal details with correct ID', async () => {
    await Proposal({ params: { proposalId: mockProposalId } });
    expect(getProposalById).toHaveBeenCalledWith(mockProposalId);
  });

  it('renders ProposalVoting component with proposal details', async () => {
    render(await Proposal({ params: { proposalId: mockProposalId } }));
    expect(screen.getByTestId('proposal-voting')).toBeInTheDocument();
  });

  it('renders ProposalInfo component with proposal details', async () => {
    render(await Proposal({ params: { proposalId: mockProposalId } }));
    expect(screen.getByTestId('proposal-info')).toBeInTheDocument();
  });

  it('handles loading state while fetching proposal', async () => {
    (getProposalById as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    const { container } = render(
      await Proposal({ params: { proposalId: mockProposalId } })
    );
    expect(container).toBeInTheDocument();
  });

  it('maintains correct layout structure', async () => {
    const { container } = render(
      await Proposal({ params: { proposalId: mockProposalId } })
    );
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass('flex flex-col');
    const breadcrumbContainer = mainDiv.firstChild as HTMLElement;
    expect(breadcrumbContainer).toHaveClass('px-10 py-8');
  });
});

describe('Proposal Detail Page Error Handling', () => {
  const mockProposalId = '123';

  it('handles failed proposal fetch', async () => {
    const error = new Error('Failed to fetch proposal');
    (getProposalById as jest.Mock).mockRejectedValue(error);
    try {
      await Proposal({ params: { proposalId: mockProposalId } });
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
