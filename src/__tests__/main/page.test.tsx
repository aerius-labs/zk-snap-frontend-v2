import { render, screen } from '@testing-library/react';

import Home from '@/app/page';
import { getDAOs, getProposals } from '@/lib/actions';

// Mock the server actions
jest.mock('@/lib/actions', () => ({
  getDAOs: jest.fn(),
  getProposals: jest.fn(),
}));

// Mock the components
jest.mock('@/components/communitySection', () => ({
  __esModule: true,
  default: () => <div data-testid='community-section'>Community Section</div>,
}));

jest.mock('@/components/proposalSection', () => ({
  __esModule: true,
  default: () => <div data-testid='proposal-section'>Proposal Section</div>,
}));

jest.mock('@/components/faq', () => ({
  __esModule: true,
  default: () => <div data-testid='faq-section'>FAQ Section</div>,
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mock returns
    (getDAOs as jest.Mock).mockResolvedValue([
      { id: '1', name: 'Test DAO 1' },
      { id: '2', name: 'Test DAO 2' },
    ]);
    (getProposals as jest.Mock).mockResolvedValue([
      { id: '1', title: 'Test Proposal 1' },
      { id: '2', title: 'Test Proposal 2' },
    ]);
  });

  it('renders the home page with all sections', async () => {
    render(await Home());
    expect(screen.getByText('ZK SNAP')).toBeInTheDocument();
    expect(screen.getByTestId('community-section')).toBeInTheDocument();
    expect(screen.getByTestId('proposal-section')).toBeInTheDocument();
    expect(screen.getByTestId('faq-section')).toBeInTheDocument();

    expect(getDAOs).toHaveBeenCalled();
    expect(getProposals).toHaveBeenCalled();
  });

  it('displays the correct hero text', async () => {
    render(await Home());

    expect(screen.getByText('ZK SNAP')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Where DAO voting is simple, anonymous, and userfriendly. Empower your voice while preserving privacy./
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Join the future of governance now!/)
    ).toBeInTheDocument();
  });
});
