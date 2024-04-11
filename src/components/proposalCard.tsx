import Image from 'next/image';
import Link from 'next/link';

export default function ProposalCard({ proposal }: any) {
  const { id, proposalName, daoName, creatorAddress } = proposal;
  const slicedProposalName =
    proposalName.slice(0, 65) + (proposalName.length > 65 ? '...' : '');
  return (
    <Link href={`/proposal/${id}`}>
      <div className='flex h-[248px] w-[248px] cursor-pointer flex-col gap-2 rounded-[20px] border-2 border-true-gray-700 bg-true-black-700 p-6 font-bold hover:border-true-purple-100 hover:bg-true-purple-100'>
        <div className='flex items-center gap-1'>
          <Image
            src='https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__'
            objectFit='fill'
            width={21}
            height={21}
            alt='proposal card'
            className='rounded-full'
          />
          <p className='text-xs leading-[21px] text-true-gray-300'>
            {daoName} by{' '}
          </p>
          <p className='text-xs leading-[21px] text-true-white-100'>
            {creatorAddress}
          </p>
        </div>
        <p className='break-words text-2xl leading-[28px] text-true-white-100'>
          {slicedProposalName}
        </p>
        <div className='mt-auto text-xs leading-[14px]'>
          <span className='text-true-gray-300'>Voting</span>{' '}
          <span className='text-green-600'>Active</span>{' '}
          <span className='text-true-gray-300'>up to</span>{' '}
          <span className='text-true-white-100'>5</span>{' '}
          <span className='text-true-gray-300'>days</span>
        </div>
      </div>
    </Link>
  );
}
