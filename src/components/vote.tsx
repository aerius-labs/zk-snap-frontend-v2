import { useState } from 'react';

export default function Vote() {
  const [isVotingModalOpened, setIsVotingModalOpened] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  const handleOptionClick = (value: string) => {
    setActiveButton(value);
  };
  const handleOutsideClick = (e: any) => {
    if (e.target.id === 'modal') {
      setIsVotingModalOpened(false);
    }
  };
  const handleVote = () => {
    console.log(activeButton);
    setIsVotingModalOpened(false);
  };
  return (
    <div className='mb-4 flex flex-col items-center'>
      <button
        type='button'
        onClick={() => setIsVotingModalOpened(true)}
        className='w-full rounded-[20px] bg-true-white-100 p-6'
      >
        Vote
      </button>
      {isVotingModalOpened && (
        <div
          id='modal'
          onClick={handleOutsideClick}
          onKeyDown={handleVote}
          className='fixed left-0 top-0 flex size-full items-center justify-center bg-black bg-opacity-50'
          role='presentation'
        >
          <div className='border-custom-purple flex w-3/4 flex-col justify-center rounded-lg border bg-black px-10 py-8 text-center md:w-1/4'>
            <button
              type='button'
              onClick={() => handleOptionClick('FOR')}
              className={`font-good-times border-custom-purple mb-4 block cursor-pointer rounded-md border-b p-2 text-gray-500 ${activeButton === 'FOR' ? 'bg-custom-purple text-white' : ''}`}
            >
              FOR
            </button>

            <button
              type='button'
              onClick={() => handleOptionClick('AGAINST')}
              className={`font-good-times border-custom-purple mb-4 block cursor-pointer rounded-md border-b p-2 text-gray-500 ${activeButton === 'AGAINST' ? 'bg-custom-purple text-white' : ''}`}
            >
              AGAINST
            </button>

            <button
              type='button'
              onClick={() => handleOptionClick('ABSTAIN')}
              className={`font-good-times border-custom-purple mb-4 block cursor-pointer rounded-md border-b p-2 text-gray-500 ${activeButton === 'ABSTAIN' ? 'bg-custom-purple text-white' : ''}`}
            >
              ABSTAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
