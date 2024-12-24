'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import {
  type DAO,
  daoArraySchema,
  daoSchema,
  type DetailedProposal,
  detailedProposalSchema,
  type Proposal,
  proposalArraySchema,
} from '@/lib/validations/schema';

import { ApiError } from './validations/api-error';

const validateResponse = async <T>(
  response: Response,
  schema: z.ZodSchema<T>
): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    );
  }

  const data = await response.json();
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error details:', error.errors);
      throw new ApiError('Invalid data received from API', 500, error);
    }
    throw error;
  }
};

export async function getDAOs(): Promise<DAO[]> {
  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error('Backend URL is not configured');
    }

    const res = await fetch(`${backendUrl}/dao/all_daos`, {
      next: { revalidate: 60 },
    });

    return await validateResponse(res, daoArraySchema);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Error fetching all daos', 500);
  }
}

export async function getProposals(): Promise<Proposal[]> {
  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error('Backend URL is not configured');
    }

    const res = await fetch(`${backendUrl}/proposal/all_proposals`, {
      next: { tags: ['daoProposals'] },
      cache: 'no-store',
    });

    return await validateResponse(res, proposalArraySchema);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Error fetching all proposals', 500);
  }
}

export async function getDaoById(daoId: string): Promise<DAO> {
  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error('Backend URL is not configured');
    }

    const res = await fetch(`${backendUrl}/dao/${daoId}`, {
      next: { revalidate: 60 },
    });

    return await validateResponse(res, daoSchema);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Error fetching dao for current dao id', 500);
  }
}

export async function getProposalById(
  proposalId: string
): Promise<DetailedProposal> {
  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error('Backend URL is not configured');
    }

    const res = await fetch(`${backendUrl}/proposal/id/${proposalId}`, {
      next: { revalidate: 60 },
    });

    return await validateResponse(res, detailedProposalSchema);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Error fetching proposal for current proposal id', 500);
  }
}

export async function getProposalsByDaoId(
  communityId: string
): Promise<Proposal[]> {
  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error('Backend URL is not configured');
    }

    const res = await fetch(
      `${backendUrl}/proposals_all_by_dao/${communityId}`,
      {
        next: { tags: ['daoProposals'] },
        cache: 'no-store',
      }
    );

    return await validateResponse(res, proposalArraySchema);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Error fetching proposals for specific community', 500);
  }
}

export async function revalidateProperty(propertyName: string) {
  revalidateTag(propertyName);
}
