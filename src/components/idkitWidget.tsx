'use client';
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from '@worldcoin/idkit';
import React from 'react';
import { toast } from 'sonner';

import { IdkitHandler } from '@/lib/interfaces';
import { useNullifierStore } from '@/lib/store';

const ConnectWorldCoinID: React.FC<IdkitHandler> = ({
  placeholder,
  onSuccess,
  className,
  disabled,
}) => {
  const { setNullifier } = useNullifierStore();
  const handleVerify = async (proof: ISuccessResult) => {
    try {
      setNullifier(proof.nullifier_hash);
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proof),
      });
      if (!res.ok) {
        throw new Error('Verification failed.');
      }
      const verificationResult = await res.json();

      if (verificationResult.success) {
        await onSuccess(verificationResult.verificationToken);
      } else {
        throw verificationResult.detail || 'Verification failed.';
      }
    } catch (error) {
      toast.error('Verification error', {
        description: error as string,
      });
    }
  };

  return (
    <IDKitWidget
      app_id='app_staging_015e42f1bc88163d4997a1eb2f522250'
      action='action'
      verification_level={VerificationLevel.Orb}
      handleVerify={handleVerify}
      onSuccess={() => {}}
    >
      {({ open }) => (
        <button onClick={open} className={className} disabled={disabled}>
          {placeholder}
        </button>
      )}
    </IDKitWidget>
  );
};

export default ConnectWorldCoinID;
