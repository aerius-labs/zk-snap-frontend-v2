import Image from 'next/image';

export default function ProposalCard({ proposal }: any) {
  return (
    <div className='flex size-[280px] flex-col gap-2 rounded-[20px] border-2 border-true-gray-700 bg-true-black-700 p-6'>
      <div className='flex items-center gap-2'>
        <Image
          src='https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__'
          objectFit='fill'
          width={21}
          height={21}
          alt='proposal card'
          className='rounded-full'
        />
        <p className='text-xs text-true-gray-300'>{proposal.daoName} by </p>
        <p className='text-xs text-true-white-100'>{proposal.creatorAddress}</p>
      </div>
      <p className='break-words text-2xl text-true-white-100'>
        {proposal.proposalName}
      </p>
      <div className='mt-auto text-xs'>
        <span className='text-true-gray-300'>Voting</span>{' '}
        <span className='text-green-600'>Active</span>{' '}
        <span className='text-true-gray-300'>up to</span>{' '}
        <span className='text-true-white-100'>5</span>{' '}
        <span className='text-true-gray-300'>days</span>
      </div>
    </div>
  );
}
