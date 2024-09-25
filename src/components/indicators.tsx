import React from 'react';

interface IndicatorsProps {
  totalSteps: number;
  currentStep: number;
  onStepChange: (step: number) => void;
}

const Indicators: React.FC<IndicatorsProps> = ({
  totalSteps,
  currentStep,
  onStepChange,
}) => {
  const titles = ['Title', 'Description', 'Timing'];

  return (
    <div className='flex sm:mb-6 sm:flex-row sm:justify-center sm:space-x-4 md:mb-0 md:flex-col md:justify-start md:space-x-0 md:space-y-4'>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className='flex items-center gap-2 sm:flex-col sm:justify-center md:flex-row md:justify-end md:gap-3'
        >
          <p
            className={`font-bold ${
              currentStep === i + 1 ? 'text-white' : 'text-gray-500'
            } sm:text-sm md:text-base`}
          >
            {titles[i]}
          </p>
          <button
            type='button'
            aria-label={`Go to step ${i + 1} - ${titles[i]}`}
            className={`sm:h-1 sm:w-16 md:h-32 md:w-1 ${
              currentStep === i + 1 ? 'bg-purple-300' : 'bg-gray-600'
            }`}
            onClick={() => onStepChange(i + 1)}
          />
        </div>
      ))}
    </div>
  );
};

export default Indicators;
