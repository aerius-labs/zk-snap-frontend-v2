import Image from 'next/image';

import { ProposalDetails, ProposalStatus } from '@/lib/interfaces';
import { formatDate } from '@/utils/handler';

import { renderStatusInfo } from './proposalStatus';
import Vote from './vote';

const ProposalVoting = ({ proposal }: { proposal: ProposalDetails }) => {
  const {
    dao_name,
    creator_address,
    proposal_name,
    start_time,
    end_time,
    proposal_status,
  } = proposal;
  const slicedCreatorAddress = creator_address
    ? creator_address.length > 10
      ? creator_address.slice(0, 5) + '...' + creator_address.slice(-4)
      : creator_address
    : '';

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
          <p className='text-base font-bold text-subText'>{dao_name} by </p>
          <p className='text-base font-bold text-light'>
            {slicedCreatorAddress}
          </p>
        </div>
        <p className='break-words text-4xl font-bold uppercase text-light'>
          {proposal_name}
        </p>
        /
        <div className='mt-auto text-sm font-bold'>
          {renderStatusInfo({
            status: proposal_status,
            start_time,
            end_time,
          })}
        </div>
      </div>
      <hr className='hidden h-60 w-px border-l border-inactive md:block' />
      <hr className='w-full border-b border-inactive md:hidden' />
      <div className='flex w-full flex-col gap-5 px-12 py-6 md:w-5/12 md:px-24 md:py-12'>
        <Vote proposalName={proposal_name} />
        <div className='flex justify-between text-sm font-bold'>
          <div className='flex flex-col items-center gap-1'>
            <p className='text-subText'>Voting opens</p>
            <p className='text-gray-200'>{formatDate(start_time)}</p>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <p className='text-subText'>Voting closes</p>
            <p className='text-gray-200'>{formatDate(end_time)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalVoting;
