import { render, screen, waitFor } from '@testing-library/react';

import Proposals from '@/app/proposal/page';
import { getProposals } from '@/lib/actions';
import { Proposal } from '@/lib/interfaces';
import { mockProposals } from '@/mocks/handlers';

jest.mock('@/components/breadcrumb', () => ({
  BreadcrumbDemo: ({
    items,
  }: {
    items: Array<{ href: string; label: string }>;
  }) => (
    <nav data-testid='breadcrumb'>
      {items.map((item) => (
        <span key={item.href}>{item.label}</span>
      ))}
    </nav>
  ),
}));

jest.mock('@/components/proposal-card', () => ({
  __esModule: true,
  default: ({ proposal, ...props }: { proposal: Proposal }) => (
    <div data-testid={`proposal-card-${proposal.proposal_id}`} {...props}>
      {proposal.title}
    </div>
  ),
}));

jest.mock('@/lib/actions', () => ({
  getProposals: jest.fn(),
}));

describe('Proposals List Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the proposals page with all elements', async () => {
    (getProposals as jest.Mock).mockResolvedValue(mockProposals);
    render(await Proposals());
    await waitFor(() => {
      expect(screen.getByText('Proposals')).toBeInTheDocument();
      expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    });
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Proposals')).toBeInTheDocument();
    for (const proposal of mockProposals) {
      expect(
        screen.getByTestId(`proposal-card-${proposal.proposal_id}`)
      ).toBeInTheDocument();
      expect(screen.getByText(proposal.title)).toBeInTheDocument();
    }
  });

  it('displays no proposals message when API returns empty array', async () => {
    (getProposals as jest.Mock).mockResolvedValue([]);
    render(await Proposals());
    await waitFor(() => {
      expect(screen.getByTestId('no-proposals')).toBeInTheDocument();
      expect(screen.getByText('No proposals found')).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const error = new Error('Failed to fetch proposals');
    (getProposals as jest.Mock).mockRejectedValue(error);
    try {
      render(await Proposals());
    } catch (e) {
      expect(e).toBe(error);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching proposals:',
        expect.any(Error)
      );
    }
    consoleErrorSpy.mockRestore();
  });

  it('calls getProposals only once', async () => {
    (getProposals as jest.Mock).mockResolvedValue(mockProposals);
    render(await Proposals());
    await waitFor(() => {
      expect(getProposals).toHaveBeenCalledTimes(1);
    });
  });

  it('passes correct props to ProposalCard', async () => {
    (getProposals as jest.Mock).mockResolvedValue([mockProposals[0]]);
    render(await Proposals());
    await waitFor(() => {
      const card = screen.getByTestId(
        `proposal-card-${mockProposals[0].proposal_id}`
      );
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(mockProposals[0].title);
    });
  });
});
