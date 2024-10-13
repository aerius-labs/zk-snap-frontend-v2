'use client';
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from '@worldcoin/idkit';
import React from 'react';

import { IdkitHandler } from '@/lib/interfaces';

const ConnectWorldCoinID: React.FC<IdkitHandler> = ({
  placeholder,
  onSuccess,
  className,
  disabled,
}) => {
  const handleVerify = async (proof: ISuccessResult) => {
    try {
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
        throw new Error(verificationResult.detail || 'Verification failed.');
      }
    } catch (error) {
      console.error('Verification error:', error);
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
