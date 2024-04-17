'use client';
import Indicators from '@/components/indicators';
import { useState } from 'react';
import Step1 from './step1';

export default function CreateProposal() {
  const [currentStep, setCurrentStep] = useState(1);
  const handleStepChange = (step: any) => {
    setCurrentStep(step);
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 setCurrentStep={setCurrentStep} />;
      case 2:
        return <div>Step 2 Content</div>;
      case 3:
        return <div>Step 3 Content</div>;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className='flex min-h-screen flex-col bg-dark px-[40px] py-[60px] md:px-[64px] lg:px-[124px] 2xl:px-[184px]'>
      <p className='mb-2 text-4xl font-bold uppercase tracking-wider text-inactive'>
        //Create Proposal
      </p>
      <div className='flex w-full flex-col rounded-[20px] border-2 border-dividers bg-lightDark'>
        <div className='mx-6 flex h-[100px] items-center text-light'>
          {'< Home / Communities / Flare Dao / Create Proposal'}
        </div>
        <div className='my-6 mb-8 flex h-full'>
          <div className='mx-8'>
            <Indicators
              totalSteps={3}
              currentStep={currentStep}
              onStepChange={handleStepChange}
            />
          </div>
          <div className='w-3/4'>{renderStepContent()}</div>
        </div>
      </div>
    </div>
  );
}
