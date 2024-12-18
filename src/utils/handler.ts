import { format, parseISO } from 'date-fns';
import pako from 'pako';

export function formatDate(dateString: string) {
  if (!dateString) {
    return undefined;
  }
  const date = parseISO(dateString);
  return format(date, 'MMM dd, yyyy, hh:mm a');
}

export function generateSecureRandomBigInt(bitLength: number): bigint {
  if (typeof window !== 'undefined' && window.crypto) {
    const randomBytes = window.crypto.getRandomValues(
      new Uint8Array(bitLength / 8)
    );
    return Array.from(randomBytes).reduce(
      (acc, byte) => (acc << 8n) | BigInt(byte),
      0n
    );
  }
  return BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
}

export function encVote(m: number, r: bigint, n: bigint, g: bigint): bigint {
  const bigM = BigInt(m);
  const bigR = r;
  const bigN = n;
  const bigG = g;
  const n2 = bigN * bigN;
  const gm = modPow(bigG, bigM, n2);
  const rn = modPow(bigR, bigN, n2);
  const c = (gm * rn) % n2;
  return c;
}

function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    base = (base * base) % modulus;
    exponent = exponent / 2n;
  }
  return result;
}

export async function decompressData(compressedFile: any) {
  try {
    // Read the compressed file as ArrayBuffer
    const arrayBuffer = await compressedFile.arrayBuffer();
    const compressedData = new Uint8Array(arrayBuffer);

    // Decompress using pako
    const decompressedData = pako.inflate(compressedData);

    return decompressedData;
  } catch (error) {
    console.error('Decompression failed:', error);
    throw new Error('Failed to decompress file');
  }
}
