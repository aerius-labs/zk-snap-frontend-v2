import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const { proposalData, token } = await request.json();
    const parsedData: any = jwt.verify(token, JWT_SECRET);
    const bodyData = {
      creator: parsedData.nullifier,
      ...proposalData,
      membership_root: parsedData.membership_root,
      nullifier: parsedData.nullifier,
      membership_proof: parsedData.membership_proof,
    };
    const response = await fetch('http://localhost:8080/proposal/', {
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
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
