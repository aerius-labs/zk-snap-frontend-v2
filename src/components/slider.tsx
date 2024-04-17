export function ShowInfo({
  property,
  value,
}: {
  property: string;
  value: string;
}) {
  return (
    <div className='mt-2 flex justify-between text-[13px] tracking-wider'>
      <p className='text-subText'>{property}</p>
      <p className='text-gray-200'>{value}</p>
    </div>
  );
}

export default function Slider() {
  return (
    <div className='flex flex-col items-center space-y-4'>
      {/* BASIC INFO */}
      <div className='w-full rounded-[20px] border border-dividers p-6'>
        <p className='pb-7 text-xl font-bold leading-6 tracking-wider text-light'>
          Basic Info
        </p>
        <ShowInfo property='IPFS' value='#hetkyiv' />
        <ShowInfo property='Voting system' value='Single choice voting' />
      </div>

      {/* RESULTS */}
      <div className='w-full rounded-[20px] border border-dividers p-6'>
        <p className='pb-7 text-xl font-bold leading-6 tracking-wider text-light'>
          Results
        </p>
        <ShowInfo property='To be declared on:' value='Sep 25, 2023, 1:05 AM' />
      </div>

      {/* INSTRUCTIONS */}
      <div className='w-full rounded-[20px] border border-dividers p-6'>
        <p className='pb-7 text-xl font-bold leading-6 tracking-wider text-light'>
          Submissions
        </p>
        <ul className='flex list-disc flex-col gap-2 px-4 text-sm text-subText'>
          <li>Qualified wallets can enter a max of 1 submission</li>
          <li>Contest accept up to 4997 submissions</li>
          <li>Connect wallet to see if you qualify</li>
        </ul>
      </div>
    </div>
  );
}
