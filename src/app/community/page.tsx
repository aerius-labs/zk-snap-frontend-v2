import Link from 'next/link';

import Community from '@/components/community';
import { CaretLeft, MagnifyingGlass } from '@/lib/icons';

interface DaoDetails {
  id: number;
  daoName: string;
  members: string;
  activeProps: string;
  daoImage: string;
}

const data = [
  {
    id: 1,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__',
  },
  {
    id: 2,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__',
  },
  {
    id: 3,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__',
  },
  {
    id: 4,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__',
  },
  {
    id: 5,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__',
  },
  {
    id: 6,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__',
  },
  {
    id: 7,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__',
  },
  {
    id: 8,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__',
  },
  {
    id: 9,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__',
  },
  {
    id: 10,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__',
  },
  {
    id: 11,
    daoName: 'Flare Dao',
    members: '803k',
    activeProps: '#2',
    daoImage:
      'https://s3-alpha-sig.figma.com/img/65a7/293b/904d2512e46a292be511bb312b01702b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A8To-owaEO7wVseKJzLXM-7sVTwXK5WYBrVBeE~bsB-TTXyHVJzyws2m2HhGIvn35MPqXyDPt1JsYX6-0rfdyCrGhIcJNNxkoYHEofhF2pKtI4foDmB6Cxbc4DW1pBA7Bpm4OHFtxKicAa18yJib~iRIb2s00DJSnEVVcNvoDjwOQ8R5sDjJrC0tOSHsk84GJveVf7PpGvnMtJaqpJ~IgtYDfvPiqEN2WzH~0EgTIbOs1Dx~lL5FolZSY7PekGw8o43DatU0qzBtUig7pCZW8pekW2ybInSm1ZeFUgDFZ-KJv-J2JQDgdeOxp-VXvKJXrcmO6WyJzgYgbLAi-QSX4A__',
  },
];
const Communities = () => {
  return (
    <div className='m-0 h-auto w-full gap-5 bg-dark px-36 py-16'>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <h1 className='pb-4 text-4xl font-bold text-inactive'>//COMMUNITIES</h1>
      <div className=' rounded-2xl border-2 border-dividers bg-lightDark'>
        <div className='flex h-[100px] flex-row items-center justify-between pr-4'>
          <div className='flex flex-row items-center justify-start gap-3 p-2.5 text-center text-base font-bold text-inactive'>
            <Link className='w-4' href='/'>
              {' '}
              <CaretLeft size={20} />
            </Link>
            <Link className='hover:text-light' href='/'>
              Home
            </Link>
            <span>/</span>
            <Link className='text-light' href='/community'>
              Communities
            </Link>
          </div>
          <MagnifyingGlass color='#F3F3F3' size={24} />
        </div>
        <div className='grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {data.map((dao: DaoDetails) => (
            <Link key={dao.id} href='/proposal'>
              <Community daoDetails={dao} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communities;
