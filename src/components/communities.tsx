import Community from './community';
import Image from 'next/image';
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
    <div className='h-full w-full bg-dark px-6 py-4'>
      <div className='ml-36'>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <h1 className='pb-4 text-4xl font-bold text-inactive'>
          //COMMUNITITES
        </h1>
        <div className=' rounded-2xl border-2 border-dividers bg-lightDark p-4'>
          <div className='flex flex-row justify-between pr-4'>
            <p className='text-inactive'>Home/ Communities</p>
            <Image src='/search.svg' alt='search icon' width={23} height={23} />
          </div>
          <div className='3xl:grid-cols-4 grid gap-14 px-12 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {data.map((dao) => (
              <Community key={dao.id} daoDetails={dao} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communities;
