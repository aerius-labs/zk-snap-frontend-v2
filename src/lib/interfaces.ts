import { VerificationLevel } from '@worldcoin/idkit-core';

import {
  Period,
  TimePickerType,
} from '@/components/time-picker/time-picker-utils';

export interface DaoDetails {
  id: string;
  name: string;
  logo: string;
}

export enum ProposalStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Completed = 'Completed',
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
  dao_id: string;
  creator_address: string;
  dao_logo: string;
  proposal_name: string;
  proposal_status: ProposalStatus;
  proposal_description: string;
  start_time: string;
  end_time: string;
  encrypted_keys: any;
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

export interface BreadCrumbItem {
  label: string;
  href: string;
  isCurrentPage: boolean;
}

export interface IndicatorsProps {
  totalSteps: number;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export interface VotingProps {
  proposalName: string;
  encrypted_keys: any;
  proposal_id: string;
  start_time: string;
  end_time: string;
}

export interface VoteResults {
  for: number;
  against: number;
  abstain: number;
}

export interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  period?: Period;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

export interface JWTPayload {
  nullifier: string;
  membership_root: string;
  membership_proof: string;
}
