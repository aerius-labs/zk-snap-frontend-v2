import { VerificationLevel } from '@worldcoin/idkit-core';
import { verifyCloudProof } from '@worldcoin/idkit-core/backend';
import { NextResponse } from 'next/server';

export type VerifyReply = {
  success: boolean;
  code?: string;
  attribute?: string | null;
  detail?: string;
};

interface IVerifyRequest {
  proof: {
    nullifier_hash: string;
    merkle_root: string;
    proof: string;
    verification_level: VerificationLevel;
  };
  signal?: string;
}

const app_id = process.env.APP_ID as `app_${string}`;
const action = process.env.ACTION_ID as string;

export async function POST(request: Request) {
  const proof = await request.json();
  const verifyRes = await verifyCloudProof(proof, app_id, action);
  console.log('verifyRes', verifyRes, proof, app_id, action);
  if (verifyRes.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({
      success: false,
      code: verifyRes.code,
      attribute: verifyRes.attribute,
      detail: verifyRes.detail,
    });
  }
}
