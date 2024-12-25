// lib/validations/schema.ts
import { z } from 'zod';

import { ProposalStatus } from '@/lib/interfaces';

// Encrypted keys schema
const encryptedKeysSchema = z.object({
  pub_key: z.string(),
  pvt_key: z.string(),
});

// Schema for DaoDetails
const daoSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  logo: z.string().url('Invalid logo URL').min(1, 'Logo URL is required'),
});

// Schema for array of DAOs
const daoArraySchema = z.array(daoSchema);

// Schema for basic Proposal
const proposalSchema = z.object({
  proposal_id: z.string().min(1),
  dao_name: z.string().min(1),
  creator: z.string().min(1),
  dao_logo: z.string().url('Invalid logo URL').min(1),
  title: z.string().min(1),
  status: z.nativeEnum(ProposalStatus),
  start_time: z.string(),
  end_time: z.string(),
});

// Schema for ProposalDetails
const detailedProposalSchema = z.object({
  id: z.string().min(1),
  dao_name: z.string().min(1),
  creator: z.string().min(1),
  dao_logo: z.string().url('Invalid logo URL').min(1),
  dao_id: z.string(),
  title: z.string().min(1),
  status: z.nativeEnum(ProposalStatus),
  description: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  encrypted_keys: encryptedKeysSchema,
});

// Schema for array of proposals
const proposalArraySchema = z.array(proposalSchema);

// Additional schema for Status interface
const statusSchema = z.object({
  status: z.nativeEnum(ProposalStatus),
  start_time: z.string(),
  end_time: z.string(),
});

// Additional schema for VerifyReply interface
const verifyReplySchema = z.object({
  success: z.boolean(),
  code: z.string().optional(),
  attribute: z.string().nullable().optional(),
  detail: z.string().optional(),
});

export {
  daoArraySchema,
  daoSchema,
  detailedProposalSchema,
  proposalArraySchema,
  proposalSchema,
  statusSchema,
  verifyReplySchema,
};

// Type exports that match your interfaces
export type DAO = z.infer<typeof daoSchema>;
export type Proposal = z.infer<typeof proposalSchema>;
export type DetailedProposal = z.infer<typeof detailedProposalSchema>;
export type Status = z.infer<typeof statusSchema>;
export type VerifyReply = z.infer<typeof verifyReplySchema>;
