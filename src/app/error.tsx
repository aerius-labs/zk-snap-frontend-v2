'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center'>
      <h2 className='mb-4 text-xl font-bold'>Error Loading Proposal</h2>
      <p className='mb-4 text-red-500'>{error.message}</p>
      <button
        onClick={() => reset()}
        className='rounded bg-blue-500 px-4 py-2 text-white'
      >
        Try Again
      </button>
    </div>
  );
}
