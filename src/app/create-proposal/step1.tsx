export default function Step1({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<number>;
}) {
  return (
    <div className='flex flex-col gap-16'>
      <p className='break-words text-justify text-2xl font-bold text-dividers'>
        Titles let’s people easily find & understand your proposals in a concise
        way.
      </p>
      <p className='text-justify text-2xl font-bold text-gray-200'>
        What you’ll like your proposal to be known as?
      </p>
      <div className='flex flex-col gap-1'>
        <input
          type='text'
          placeholder='eg. bundlr bounty contest for devs'
          className='w-2/3 border-b-2 border-purple-300 bg-transparent p-1 text-lg text-light outline-none'
        />
        <p className='text-sm text-light'>
          Tip: Include your community’s name for higher engagement
        </p>
      </div>
      <button
        type='button'
        className='w-[100px] rounded-[20px] border-2 border-light bg-light px-6 py-4 font-bold leading-4 hover:bg-gray-200'
        onClick={() => setCurrentStep(2)}
      >
        Next
      </button>
    </div>
  );
}
