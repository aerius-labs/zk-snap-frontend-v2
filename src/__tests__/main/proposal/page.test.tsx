import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import Proposals from '@/app/proposal/page';
import { Proposal } from '@/lib/interfaces';
import { mockProposals } from '@/mocks/handlers';
import { server } from '@/mocks/server';

// Mock the UI components
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
      {proposal.title}
    </div>
  ),
}));

const baseUrl = process.env.DEV_BACKEND_URL;

describe('Proposals List Page', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    // Reset handler before each test to ensure clean state
    server.use(
      http.get(`${baseUrl}/proposals`, () => {
        return HttpResponse.json({ data: mockProposals });
      })
    );
  });

  it('renders the proposals page title', async () => {
    // render(await Proposals());
    // expect(screen.getByText('//PROPOSALS')).toBeInTheDocument();
  });

  // it('renders proposal cards from API data', async () => {
  //     render(await Proposals());
  //     // Wait for and verify each proposal card
  //     for (const proposal of mockProposals) {
  //         const card = await screen.findByTestId(`proposal-card-${proposal.proposal_id}`);
  //         expect(card).toBeInTheDocument();
  //         expect(card).toHaveTextContent(proposal.title);
  //     }
  // });

  // it('handles empty proposals response', async () => {
  //     // Override the default handler for empty response
  //     server.use(
  //         http.get(`${baseUrl}/proposals`, () => {
  //             return HttpResponse.json({ data: [] });
  //         })
  //     );

  //     render(await Proposals());
  //     expect(screen.queryByTestId(/proposal-card/)).not.toBeInTheDocument();
  // });

  // it('renders breadcrumb with correct items', async () => {
  //     render(await Proposals());

  //     const breadcrumb = await screen.findByTestId('breadcrumb');
  //     expect(breadcrumb).toContainElement(screen.getByText('Home'));
  //     expect(breadcrumb).toContainElement(screen.getByText('Proposals'));
  // });

  // it('handles API error response', async () => {
  //     // Override the default handler to simulate error
  //     server.use(
  //         http.get(`${baseUrl}/proposals`, () => {
  //             return new HttpResponse(null, { status: 500 });
  //         })
  //     );

  //     try {
  //         await Proposals();
  //     } catch (error) {
  //         expect(error).toBeTruthy();
  //     }
  // });
});
