'use client';

import { X } from 'lucide-react';
import { poseidon1 } from 'poseidon-lite';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useNullifierStore } from '@/lib/store';
import { encVote, generateSecureRandomBigInt } from '@/utils/handler';

import ConnectWorldCoinID from './idkitWidget';

interface VotingProps {
  proposalName: string;
  encrypted_keys: any;
  proposal_id: string;
  start_time: string;
  end_time: string;
}

interface VoteResults {
  for: number;
  against: number;
  abstain: number;
}

export default function Vote({
  proposalName,
  encrypted_keys,
  proposal_id,
  start_time,
  end_time,
}: VotingProps) {
  const workerRef = useRef<Worker>();
  const [isVotingModalOpened, setIsVotingModalOpened] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [results, setResults] = useState<VoteResults | null>(null);
  const [isVoteSubmitting, setIsVoteSubmitting] = useState<boolean>(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [votingStatus, setVotingStatus] = useState<
    'pending' | 'active' | 'ended'
  >('pending');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const startTime = new Date(start_time).getTime();
      const endTime = new Date(end_time).getTime();
      if (now < startTime) {
        const difference = startTime - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining(
          `Voting starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`
        );
        setVotingStatus('pending');
      } else if (now >= startTime && now <= endTime) {
        const difference = endTime - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining(
          `Voting ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`
        );
        setVotingStatus('active');
      } else {
        setTimeRemaining('Voting has ended');
        setVotingStatus('ended');
      }
    };
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, [start_time, end_time]);

  const handleOptionClick = (value: string) => {
    setActiveButton(value);
  };

  const handleOutsideClick = (e: any) => {
    if (e.target.id === 'modal') {
      setIsVotingModalOpened(false);
    }
  };

  const handleRevealResults = async () => {
    setIsLoadingResults(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_DEV_BACKEND_URL;
      const response = await fetch(
        `${backendUrl}/proposal/result/${proposal_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setResults({
        for: data[0],
        against: data[1],
        abstain: data[2],
      });
    } catch (error) {
      toast.error('Error fetching results', {
        description: error as string,
      });
    } finally {
      setIsLoadingResults(false);
    }
  };

  const handleCloseModal = () => {
    setLoading(false);
    setIsVoteSubmitting(false);
  };

  const handleVote = async () => {
    setLoading(true);
    setIsVotingModalOpened(false);
    setIsVoteSubmitting(true);
    const [vkResponse, pkResponse] = await Promise.all([
      fetch('/api/fetchKeys?file=vk_15.bin'),
      fetch('/api/fetchKeys?file=pk_15.bin'),
    ]);
    console.log(vkResponse);
    const [vk_15, pk_15] = await Promise.all([
      new Uint8Array(await vkResponse.arrayBuffer()),
      new Uint8Array(await pkResponse.arrayBuffer()),
    ]);
    console.log(vk_15, pk_15);
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
    if (workerRef.current) {
      workerRef.current.postMessage({
        proofInputs: proofInputs,
        keys: { pk_15, vk_15 },
      });
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
      const instancesArray = Object.values(event.data.instances);
      const proofArray = Object.values(event.data.proof);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_DEV_BACKEND_URL;
        const response = await fetch(
          `${backendUrl}/proposal/vote/${proposal_id}`,
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
        toast.error('Vote submitted to backend');
      } catch (error) {
        toast.error('Error sending worker data', {
          description: error as string,
        });
      } finally {
        setIsVoteSubmitting(false);
      }
    };
    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error);
      setLoading(false);
      setIsVoteSubmitting(false);
    };
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        setLoading(false);
        setIsVoteSubmitting(false);
      }
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (loading) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [loading]);

  return (
    <div className='mb-4 flex flex-col items-center'>
      {loading && (
        <div className='fixed inset-0 z-50 overflow-hidden'>
          <div className='bg-black/60 absolute inset-0 backdrop-blur-md' />

          <div className='relative flex h-full w-full items-center justify-center'>
            <div className='relative rounded-lg bg-white p-8 text-center shadow-xl'>
              {/* Close button only shows after vote is submitted */}
              {!isVoteSubmitting && (
                <div className='absolute -right-3 -top-3 opacity-100 transition-all duration-300 ease-in-out'>
                  <button
                    onClick={handleCloseModal}
                    className='rounded-full bg-purple-600 p-2 text-white transition-colors hover:bg-purple-700'
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              <div className='mb-8 flex justify-center'>
                {isVoteSubmitting ? (
                  <svg
                    className='h-16 w-16 animate-spin text-purple-600'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                ) : (
                  <div className='flex h-16 w-16 items-center justify-center text-green-500'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-16 w-16'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className='space-y-4 text-center'>
                {isVoteSubmitting ? (
                  <>
                    <h3 className='text-3xl font-extrabold text-gray-900'>
                      Submitting Your Vote
                    </h3>
                    <div className='space-y-2'>
                      <p className='text-lg font-bold text-gray-900'>
                        Please wait while we process your vote securely
                      </p>
                      <p className='text-lg font-bold text-red-600'>
                        ⚠️ Do not close or leave this page
                      </p>
                      <p className='mt-2 text-sm text-gray-600'>
                        Leaving this page will cancel your vote submission
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className='text-3xl font-extrabold text-gray-900'>
                      Vote Submitted Successfully!
                    </h3>
                    <div className='space-y-2'>
                      <p className='text-lg font-bold text-gray-900'>
                        Your vote has been recorded
                      </p>
                      <p className='mt-2 text-sm text-gray-600'>
                        You can now close this window
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {votingStatus === 'pending' && (
        <div className='w-full rounded-[20px] bg-light px-6 py-4 text-center text-4xl font-bold'>
          {timeRemaining}
        </div>
      )}

      {votingStatus === 'active' && (
        <>
          <button
            type='button'
            onClick={() => setIsVotingModalOpened(true)}
            className='flex w-full items-center justify-center gap-1 rounded-[20px] bg-light px-6 py-4 text-4xl font-bold hover:bg-purple-300'
            disabled={loading}
          >
            Vot{loading ? 'ing' : 'e'}{' '}
            {loading && (
              <div role='status'>
                <svg
                  aria-hidden='true'
                  className='h-8 w-8 animate-spin fill-gray-800 text-gray-200 dark:text-gray-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            )}
          </button>
          <div className='mt-2 text-sm text-gray-500'>{timeRemaining}</div>
        </>
      )}

      {votingStatus === 'ended' && !results && (
        <button
          type='button'
          onClick={handleRevealResults}
          className='w-full rounded-[20px] bg-light px-6 py-4 text-4xl font-bold hover:bg-purple-300'
          disabled={isLoadingResults}
        >
          {isLoadingResults ? 'Loading Results...' : 'Reveal Results'}
        </button>
      )}
      {votingStatus === 'ended' && results && (
        <div className='flex w-full justify-center gap-6 rounded-[20px] bg-light p-6'>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bold'>FOR</span>
            <span className='text-xl'>{results.for}</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bold'>AGAINST</span>
            <span className='text-xl'>{results.against}</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bold'>ABSTAIN</span>
            <span className='text-xl'>{results.abstain}</span>
          </div>
        </div>
      )}

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
