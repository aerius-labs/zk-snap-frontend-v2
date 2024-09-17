import Image from 'next/image';
import Link from 'next/link';

interface Proposal {
  id: string;
  daoName: string;
  creatorAddress: string;
  proposalName: string;
  status: string;
  days: string;
}

export default function ProposalCard({ proposal }: { proposal: Proposal }) {
  const { id, proposalName, daoName, creatorAddress } = proposal;
  const slicedProposalName =
    proposalName.slice(0, 65) + (proposalName.length > 65 ? '...' : '');
  return (
    <Link href={`/proposal/${id}`}>
      <div className='flex size-[248px] cursor-pointer flex-col gap-2 rounded-[20px] border-2 border-inactive bg-black-700 p-6 font-bold hover:border-purple-200 hover:bg-purple-200'>
        <div className='flex items-center gap-1'>
          <Image
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIl4W-r3XaUF5-NDwxOQ4CSMG_QClm1NAHwQ&s'
            width={21}
            height={21}
            alt='proposal card'
            className='rounded-full'
          />
          <p className='text-xs leading-[21px] text-subText'>{daoName} by </p>
          <p className='text-xs leading-[21px] text-light'>{creatorAddress}</p>
        </div>
        <p className='break-words text-2xl leading-[28px] text-light'>
          {slicedProposalName}
        </p>
        <div className='mt-auto text-xs leading-[14px]'>
          <span className='text-subText'>Voting</span>{' '}
          <span className='text-green-600'>Active</span>{' '}
          <span className='text-subText'>up to</span>{' '}
          <span className='text-light'>5</span>{' '}
          <span className='text-subText'>days</span>
        </div>
      </div>
    </Link>
  );
}
