import { ProposalDetails } from '@/lib/interfaces';
import { formatDate } from '@/utils/handler';

import ImageWithFallback from './image-with-fallback';
import { renderStatusInfo } from './proposal-status';
import Vote from './vote';

const ProposalVoting = ({ proposal }: { proposal: ProposalDetails }) => {
  const {
    dao_name,
    dao_logo,
    creator,
    title,
    start_time,
    end_time,
    status,
    encrypted_keys,
  } = proposal;
  const slicedCreatorAddress = creator
    ? creator.length > 10
      ? creator.slice(0, 5) + '...' + creator.slice(-4)
      : creator
    : '';

  return (
    <div className='top-0 flex max-h-full w-full flex-col items-center justify-between bg-lightDark md:flex-row'>
      <div className='flex w-full flex-col gap-5 px-12 py-6 md:w-7/12 md:py-12 md:pl-32 md:pr-24'>
        <div className='flex gap-2'>
          <ImageWithFallback
            src={dao_logo}
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
          {title}
        </p>
        <div className='mt-auto text-sm font-bold'>
          {renderStatusInfo({
            status: status,
            start_time,
            end_time,
          })}
        </div>
      </div>
      <hr className='hidden h-60 w-px border-l border-inactive md:block' />
      <hr className='w-full border-b border-inactive md:hidden' />
      <div className='flex w-full flex-col gap-5 px-12 py-6 md:w-5/12 md:px-24 md:py-12'>
        <Vote
          proposalName={title}
          encrypted_keys={encrypted_keys}
          proposal_id={proposal.id}
          start_time={proposal.start_time}
          end_time={proposal.end_time}
        />
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
