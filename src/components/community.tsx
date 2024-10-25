import Image from 'next/image';

interface DaoDetails {
  id: number;
  daoName: string;
  members: string;
  activeProps: string;
  daoImage: string;
}

const Community = ({ daoDetails }: { daoDetails: DaoDetails }) => {
  const { daoName, members, activeProps, daoImage } = daoDetails;
  return (
    <div className='group flex flex-col items-center gap-4 rounded-full from-gray-0 to-gray-100 hover:from-purple-0 hover:to-purple-100 md:w-[346px] md:flex-row md:bg-gradient-to-l'>
      <div className='overflow-visible'>
        <Image
          src={daoImage}
          alt='test Image'
          width={148}
          height={148}
          className='rounded-full group-hover:shadow-lg'
        />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold text-light'>{daoName}</h1>
        <div>
          <span className='text-base font-bold text-subText'>Members </span>
          <span className='text-base font-bold text-light'>{members}</span>
        </div>
        <div>
          <span className='text-base font-bold text-subText'>
            Active Props{' '}
          </span>
          <span className='text-base font-bold text-light'>{activeProps}</span>
        </div>
      </div>
    </div>
  );
};

export default Community;
