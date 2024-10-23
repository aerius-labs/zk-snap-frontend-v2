import { render, screen } from '@testing-library/react';
import CommunityProposal from '@/app/community/[communityId]/page';
import { getDaoById, getProposalsByDaoId } from '@/lib/actions';
import { Proposal, ProposalStatus } from '@/lib/interfaces';

// Mock the server actions
jest.mock('@/lib/actions', () => ({
  getDaoById: jest.fn(),
  getProposalsByDaoId: jest.fn(),
}));

// Mock the components
jest.mock('@/components/breadcrumb', () => ({
  BreadcrumbDemo: ({ items }: { items: Array<{ label: string }> }) => (
    <div data-testid='breadcrumb'>
      {items.map((item) => (
        <span key={item.label}>{item.label}</span>
      ))}
    </div>
  ),
}));

jest.mock('@/components/proposalCard', () => ({
  __esModule: true,
  default: ({ proposal }: { proposal: Proposal }) => (
    <div data-testid={`proposal-${proposal.proposal_id}`}>{proposal.title}</div>
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid='next-link'>
      {children}
    </a>
  ),
}));

describe('CommunityProposal Page', () => {
  const mockProposals: Proposal[] = [
    {
      proposal_id: '1',
      title: 'Proposal 1',
      start_time: new Date().toISOString(),
      dao_name: 'dao1',
      dao_logo: 'dao_lago',
      creator: 'user1',
      status: ProposalStatus.Active,
      end_time: new Date(Date.now() + 86400000).toISOString(),
    },
    {
      proposal_id: '2',
      title: 'Proposal 2',
      start_time: new Date().toISOString(),
      dao_name: 'dao2',
      dao_logo: 'dao_lago2',
      creator: 'user2',
      status: ProposalStatus.Active,
      end_time: new Date(Date.now() + 86400000).toISOString(),
    },
  ];

  const mockParams = {
    communityId: 'dao1',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getProposalsByDaoId as jest.Mock).mockResolvedValue(mockProposals);
  });

  it('renders the proposals page with correct header', async () => {
    render(await CommunityProposal({ params: mockParams }));
    expect(screen.getByText('//PROPOSALS')).toBeInTheDocument();
  });

  it('renders the breadcrumb with correct items', async () => {
    render(await CommunityProposal({ params: mockParams }));

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Flare Dao')).toBeInTheDocument();
  });

  it('renders create proposal button with correct link', async () => {
    render(await CommunityProposal({ params: mockParams }));

    const createButton = screen.getByText('Create Proposal');
    expect(createButton).toBeInTheDocument();
    expect(screen.getByTestId('next-link')).toHaveAttribute(
      'href',
      `/create-proposal?daoId=${mockParams.communityId}`
    );
  });

  it('renders all proposals', async () => {
    render(await CommunityProposal({ params: mockParams }));

    mockProposals.forEach((proposal) => {
      expect(
        screen.getByTestId(`proposal-${proposal.proposal_id}`)
      ).toBeInTheDocument();
      expect(screen.getByText(proposal.title)).toBeInTheDocument();
    });
  });

  it('calls getProposalsByDaoId with correct communityId', async () => {
    render(await CommunityProposal({ params: mockParams }));
    expect(getProposalsByDaoId).toHaveBeenCalledWith(mockParams.communityId);
  });

  it('handles empty proposals list', async () => {
    (getProposalsByDaoId as jest.Mock).mockResolvedValue([]);
    render(await CommunityProposal({ params: mockParams }));

    // Should still render the page structure
    expect(screen.getByText('//PROPOSALS')).toBeInTheDocument();
    expect(screen.getByText('Create Proposal')).toBeInTheDocument();

    // But no proposal items
    expect(screen.queryAllByTestId(/proposal-/)).toHaveLength(0);
  });
});
