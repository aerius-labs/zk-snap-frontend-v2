export default function Step2({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<number>;
}) {
  return (
    <div className='flex flex-col gap-14'>
      <p className='break-words text-justify text-2xl font-bold text-dividers'>
        Descriptions let’s people fully & easily understand what your proposal
        is & how to take part in it.
      </p>
      <p className='text-justify text-2xl font-bold text-gray-200'>
        What you proposal is about?
      </p>
      <input
        type='text'
        placeholder='Describe your proposal as best as you can'
        className='w-2/3 border-b-2 border-purple-300 bg-transparent p-1 text-lg text-light outline-none'
      />
      <button
        type='button'
        className='w-[100px] rounded-[20px] border-2 border-light bg-light px-6 py-4 font-bold leading-4 hover:bg-gray-200'
        onClick={() => setCurrentStep(3)}
      >
        Next
      </button>
    </div>
  );
}
