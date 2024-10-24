import { render, screen } from '@testing-library/react';

import Home from '@/app/page';
import * as actions from '@/lib/actions';
import { server } from '@/mocks/server';

jest.mock('@/lib/actions', () => ({
  getDAOs: jest.fn(),
  getProposals: jest.fn(),
}));

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
  beforeAll(() => server.listen());
  beforeEach(() => {
    jest.clearAllMocks();
    (actions.getDAOs as jest.Mock).mockResolvedValue([]);
    (actions.getProposals as jest.Mock).mockResolvedValue([]);
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders the home page with all sections', async () => {
    render(await Home());

    expect(screen.getByText('ZK SNAP')).toBeInTheDocument();
    expect(screen.getByTestId('community-section')).toBeInTheDocument();
    expect(screen.getByTestId('proposal-section')).toBeInTheDocument();
    expect(screen.getByTestId('faq-section')).toBeInTheDocument();

    expect(actions.getDAOs).toHaveBeenCalled();
    expect(actions.getProposals).toHaveBeenCalled();
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
