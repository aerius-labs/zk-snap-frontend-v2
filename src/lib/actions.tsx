export async function getDAOs() {
  try {
    const backendUrl = process.env.BACKEND_URL;
    console.log('Backend URL:', backendUrl);
    const res = await fetch(`${backendUrl}/dao/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching DAOs:', error);
    return [];
  }
}

export async function getProposals() {
  try {
    const backendUrl = process.env.BACKEND_URL;
    console.log('Backend URL:', backendUrl);
    const res = await fetch(`${backendUrl}/proposal/all_proposals`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching Proposals:', error);
    return [];
  }
}

export async function getDaoById(daoId: string) {
  try {
    const backendUrl = process.env.BACKEND_URL;
    console.log('Backend URL:', backendUrl);
    const res = await fetch(`${backendUrl}/dao/${daoId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching Proposals:', error);
    return [];
  }
}

export async function getProposalById(proposalId: string) {
  try {
    const backendUrl = process.env.BACKEND_URL;
    console.log('Backend URL:', backendUrl);
    const res = await fetch(`${backendUrl}/proposal/id/${proposalId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching Proposals:', error);
    return [];
  }
}

export async function getProposalsByDaoId(communityId: string) {
  try {
    const backendUrl = process.env.BACKEND_URL;
    console.log('Backend URL:', backendUrl);
    const res = await fetch(
      `${backendUrl}/proposals_all_by_dao/${communityId}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching Proposals:', error);
    return [];
  }
}
