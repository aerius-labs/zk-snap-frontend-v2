import Link from 'next/link';

import { BreadcrumbDemo } from '@/components/breadcrumb';
import Community from '@/components/community';
import { getDAOs } from '@/lib/actions';
import { DaoDetails } from '@/lib/interfaces';

const breadcrumbItems = [
  { label: 'Home', href: '/', isCurrentPage: false },
  { label: 'Communities', href: '/community', isCurrentPage: true },
];

export const dynamic = 'force-dynamic';

const Communities = async () => {
  const daos = await getDAOs();
  return (
    <div className='flex min-h-screen w-full flex-grow flex-col bg-dark px-8 py-8 md:px-24'>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <h1 className='mb-2 text-4xl font-bold text-inactive sm:mb-6 sm:text-3xl md:text-4xl'>
        //COMMUNITIES
      </h1>
      <div className='flex-grow rounded-2xl border-2 border-dividers bg-lightDark'>
        <div className='flex flex-row items-center justify-between p-8 md:h-[100px]'>
          <BreadcrumbDemo items={breadcrumbItems} />
        </div>
        <div className='grid flex-grow grid-cols-1 gap-6 p-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
          {daos.map((dao: DaoDetails) => (
            <Link key={dao.id} href={`/community/${dao.id}&${dao.name}`}>
              <Community daoDetails={dao} />
            </Link>
          ))}
        </div>
        {daos.length === 0 && (
          <p data-testid='no-daos' className='text-center text-gray-500'>
            No daos found
          </p>
        )}
      </div>
    </div>
  );
};

export default Communities;
