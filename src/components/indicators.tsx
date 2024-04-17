interface IndicatorsProps {
  totalSteps: number;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function Indicators({
  totalSteps,
  currentStep,
  onStepChange,
}: IndicatorsProps) {
  const title = ['Title', 'Description', 'Timing'];
  return (
    <div className='flex flex-col space-y-4'>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className='flex items-center justify-end gap-3'>
          <p
            className={`font-bold ${currentStep === i + 1 ? 'text-light' : 'text-dividers'}`}
          >
            {title[i]}
          </p>
          <button
            type='button'
            key={i + 1}
            aria-label={`Go to step ${i + 1} - ${title[i]}`}
            className={`h-32 w-[5px] ${currentStep === i + 1 ? 'bg-purple-300' : 'bg-dividers'}`}
            onClick={() => onStepChange(i + 1)}
          />
        </div>
      ))}
    </div>
  );
}
