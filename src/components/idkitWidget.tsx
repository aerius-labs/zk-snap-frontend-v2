'use client';
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from '@worldcoin/idkit';
import React from 'react';

const ConnectWorldCoinID: React.FC = () => {
  const handleVerify = async (proof: ISuccessResult) => {
    const res: any = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proof),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error('Verification failed.');
    }
  };

  const onSuccess = () => {
    console.log('Success');
  };

  return (
    <IDKitWidget
      app_id='app_staging_656c2c90fd60769ba4363d67ae02c5d2'
      action='m'
      verification_level={VerificationLevel.Orb}
      handleVerify={handleVerify}
      onSuccess={onSuccess}
    >
      {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
  );
};

export default ConnectWorldCoinID;
