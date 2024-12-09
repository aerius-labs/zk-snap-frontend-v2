import { http, HttpResponse } from 'msw';

import type { DAO, Proposal } from './types';

const baseUrl = process.env.BACKEND_URL;

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
  http.get(`${baseUrl}/dao/all_daos`, () => {
    return HttpResponse.json({ data: mockDAOs });
  }),

  http.get(`${baseUrl}/dao/:id`, ({ params }: any) => {
    const dao = mockDAOs.find((d) => d.id === params.id);
    if (!dao) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ data: dao });
  }),

  http.get(`${baseUrl}/proposal/all_proposals`, () => {
    return HttpResponse.json({ data: mockProposals });
  }),

  http.get(`${baseUrl}/proposal/id/:id`, ({ params }: any) => {
    const proposal = mockProposals.find((p) => p.proposal_id === params.id);
    if (!proposal) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ data: proposal });
  }),

  http.get(`${baseUrl}/proposals_all_by_dao/:id`, ({ params }: any) => {
    const proposals = mockProposals.filter((p) => p.dao_id === params.id);
    if (!proposals.length) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ data: proposals });
  }),
];
