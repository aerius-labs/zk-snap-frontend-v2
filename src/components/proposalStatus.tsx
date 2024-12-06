import { ProposalStatus } from '@/lib/interfaces';
import { Status } from '@/lib/interfaces';

export const calculateTimeRemaining = (end_time: string): string => {
  const now = new Date().getTime();
  const endDate = new Date(end_time).getTime();
  const difference = endDate - now;

  if (difference <= 0) return '0d 0h 0m';

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
};

export const calculateTimeToStart = (start_time: string): string => {
  const now = new Date().getTime();
  const startDate = new Date(start_time).getTime();
  const difference = startDate - now;

  if (difference <= 0) return '0d 0h 0m';

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
};

export const renderStatusInfo = ({ status, start_time, end_time }: Status) => {
  const now = new Date().getTime();
  const startDate = new Date(start_time).getTime();
  const endDate = new Date(end_time).getTime();

  // Active Proposal Logic
  if (status === ProposalStatus.Active) {
    // Explicitly verify if it's currently active
    if (now >= startDate && now <= endDate) {
      const timeRemaining = calculateTimeRemaining(end_time);
      return (
        <div className='mt-auto text-xs leading-[14px]'>
          <span className='text-subText'>Voting</span>{' '}
          <span className='text-green-600'>Active</span>{' '}
          <span className='text-subText'>for</span>{' '}
          <span className='text-light'>{timeRemaining}</span>
        </div>
      );
    }
  }

  // Inactive Proposal Logic
  if (status === ProposalStatus.Inactive) {
    // Proposal hasn't started yet
    if (now < startDate) {
      const timeToStart = calculateTimeToStart(start_time);
      return (
        <div className='mt-auto text-xs leading-[14px]'>
          <span className='text-subText'>Upcoming</span>{' '}
          <span className='text-yellow-600'>Starts in</span>{' '}
          <span className='text-light'>{timeToStart}</span>
        </div>
      );
    }

    // Proposal has ended
    if (now > endDate) {
      return (
        <div className='mt-auto text-xs leading-[14px]'>
          <span className='text-red-600'>Completed</span>
        </div>
      );
    }
  }

  // Fallback for any unexpected scenarios
  return (
    <div className='mt-auto text-xs leading-[14px]'>
      <span className='text-subText'>Unknown Status</span>
    </div>
  );
};
