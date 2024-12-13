import { format, parseISO } from 'date-fns';
import { BigInteger } from 'jsbn';
import pako from 'pako';

export const calculateTimeRemaining = (endTime: string): string => {
  const end = new Date(endTime);
  const now = new Date();
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) return 'Ended';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
};

export const calculateTimeToStart = (startTime: string): string => {
  const start = new Date(startTime);
  const now = new Date();
  const diff = start.getTime() - now.getTime();

  if (diff <= 0) return 'Starting soon';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
};

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

interface EncryptionPublicKey {
  n: bigint;
  g: bigint;
}

interface WasmInput {
  pk_enc: EncryptionPublicKey;
  nullifier: bigint;
  proposal_id: bigint;
  vote_enc: bigint[];
  vote: bigint[];
  r_enc: bigint[];
}

export function transformToWasmInput(input: any): WasmInput {
  // Convert public key
  const pkEnc: EncryptionPublicKey = {
    n: BigInt(input.enc_pub.n),
    g: BigInt(input.enc_pub.g),
  };

  // Convert vote_enc strings to BigInt
  const voteEnc = input.vote_enc.map((v: string) => BigInt(v));

  return {
    pk_enc: pkEnc,
    nullifier: BigInt(input.nullifier),
    proposal_id: BigInt(`0x${input.proposal_id}`),
    vote_enc: voteEnc,
    vote: input.vote.map((v: string | number) => BigInt(v)),
    r_enc: input.r_enc.map((r: string | number) => BigInt(r)),
  };
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
