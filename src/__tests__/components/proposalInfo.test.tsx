import { render, screen } from '@testing-library/react';

import ProposalInfo from '@/components/proposalInfo';
import { ProposalStatus } from '@/lib/interfaces';

// Mock the Slider component
jest.mock('@/components/slider', () => {
  return function MockSlider() {
    return <div data-testid='mock-slider'>Mock Slider</div>;
  };
});

describe('ProposalInfo', () => {
  const mockProposal = {
    proposal_description:
      '<p>Test description with <strong>bold</strong> text</p>',
    proposal_id: '1',
    proposal_name: 'Test Proposal',
    dao_id: '1',
    dao_logo: 'https://example.com',
    dao_name: 'Test DAO',
    creator_address: '0x123',
    proposal_status: ProposalStatus.Active,
    start_time: '2024-03-01T00:00:00Z',
    end_time: '2024-03-31T00:00:00Z',
  };

  it('renders the description section correctly', () => {
    render(<ProposalInfo proposal={mockProposal} />);

    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders HTML content safely', () => {
    render(<ProposalInfo proposal={mockProposal} />);

    const description = document.querySelector('.ql-editor');
    expect(description).toContainHTML(
      '<p>Test description with <strong>bold</strong> text</p>'
    );
  });

  it('handles empty description gracefully', () => {
    const emptyProposal = {
      ...mockProposal,
      proposal_description: '',
    };

    render(<ProposalInfo proposal={emptyProposal} />);

    const description = document.querySelector('.ql-editor');
    expect(description?.innerHTML).toBe('');
  });

  it('renders the slider component', () => {
    render(<ProposalInfo proposal={mockProposal} />);

    expect(screen.getByTestId('mock-slider')).toBeInTheDocument();
  });
});
