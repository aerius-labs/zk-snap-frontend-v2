import { verifyCloudProof } from '@worldcoin/idkit-core/backend';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

import { POST as verifyHandler } from '@/app/api/verify/route';

jest.mock('jsonwebtoken');
jest.mock('@worldcoin/idkit-core/backend');
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn((data) => ({
      status: 200,
      json: () => Promise.resolve(data),
    })),
  },
}));

describe('Verify API Endpoint', () => {
  const originalEnv = process.env;
  const mockProof = {
    merkle_root: 'test_root',
    nullifier_hash: 'test_nullifier',
    proof: 'test_proof',
  };

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  const mockRequest = (body: any) => {
    return {
      json: () => Promise.resolve(body),
    } as unknown as NextRequest;
  };

  it('should successfully verify proof and return token', async () => {
    // Mock successful verification
    (verifyCloudProof as jest.Mock).mockResolvedValue({ success: true });
    (jwt.sign as jest.Mock).mockReturnValue('test_token');

    const req = mockRequest(mockProof);
    const response = await verifyHandler(req);
    const data = await (response as any).json();

    expect(data).toEqual({
      success: true,
      verificationToken: 'test_token',
    });

    expect(verifyCloudProof).toHaveBeenCalledWith(
      mockProof,
      'app_staging_015e42f1bc88163d4997a1eb2f522250',
      'action'
    );

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        membership_root: mockProof.merkle_root,
        nullifier: mockProof.nullifier_hash,
        membership_proof: mockProof.proof,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  it('should handle verification failure', async () => {
    const mockError = {
      success: false,
      code: 'test_error',
      attribute: 'test_attribute',
      detail: 'test_detail',
    };

    (verifyCloudProof as jest.Mock).mockResolvedValue(mockError);

    const req = mockRequest(mockProof);
    const response = await verifyHandler(req);
    const data = await (response as any).json();

    expect(data).toEqual(mockError);
  });

  it('should handle missing environment variables', async () => {
    process.env.APP_ID = undefined;

    const req = mockRequest(mockProof);
    const response = await verifyHandler(req);
    const data = await (response as any).data;

    expect(data).toEqual(undefined);
  });
});
