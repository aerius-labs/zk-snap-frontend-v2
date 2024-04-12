'use client';
import Image from 'next/image';

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
    <div className='flex max-h-full w-full flex-col items-center justify-between bg-true-black-800 md:flex-row'>
      <div className='flex w-full flex-col gap-5 px-12 py-6 md:w-7/12 md:px-24 md:py-12'>
        <div className='flex items-center gap-1'>
          <Image
            src='https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__'
            width={21}
            height={21}
            alt='proposal card'
            className='rounded-full'
          />
          <p className='text-base font-bold text-true-gray-300'>
            {daoName} by{' '}
          </p>
          <p className='text-base font-bold text-true-white-100'>
            {creatorAddress}
          </p>
        </div>
        <p className='break-words text-4xl font-bold uppercase text-true-white-100'>
          {proposalName}
        </p>
        <div className='mt-auto text-sm font-bold'>
          <span className='text-true-gray-300'>Voting</span>{' '}
          <span className='text-green-600'>Active</span>{' '}
          <span className='text-true-gray-300'>up to</span>{' '}
          <span className='text-true-white-100'>5</span>{' '}
          <span className='text-true-gray-300'>days</span>
        </div>
      </div>
      <hr className='hidden h-60 w-px border-l border-true-gray-700 md:block' />
      <hr className='w-full border-b border-true-gray-700 md:hidden' />
      <div className='flex w-full flex-col gap-5 px-12 py-6 md:w-4/12 md:px-24 md:py-12'>
        <button
          type='button'
          onClick={() => console.log('Voting clicked')}
          className='rounded-[20px] bg-true-white-100 p-6'
        >
          Vote
        </button>
        <div className='flex justify-between text-sm font-bold'>
          <div className='flex flex-col items-center gap-1'>
            <p className='text-true-gray-300'>Voting opens</p>
            <p className='text-true-gray-200'>Jan 09, 2024, 1:05 PM</p>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <p className='text-true-gray-300'>Voting closes</p>
            <p className='text-true-gray-200'>Jan 22, 2024, 1:05 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalVoting;
