import { render, screen } from '@testing-library/react';

import { renderStatusInfo } from '@/components/proposal-status';
import ProposalVoting from '@/components/proposal-voting';
import { ProposalStatus } from '@/lib/interfaces';
import { formatDate } from '@/utils/handler';

jest.mock('@/utils/handler', () => ({
  formatDate: jest.fn((date) => `Formatted: ${date}`),
}));

jest.mock('@/components/proposal-status', () => ({
  renderStatusInfo: jest.fn(() => (
    <div data-testid='status-info'>Status Info</div>
  )),
}));

jest.mock('@/components/vote', () => ({
  __esModule: true,
  default: () => <div data-testid='vote-component'>Vote Component</div>,
}));

describe('ProposalVoting', () => {
  const mockProposal = {
    proposal_id: '1',
    dao_logo: 'https://example.com',
    proposal_description: 'Test Description',
    dao_name: 'Test DAO',
    creator_address: '0x1234567890abcdef1234567890abcdef12345678',
    proposal_name: 'Test Proposal',
    start_time: new Date('2024-01-01').toISOString(),
    end_time: new Date('2024-01-07').toISOString(),
    proposal_status: ProposalStatus.Active,
    encrypted_keys: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all proposal information correctly', () => {
    render(<ProposalVoting proposal={mockProposal} />);

    expect(screen.getByText('Test DAO by')).toBeInTheDocument();
    expect(screen.getByText('Test Proposal')).toBeInTheDocument();
    expect(screen.getByText('0x123...5678')).toBeInTheDocument();
  });

  it('formats creator address correctly', () => {
    render(<ProposalVoting proposal={mockProposal} />);

    expect(screen.getByText('0x123...5678')).toBeInTheDocument();
  });

  it('handles short creator address without truncation', () => {
    const shortAddressProposal = {
      ...mockProposal,
      creator_address: '0x1234',
    };

    render(<ProposalVoting proposal={shortAddressProposal} />);
    expect(screen.getByText('0x1234')).toBeInTheDocument();
  });

  it('calls formatDate with correct dates', () => {
    render(<ProposalVoting proposal={mockProposal} />);

    expect(formatDate).toHaveBeenCalledWith(mockProposal.start_time);
    expect(formatDate).toHaveBeenCalledWith(mockProposal.end_time);
  });

  it('calls renderStatusInfo with correct props', () => {
    render(<ProposalVoting proposal={mockProposal} />);

    expect(renderStatusInfo).toHaveBeenCalledWith({
      status: mockProposal.proposal_status,
      start_time: mockProposal.start_time,
      end_time: mockProposal.end_time,
    });
  });

  it('displays voting time information', () => {
    render(<ProposalVoting proposal={mockProposal} />);

    expect(screen.getByText('Voting opens')).toBeInTheDocument();
    expect(screen.getByText('Voting closes')).toBeInTheDocument();
  });
});
