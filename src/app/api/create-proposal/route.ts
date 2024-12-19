import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { JWTPayload } from '@/lib/interfaces';

export async function POST(request: NextRequest) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const { proposalData, token } = await request.json();
    const parsedData = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const bodyData = {
      creator: parsedData.nullifier,
      ...proposalData,
      membership_root: parsedData.membership_root,
      nullifier: parsedData.nullifier,
      membership_proof: parsedData.membership_proof,
    };
    const response = await fetch(`${process.env.BACKEND_URL}/proposal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
