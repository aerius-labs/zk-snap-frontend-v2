export interface DAO {
  id: string;
  name: string;
  description: string;
  image_url: string;
  proposals_count: number;
  members_count: number;
}

export interface Proposal {
  proposal_id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  end_date: string;
  dao_id: string;
}

export type APIResponse<T> = {
  data: T;
  error?: string;
};
