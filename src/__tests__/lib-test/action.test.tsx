import { http, HttpResponse } from 'msw';

import {
  getDaoById,
  getDAOs,
  getProposalById,
  getProposals,
  getProposalsByDaoId,
} from '@/lib/actions';
import { mockDAOs, mockProposals } from '@/mocks/handlers';
import { server } from '@/mocks/server';

describe('Server Actions', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('getDAOs', () => {
    it('successfully fetches DAOs', async () => {
      const response = await getDAOs();
      expect(response.data).toEqual(mockDAOs);
    });

    it('handles server error', async () => {
      // Override the default handler for this specific test
      server.use(
        http.get(`${process.env.DEV_BACKEND_URL}/dao/`, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const response = await getDAOs();
      expect(response).toEqual([]);
    });

    it('handles network error', async () => {
      server.use(
        http.get(`${process.env.DEV_BACKEND_URL}/dao/`, () => {
          throw new Error('Network error');
        })
      );

      const response = await getDAOs();
      expect(response).toEqual([]);
    });
  });

  describe('getProposals', () => {
    it('successfully fetches all proposals', async () => {
      const response = await getProposals();
      expect(response.data).toEqual(mockProposals);
    });

    it('handles error response', async () => {
      server.use(
        http.get(
          `${process.env.DEV_BACKEND_URL}/proposal/all_proposals`,
          () => {
            return new HttpResponse(null, { status: 500 });
          }
        )
      );

      const response = await getProposals();
      expect(response).toEqual([]);
    });
  });

  describe('getDaoById', () => {
    it('successfully fetches DAO by ID', async () => {
      const response = await getDaoById('1');
      expect(response.data).toEqual(mockDAOs[0]);
    });

    it('handles non-existent DAO', async () => {
      const response = await getDaoById('999');
      expect(response).toEqual([]);
    });

    it('handles server error', async () => {
      server.use(
        http.get(`${process.env.DEV_BACKEND_URL}/dao/:id`, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const response = await getDaoById('1');
      expect(response).toEqual([]);
    });
  });

  describe('getProposalById', () => {
    it('successfully fetches proposal by ID', async () => {
      const response = await getProposalById('1');
      expect(response.data).toEqual(mockProposals[0]);
    });

    it('handles non-existent proposal', async () => {
      const response = await getProposalById('999');
      expect(response).toEqual([]);
    });

    it('handles server error', async () => {
      server.use(
        http.get(`${process.env.DEV_BACKEND_URL}/proposal/id/:id`, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const response = await getProposalById('1');
      expect(response).toEqual([]);
    });
  });

  describe('getProposalsByDaoId', () => {
    it('successfully fetches proposals by DAO ID', async () => {
      const response = await getProposalsByDaoId('1');
      expect(response.data).toEqual(mockProposals);
    });

    it('handles DAO with no proposals', async () => {
      const response = await getProposalsByDaoId('999');
      expect(response).toEqual([]);
    });

    it('handles server error', async () => {
      server.use(
        http.get(
          `${process.env.DEV_BACKEND_URL}/proposals_all_by_dao/:id`,
          () => {
            return new HttpResponse(null, { status: 500 });
          }
        )
      );

      const response = await getProposalsByDaoId('1');
      expect(response).toEqual([]);
    });
  });
});
