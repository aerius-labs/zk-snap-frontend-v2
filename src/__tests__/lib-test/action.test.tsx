/**
 * @jest-environment node
 */

import { enableFetchMocks } from 'jest-fetch-mock';

import {
  getDaoById,
  getDAOs,
  getProposalById,
  getProposals,
  getProposalsByDaoId,
} from '../../lib/actions';

enableFetchMocks();

describe('Server Actions', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    process.env.BACKEND_URL = 'http://test-api.com';
  });

  describe('getDAOs', () => {
    it('successfully fetches DAOs', async () => {
      const mockDAOs = [
        { id: '1', name: 'DAO 1' },
        { id: '2', name: 'DAO 2' },
      ];

      fetchMock.mockResponseOnce(JSON.stringify(mockDAOs));

      const result = await getDAOs();
      expect(result).toEqual(mockDAOs);
      expect(fetchMock).toHaveBeenCalledWith('http://test-api.com/dao/', {
        next: { revalidate: 60 },
      });
    });

    it('handles fetch error gracefully', async () => {
      fetchMock.mockRejectOnce(new Error('Network error'));

      const result = await getDAOs();
      expect(result).toEqual([]);
    });
  });

  describe('getProposals', () => {
    it('successfully fetches proposals', async () => {
      const mockProposals = [
        { id: '1', title: 'Proposal 1' },
        { id: '2', title: 'Proposal 2' },
      ];

      fetchMock.mockResponseOnce(JSON.stringify(mockProposals));

      const result = await getProposals();
      expect(result).toEqual(mockProposals);
      expect(fetchMock).toHaveBeenCalledWith(
        'http://test-api.com/proposal/all_proposals',
        {
          next: { revalidate: 60 },
        }
      );
    });
  });

  describe('getDaoById', () => {
    it('successfully fetches DAO by ID', async () => {
      const mockDao = { id: '1', name: 'Test DAO' };
      fetchMock.mockResponseOnce(JSON.stringify(mockDao));

      const result = await getDaoById('1');
      expect(result).toEqual(mockDao);
      expect(fetchMock).toHaveBeenCalledWith('http://test-api.com/dao/1', {
        next: { revalidate: 60 },
      });
    });
  });

  describe('getProposalById', () => {
    it('successfully fetches proposal by ID', async () => {
      const mockProposal = { id: '1', title: 'Test Proposal' };
      fetchMock.mockResponseOnce(JSON.stringify(mockProposal));

      const result = await getProposalById('1');
      expect(result).toEqual(mockProposal);
      expect(fetchMock).toHaveBeenCalledWith(
        'http://test-api.com/proposal/id/1',
        {
          next: { revalidate: 60 },
        }
      );
    });
  });

  describe('getProposalsByDaoId', () => {
    it('successfully fetches proposals by DAO ID', async () => {
      const mockProposals = [
        { id: '1', title: 'Proposal 1' },
        { id: '2', title: 'Proposal 2' },
      ];
      fetchMock.mockResponseOnce(JSON.stringify(mockProposals));

      const result = await getProposalsByDaoId('1');
      expect(result).toEqual(mockProposals);
      expect(fetchMock).toHaveBeenCalledWith(
        'http://test-api.com/proposals_all_by_dao/1',
        {
          next: { tags: ['daoProposals'] },
          cache: 'no-store',
        }
      );
    });
  });
});
