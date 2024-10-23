import { http, HttpResponse } from 'msw';

import type { DAO, Proposal } from './types';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Mock data
export const mockDAOs: DAO[] = [
  {
    id: '1',
    name: 'Test DAO',
    description: 'Test Description',
    image_url: 'test.jpg',
    proposals_count: 1,
    members_count: 1,
  },
];

export const mockProposals: Proposal[] = [
  {
    proposal_id: '1',
    title: 'Test Proposal',
    description: 'Test Description',
    status: 'active',
    created_at: '2024-01-01',
    end_date: '2024-02-01',
    dao_id: '1',
  },
];

export const handlers = [
  // GET /api/daos
  http.get(`${baseUrl}/daos`, () => {
    return HttpResponse.json({ data: mockDAOs });
  }),

  // GET /api/daos/:id
  http.get(`${baseUrl}/daos/:id`, ({ params }: any) => {
    const dao = mockDAOs.find((d) => d.id === params.id);
    if (!dao) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ data: dao });
  }),

  // GET /api/proposals
  http.get(`${baseUrl}/proposals`, () => {
    return HttpResponse.json({ data: mockProposals });
  }),

  // GET /api/proposals/:id
  http.get(`${baseUrl}/proposals/:id`, ({ params }: any) => {
    const proposal = mockProposals.find((p) => p.proposal_id === params.id);
    if (!proposal) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ data: proposal });
  }),
];
