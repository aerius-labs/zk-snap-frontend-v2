import { VerificationLevel } from '@worldcoin/idkit-core';

export interface DaoDetails {
  id: string;
  name: string;
  logo: string;
}

export enum ProposalStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export interface Proposal {
  proposal_id: string;
  dao_name: string;
  creator: string;
  dao_logo: string;
  title: string;
  status: ProposalStatus;
  start_time: string;
  end_time: string;
}

export interface ProposalDetails {
  proposal_id: string;
  dao_name: string;
  creator_address: string;
  dao_logo: string;
  proposal_name: string;
  proposal_status: ProposalStatus;
  proposal_description: string;
  start_time: string;
  end_time: string;
}

export interface Status {
  status: ProposalStatus;
  start_time: string;
  end_time: string;
}

export type VerifyReply = {
  success: boolean;
  code?: string;
  attribute?: string | null;
  detail?: string;
};

export interface IVerifyRequest {
  proof: {
    nullifier_hash: string;
    merkle_root: string;
    proof: string;
    verification_level: VerificationLevel;
  };
  signal?: string;
}

export interface IdkitHandler {
  placeholder: string;
  onSuccess: any;
  className: string;
  disabled: boolean;
}