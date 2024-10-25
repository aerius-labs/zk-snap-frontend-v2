import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

import { POST } from '@/app/api/create-proposal/route';

process.env.JWT_SECRET = 'test-secret';

global.fetch = jest.fn();

jest.mock('next/server', () => {
  const originalModule = jest.requireActual('next/server');
  return {
    ...originalModule,
    NextResponse: {
      json: jest.fn((data, options) => {
        return {
          status: options?.status || 200,
          json: async () => data,
        };
      }),
    },
  };
});

describe('Proposal API Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockToken = jwt.sign(
    {
      nullifier: 'test-nullifier',
      membership_root: 'test-root',
      membership_proof: 'test-proof',
    },
    process.env.JWT_SECRET as string
  );

  const mockProposalData = {
    title: 'Test Proposal',
    description: 'Test Description',
    start_date: '2024-01-01',
    end_date: '2024-01-07',
  };

  const createRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/proposal', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  it('successfully creates a proposal', async () => {
    const mockResponse = { success: true, proposal_id: '123' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const request = createRequest({
      proposalData: mockProposalData,
      token: mockToken,
    });

    const response = await POST(request);
    const result = await response.json();

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe('http://localhost:8080/proposal/');
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual({
      creator: 'test-nullifier',
      title: 'Test Proposal',
      description: 'Test Description',
      start_date: '2024-01-01',
      end_date: '2024-01-07',
      membership_root: 'test-root',
      nullifier: 'test-nullifier',
      membership_proof: 'test-proof',
    });
  });

  it('handles invalid JWT token', async () => {
    const request = createRequest({
      proposalData: mockProposalData,
      token: 'invalid-token',
    });

    const response = await POST(request);
    const result = await response.json();

    expect(result).toEqual({
      success: false,
      error: 'Internal Server Error',
    });
    expect(response.status).toBe(500);
  });

  it('handles missing data', async () => {
    const request = createRequest({
      proposalData: null,
      token: mockToken,
    });

    const response = await POST(request);
    const result = await response.json();

    expect(result).toEqual({
      success: false,
      error: 'Internal Server Error',
    });
    expect(response.status).toBe(500);
  });

  it('handles API error response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Bad Request' }),
    });

    const request = createRequest({
      proposalData: mockProposalData,
      token: mockToken,
    });

    const response = await POST(request);
    const result = await response.json();

    expect(result).toEqual({
      success: false,
      error: 'Internal Server Error',
    });
    expect(response.status).toBe(500);
  });

  it('handles network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Internal Server Error')
    );

    const request = createRequest({
      proposalData: mockProposalData,
      token: mockToken,
    });

    const response = await POST(request);
    const result = await response.json();

    expect(result).toEqual({
      success: false,
      error: 'Internal Server Error',
    });
    expect(response.status).toBe(500);
  });
});
