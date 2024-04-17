export default function Indicators({
  totalSteps,
  currentStep,
  onStepChange,
}: any) {
  const title = ['Title', 'Description', 'Timing'];
  return (
    <div className='flex flex-col space-y-4'>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div className='flex items-center justify-end gap-3'>
          <p
            className={`font-bold ${currentStep === i + 1 ? 'text-light' : 'text-dividers'}`}
          >
            {title[i]}
          </p>
          <button
            key={i + 1}
            className={`h-32 w-1 ${currentStep === i + 1 ? 'bg-purple-300' : 'bg-dividers'}`}
            onClick={() => onStepChange(i + 1)}
          ></button>
        </div>
      ))}
    </div>
  );
}
