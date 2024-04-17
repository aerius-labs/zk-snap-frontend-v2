'use client';

import { useState } from 'react';

interface VotingProps {
  proposalName: string;
}
export default function Vote({ proposalName }: VotingProps) {
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

  const handleVote = () => {
    setIsVotingModalOpened(false);
  };

  return (
    <div className='mb-4 flex flex-col items-center'>
      <button
        type='button'
        onClick={() => setIsVotingModalOpened(true)}
        className='w-full rounded-[20px] bg-light p-6'
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
                className={`block cursor-pointer rounded-[20px] bg-lightDark p-4 text-xl font-bold text-light ${activeButton === 'FOR' ? 'bg-purple-300' : ''}`}
              >
                FOR
              </button>

              <button
                type='button'
                onClick={() => handleOptionClick('AGAINST')}
                className={`block cursor-pointer rounded-[20px] bg-lightDark p-4 text-xl font-bold text-light ${activeButton === 'AGAINST' ? 'bg-purple-300' : ''}`}
              >
                AGAINST
              </button>

              <button
                type='button'
                onClick={() => handleOptionClick('ABSTAIN')}
                className={`block cursor-pointer rounded-[20px] bg-lightDark p-4 text-xl font-bold text-light ${activeButton === 'ABSTAIN' ? 'bg-purple-300' : ''}`}
              >
                ABSTAIN
              </button>
            </div>
            {activeButton !== null && (
              <button
                type='button'
                onClick={handleVote}
                className='block cursor-pointer rounded-b-[20px] bg-light p-4 text-3xl font-bold text-dark'
              >
                CONFIRM
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
