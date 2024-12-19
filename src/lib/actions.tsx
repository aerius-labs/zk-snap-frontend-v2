'use server';

export async function getDAOs() {
  try {
    const backendUrl = process.env.BACKEND_URL;
    const res = await fetch(`${backendUrl}/dao/all_daos`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    throw new Error('Error fetching all daos');
  }
}

export async function getProposals() {
  try {
    const backendUrl = process.env.BACKEND_URL;
    const res = await fetch(`${backendUrl}/proposal/all_proposals`, {
      next: { tags: ['daoProposals'] },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    throw new Error('Error fetching all proposals');
  }
}

export async function getDaoById(daoId: string) {
  try {
    const backendUrl = process.env.BACKEND_URL;
    const res = await fetch(`${backendUrl}/dao/${daoId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    throw new Error('Error fetching dao for current dao id');
  }
}

export async function getProposalById(proposalId: string) {
  try {
    const backendUrl = process.env.BACKEND_URL;
    const res = await fetch(`${backendUrl}/proposal/id/${proposalId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    throw new Error('Error fetching proposal for current proposal id');
  }
}

export async function getProposalsByDaoId(communityId: string) {
  try {
    const backendUrl = process.env.BACKEND_URL;
    const res = await fetch(
      `${backendUrl}/proposals_all_by_dao/${communityId}`,
      {
        next: { tags: ['daoProposals'] },
        cache: 'no-store',
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    throw new Error('Error fetching proposals for specific community');
  }
}

import { revalidateTag } from 'next/cache';
export async function revalidateProperty(propertyName: string) {
  revalidateTag(propertyName);
}
