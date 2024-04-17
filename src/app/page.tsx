import Communities from '@/components/communitySection';
import FAQ from '@/components/faq';
import ProposalSection from '@/components/proposalSection';
import { CaretDown } from '@/lib/icons';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between gap-10 bg-dark'>
      <div className='flex h-screen w-screen flex-col items-center justify-end bg-hero bg-cover bg-center bg-no-repeat'>
        <div className='text-[80px] font-bold leading-none text-light md:text-[180px] lg:text-[260px]'>
          ZK SNAP
        </div>
        <div className='flex flex-col items-center gap-1'>
          <div className='text-lg font-normal text-light'>
            Where DAO voting is simple, anonymous, and userfriendly. Empower
            your voice while preserving privacy.
          </div>
          <div className='text-lg font-normal text-light'>
            Join the future of governance now!
          </div>
        </div>
        <div className='mt-4 animate-bounce'>
          <CaretDown color='#F3F3F3' size={40} />
        </div>
      </div>
      <div>
        <Communities />
      </div>
      <div>
        <ProposalSection />
      </div>
      <div>
        <FAQ />
      </div>
    </main>
  );
}
