import { render, screen } from '@testing-library/react';

import ProposalCard from '@/components/proposalCard';
import { ProposalStatus } from '@/lib/interfaces';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('ProposalCard', () => {
  const mockProposal = {
    proposal_id: '1',
    title: 'Test Proposal',
    dao_name: 'Test DAO',
    creator: '0x1234567890abcdef',
    status: ProposalStatus.Active,
    start_time: '2024-03-01T00:00:00Z',
    end_time: '2024-03-31T00:00:00Z',
    dao_logo: 'test-logo.png',
    encrypted_keys: '',
  };

  it('renders proposal card with correct information', () => {
    render(<ProposalCard proposal={mockProposal} />);
    expect(screen.getByText('Test Proposal')).toBeInTheDocument();
    expect(screen.getByText('0x123...cdef')).toBeInTheDocument();
  });

  it('truncates long proposal titles', () => {
    const longTitleProposal = {
      ...mockProposal,
      title: 'A'.repeat(70),
    };

    render(<ProposalCard proposal={longTitleProposal} />);

    const displayedTitle = screen.getByText(/A+\.\.\./);
    expect(displayedTitle.textContent?.length).toBeLessThanOrEqual(68);
  });

  it('truncates long creator addresses', () => {
    const longAddressProposal = {
      ...mockProposal,
      creator: '0x' + 'a'.repeat(40),
    };

    render(<ProposalCard proposal={longAddressProposal} />);

    expect(
      screen.getByText(/0x[a-f0-9]{3}\.{3}[a-f0-9]{4}/i)
    ).toBeInTheDocument();
  });

  it('links to correct proposal page', () => {
    render(<ProposalCard proposal={mockProposal} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/proposal/1');
  });

  it('renders dao logo with correct attributes', () => {
    render(<ProposalCard proposal={mockProposal} />);

    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'test-logo.png');
    expect(logo).toHaveAttribute('alt', 'proposal card');
  });
});
