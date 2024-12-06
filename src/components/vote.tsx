'use client';

import { poseidon1 } from 'poseidon-lite';
import { useEffect, useRef, useState } from 'react';

import { useNullifierStore } from '@/lib/store';
import { encVote, generateSecureRandomBigInt } from '@/utils/handler';

import ConnectWorldCoinID from './idkitWidget';

interface VotingProps {
  proposalName: string;
  encrypted_keys: any;
  proposal_id: string;
}

export default function Vote({
  proposalName,
  encrypted_keys,
  proposal_id,
}: VotingProps) {
  const workerRef = useRef<Worker>();
  const [isVotingModalOpened, setIsVotingModalOpened] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOptionClick = (value: string) => {
    setActiveButton(value);
  };

  const handleOutsideClick = (e: any) => {
    if (e.target.id === 'modal') {
      setIsVotingModalOpened(false);
    }
  };

  const handleVote = () => {
    setLoading(true);
    setIsVotingModalOpened(false);
    const n = JSON.parse(encrypted_keys.pub_key).n;
    const g = JSON.parse(encrypted_keys.pub_key).g;
    const forOption = activeButton === 'FOR' ? 1 : 0;
    const againstOption = activeButton === 'AGAINST' ? 1 : 0;
    const abstainOption = activeButton === 'ABSTAIN' ? 1 : 0;
    const vote = [forOption, againstOption, abstainOption];
    const r_enc = [
      generateSecureRandomBigInt(176),
      generateSecureRandomBigInt(176),
      generateSecureRandomBigInt(176),
    ];
    const encryptedVote = [];
    for (let i = 0; i < vote.length; i++) {
      const enc = encVote(vote[i], r_enc[i], BigInt(n), BigInt(g));
      encryptedVote.push(enc.toString());
    }
    const nullifierMid = useNullifierStore.getState().nullifier as string;
    const nullifier = poseidon1([nullifierMid]);
    const proofInputs = {
      vote: vote,
      enc_pub: { n: n, g: g },
      proposal_id: proposal_id,
      vote_enc: encryptedVote,
      r_enc: r_enc,
      nullifier: nullifier,
    };
    console.log('Posting Message', workerRef.current);
    if (workerRef.current) {
      console.log('Posted');
      workerRef.current.postMessage(proofInputs);
    }
  };

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('./workers/vote.js', import.meta.url),
      {
        type: 'module',
      }
    );
    workerRef.current.onmessage = async (event) => {
      console.log('event data by worker', event.data);
      const instancesArray = Object.values(event.data.instances);
      const proofArray = Object.values(event.data.proof);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_DEV_BACKEND_URL;
        const response = await fetch(
          `${backendUrl}/proposal/vote/${proposal_id}/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              proof: proofArray,
              instances: instancesArray,
            }),
          }
        );

        const result = await response.json();
        if (result.ok) {
          console.log('Data sent successfully');
        } else {
          console.error('Failed to send data');
        }
      } catch (error) {
        console.error('Error sending worker data:', error);
      }
      setLoading(false);
    };
    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error);
      setLoading(false);
    };
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        setLoading(false);
      }
    };
  }, []);

  return (
    <div className='mb-4 flex flex-col items-center'>
      <button
        type='button'
        onClick={() => setIsVotingModalOpened(true)}
        className='w-full rounded-[20px] bg-light px-6 py-4 text-4xl font-bold hover:bg-purple-300'
        disabled={loading}
      >
        Vote
      </button>
      {isVotingModalOpened && (
        <div
          id='modal'
          onClick={handleOutsideClick}
          onKeyDown={handleOutsideClick}
          className='fixed left-0 top-0 flex size-full items-center justify-center bg-dark bg-opacity-80'
          role='presentation'
        >
          <div className='flex w-5/6 flex-col rounded-[20px] border-2 border-subText bg-black-700 lg:w-2/6'>
            <p className='rounded-[20px] bg-lightDark p-6 text-3xl font-bold text-light'>
              {proposalName}
            </p>
            <div className='flex flex-col gap-7 p-6'>
              <button
                type='button'
                onClick={() => handleOptionClick('FOR')}
                className={`block cursor-pointer rounded-[20px] bg-lightDark p-4 text-xl font-bold text-light ${activeButton === 'FOR' ? 'bg-purple-300' : 'hover:bg-dividers'}`}
              >
                FOR
              </button>

              <button
                type='button'
                onClick={() => handleOptionClick('AGAINST')}
                className={`block cursor-pointer rounded-[20px] bg-lightDark p-4 text-xl font-bold text-light ${activeButton === 'AGAINST' ? 'bg-purple-300' : 'hover:bg-dividers'}`}
              >
                AGAINST
              </button>

              <button
                type='button'
                onClick={() => handleOptionClick('ABSTAIN')}
                className={`block cursor-pointer rounded-[20px] bg-lightDark p-4 text-xl font-bold text-light ${activeButton === 'ABSTAIN' ? 'bg-purple-300' : 'hover:bg-dividers'}`}
              >
                ABSTAIN
              </button>
            </div>
            {activeButton !== null && (
              <ConnectWorldCoinID
                placeholder='CONFIRM'
                onSuccess={handleVote}
                className='block cursor-pointer rounded-b-[20px] bg-light p-4 text-3xl font-bold text-dark'
                disabled={false}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
