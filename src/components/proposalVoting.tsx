import Image from 'next/image';

import Vote from './vote';

const proposal = {
  id: '1',
  daoName: 'Flare DAO',
  creatorAddress: ' Ox72Eb...C9E3',
  proposalName:
    "Security First: Flare Dao's Proposal for Strengthening Network Safeguards",
  status: 'Active',
  days: '5',
};
const ProposalVoting = () => {
  const { daoName, creatorAddress, proposalName } = proposal;
  return (
    <div className='top-0 flex max-h-full w-full flex-col items-center justify-between bg-lightDark md:flex-row'>
      <div className='flex w-full flex-col gap-5 px-12 py-6 md:w-7/12 md:py-12 md:pl-32 md:pr-24'>
        <div className='flex items-center gap-1'>
          <Image
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIl4W-r3XaUF5-NDwxOQ4CSMG_QClm1NAHwQ&s'
            width={21}
            height={21}
            alt='proposal card'
            className='rounded-full'
          />
          <p className='text-base font-bold text-subText'>{daoName} by </p>
          <p className='text-base font-bold text-light'>{creatorAddress}</p>
        </div>
        <p className='break-words text-4xl font-bold uppercase text-light'>
          {proposalName}
        </p>
        <div className='mt-auto text-sm font-bold'>
          <span className='text-subText'>Voting</span>{' '}
          <span className='text-green-600'>Active</span>{' '}
          <span className='text-subText'>up to</span>{' '}
          <span className='text-light'>5</span>{' '}
          <span className='text-subText'>days</span>
        </div>
      </div>
      <hr className='hidden h-60 w-px border-l border-inactive md:block' />
      <hr className='w-full border-b border-inactive md:hidden' />
      <div className='flex w-full flex-col gap-5 px-12 py-6 md:w-5/12 md:px-24 md:py-12'>
        <Vote proposalName={proposalName} />
        <div className='flex justify-between text-sm font-bold'>
          <div className='flex flex-col items-center gap-1'>
            <p className='text-subText'>Voting opens</p>
            <p className='text-gray-200'>Jan 09, 2024, 1:05 PM</p>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <p className='text-subText'>Voting closes</p>
            <p className='text-gray-200'>Jan 22, 2024, 1:05 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalVoting;
