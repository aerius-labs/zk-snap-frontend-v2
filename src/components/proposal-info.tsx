import { ProposalDetails } from '@/lib/interfaces';

import Slider from './slider';

const ProposalInfo = ({ proposal }: { proposal: ProposalDetails }) => {
  const { proposal_description } = proposal;
  return (
    <div className='grow bg-dark px-12 py-6 md:py-12 md:pl-32 md:pr-24'>
      <div className='flex flex-col gap-12 md:flex-row md:justify-center md:gap-36'>
        <div className='flex w-full flex-col gap-4 md:w-7/12'>
          <p className='text-justify text-xl font-bold leading-6 text-light'>
            Description
          </p>
          <div
            className='ql-editor prose prose-sm max-w-none break-words rounded text-justify text-base font-medium leading-6 text-inactive'
            dangerouslySetInnerHTML={{
              __html: proposal_description || '',
            }}
          />
        </div>
        <div className='w-full text-light md:w-4/12'>
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default ProposalInfo;
