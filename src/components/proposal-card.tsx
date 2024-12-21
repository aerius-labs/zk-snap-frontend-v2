import Link from 'next/link';

import { Proposal } from '@/lib/interfaces';

import ImageWithFallback from './image-with-fallback';
import { renderStatusInfo } from './proposal-status';

export default function ProposalCard({ proposal }: { proposal: Proposal }) {
  const {
    proposal_id,
    title,
    dao_name,
    creator,
    status,
    start_time,
    end_time,
    dao_logo,
  } = proposal;
  const slicedProposalName = title
    ? title.slice(0, 65) + (title.length > 65 ? '...' : '')
    : 'Unknown';
  const slicedCreatorAddress = creator
    ? creator.length > 10
      ? creator.slice(0, 5) + '...' + creator.slice(-4)
      : creator
    : '';

  return (
    <Link href={`/proposal/${proposal_id}`}>
      <div className='flex size-[248px] cursor-pointer flex-col gap-2 rounded-[20px] border-2 border-inactive bg-black-700 p-6 font-bold hover:border-purple-200 hover:bg-purple-200'>
        <div className='mb-2 flex gap-1'>
          <ImageWithFallback
            src={dao_logo}
            width={21}
            height={21}
            alt='proposal card'
            className='rounded-full'
          />
          <p className='text-xs leading-[21px] text-subText'>{dao_name} by </p>
          <p className='text-xs leading-[21px] text-light'>
            {slicedCreatorAddress}
          </p>
        </div>
        <p className='break-words text-2xl leading-[28px] text-light'>
          {slicedProposalName}
        </p>
        <div className='mt-auto text-xs leading-[14px]'>
          {renderStatusInfo({ status, start_time, end_time })}
        </div>
      </div>
    </Link>
  );
}
