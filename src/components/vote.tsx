'use client';

import { useEffect, useRef, useState } from 'react';
import ConnectWorldCoinID from './idkitWidget';

interface VotingProps {
  proposalName: string;
}
export default function Vote({ proposalName }: VotingProps) {
  const workerRef = useRef<Worker>();
  const [isVotingModalOpened, setIsVotingModalOpened] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleOptionClick = (value: string) => {
    setActiveButton(value);
  };

  const handleOutsideClick = (e: any) => {
    if (e.target.id === 'modal') {
      setIsVotingModalOpened(false);
    }
  };

  const handleVote = (e: any) => {
    setIsVotingModalOpened(false);
    const proofInputs = {
      voteOption: activeButton,
    };
    console.log('Posting Message', workerRef.current);

    if (workerRef.current) {
      console.log('Posted');
      workerRef.current.postMessage(proofInputs);
    }
    console.log(activeButton);
  };

  useEffect(() => {
    workerRef.current = new Worker('/workers/vote.js', {
      type: 'module',
    });
    workerRef.current.onmessage = (event) => {
      console.log('event data by worker', event.data);
    };
    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error);
    };
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  return (
    <div className='mb-4 flex flex-col items-center'>
      <button
        type='button'
        onClick={() => setIsVotingModalOpened(true)}
        className='w-full rounded-[20px] bg-light px-6 py-4 text-4xl font-bold hover:bg-purple-300'
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
                onSuccess={async (token: string) => handleVote(token)}
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
