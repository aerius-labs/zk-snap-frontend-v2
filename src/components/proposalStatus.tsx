import { ProposalStatus } from '@/lib/interfaces';
import { calculateTimeRemaining, calculateTimeToStart } from '@/utils/handler';
import { Status } from '@/lib/interfaces';

export const renderStatusInfo = ({ status, start_time, end_time }: Status) => {
  if (status === ProposalStatus.Active) {
    const timeRemaining = calculateTimeRemaining(end_time);
    return (
      <div className='mt-auto text-xs leading-[14px]'>
        <span className='text-subText'>Voting</span>{' '}
        <span className='text-green-600'>Active</span>{' '}
        <span className='text-subText'>for</span>{' '}
        <span className='text-light'>{timeRemaining}</span>
      </div>
    );
  } else if (status === ProposalStatus.Inactive) {
    const now = new Date();
    const startDate = new Date(start_time);
    if (now < startDate) {
      const timeToStart = calculateTimeToStart(start_time);
      return (
        <div className='mt-auto text-xs leading-[14px]'>
          <span className='text-subText'>Inactive</span>{' '}
          <span className='text-yellow-600'>Starts in</span>{' '}
          <span className='text-light'>{timeToStart}</span>
        </div>
      );
    } else {
      return (
        <div className='mt-auto text-xs leading-[14px]'>
          <span className='text-red-600'>Inactive</span>
        </div>
      );
    }
  }
  return null;
};
