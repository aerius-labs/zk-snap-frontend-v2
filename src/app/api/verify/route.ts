import { verifyCloudProof } from '@worldcoin/idkit-core/backend';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const app_id = process.env.APP_ID as `app_${string}`;
const action = process.env.ACTION_ID as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: NextRequest, res?: NextResponse) {
  if (!app_id || !action || !JWT_SECRET) {
    return {
      success: false,
      error: 'Internal Server Error',
    };
  }
  const proof = await request.json();
  const verifyRes = await verifyCloudProof(proof, app_id, action);
  const token = jwt.sign(
    {
      membership_root: proof.merkle_root,
      nullifier: proof.nullifier_hash,
      membership_proof: proof.proof,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  if (verifyRes?.success) {
    return NextResponse.json({ success: true, verificationToken: token });
  } else {
    return NextResponse.json({
      success: false,
      code: verifyRes?.code,
      attribute: verifyRes?.attribute,
      detail: verifyRes?.detail,
    });
  }
}
