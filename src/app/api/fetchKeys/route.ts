import { NextResponse } from 'next/server';

export const runtime = 'edge';

const fetchWithProgress = async (url: string) => {
  const response = await fetch(url);
  const reader = response.body!.getReader();
  const contentLength = Number(response.headers.get('Content-Length'));

  let receivedLength = 0;
  const chunks = [];
  const condition = true;
  while (condition) {
    const { done, value } = await reader.read();
    if (done) break;

    chunks.push(value);
    receivedLength += value.length;
  }

  const resultArray = new Uint8Array(receivedLength);
  let position = 0;
  for (const chunk of chunks) {
    resultArray.set(chunk, position);
    position += chunk.length;
  }

  return resultArray;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return new NextResponse('File parameter is required', { status: 400 });
  }

  const fileUrl = `https://storage.googleapis.com/zk-snap/${file}`;

  try {
    // Fetch directly from Google Cloud Storage
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Stream the response directly
    return new Response(response.body, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': response.headers.get('Content-Length') || '',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    return new NextResponse('Error fetching file', { status: 500 });
  }
}
