import { NextResponse } from 'next/server';

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

  const fileUrl = `https://storage.googleapis.com/zk-snap/${file}`;

  try {
    const response = await fetchWithProgress(fileUrl);

    return new NextResponse(response, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    return new NextResponse('Error fetching file', { status: 500 });
  }
}
