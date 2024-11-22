import { render, screen } from '@testing-library/react';

import CommunityProposal from '@/app/community/[communityId]/page';
import { getProposalsByDaoId } from '@/lib/actions';
import { Proposal } from '@/lib/interfaces';

const mockParams = {
  communityId: 'dao1',
};

jest.mock('@/lib/actions', () => ({
  getProposalsByDaoId: jest.fn(),
}));

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
  describe('Error Handling', () => {
    it('handles API errors gracefully', async () => {
      const errorMessage = 'Failed to fetch proposals';
      (getProposalsByDaoId as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      render(await CommunityProposal({ params: mockParams }));

      expect(screen.getByTestId('error-heading')).toHaveTextContent(
        'Error Loading Proposals'
      );
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        errorMessage
      );

      const recoveryLink = screen.getByText('Return to Communities');
      expect(recoveryLink).toBeInTheDocument();
      expect(recoveryLink.closest('a')).toHaveAttribute('href', '/community');
    });

    it('handles unexpected error types gracefully', async () => {
      (getProposalsByDaoId as jest.Mock).mockRejectedValue(
        'Unexpected error type'
      );

      render(await CommunityProposal({ params: mockParams }));

      expect(screen.getByTestId('error-heading')).toHaveTextContent(
        'Error Loading Proposals'
      );
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'An unexpected error occurred'
      );
    });

    it('displays no proposals message when array is empty', async () => {
      (getProposalsByDaoId as jest.Mock).mockResolvedValue([]);

      render(await CommunityProposal({ params: mockParams }));

      expect(
        screen.getByText('No proposals found for this community')
      ).toBeInTheDocument();
    });
  });
});
