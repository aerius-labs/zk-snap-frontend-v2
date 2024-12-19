'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import Indicators from '../../components/indicators';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import { BreadcrumbDemo } from '@/components/breadcrumb';
import { DatePicker } from '@/components/date-picker';
import ConnectWorldCoinID from '@/components/idkit-widget';
import { TimePicker } from '@/components/time-picker/time-picker';
import { revalidateProperty } from '@/lib/actions';
import { formats, modules } from '@/utils/data';

const schema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  description: z.string().min(1, 'Description is required'),
  startDate: z.date({ required_error: 'Start date is required' }),
  startTime: z.date({ required_error: 'Start Time is required' }),
  endDate: z.date({ required_error: 'End date is required' }),
  endTime: z.date({ required_error: 'End Time is required' }),
});

type FormData = z.infer<typeof schema>;

const ProposalForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      startDate: undefined,
      startTime: undefined,
      endDate: undefined,
      endTime: undefined,
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const daoId = searchParams.get('daoId');
  const daoName = searchParams.get('daoName') ?? '';

  const [currentStep, setCurrentStep] = useState(1);
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchFields = watch();

  const handleStepChange = (step: number) => {
    if (step <= currentStep + 1 && step > 0 && step <= 3) {
      setCurrentStep(step);
    }
  };
  const onSubmit = async (token: string) => {
    setIsSubmitting(true);
    try {
      const now = new Date();
      const startDateTime = new Date(
        watchFields.startDate.setHours(
          watchFields.startTime.getHours(),
          watchFields.startTime.getMinutes()
        )
      );
      const endDateTime = new Date(
        watchFields.endDate.setHours(
          watchFields.endTime.getHours(),
          watchFields.endTime.getMinutes()
        )
      );

      if (startDateTime < now) {
        toast.error('Start Date and Time cannot be in the past', {
          description: 'Please select a future start date and time.',
        });
        setIsSubmitting(false);
        return;
      }

      if (endDateTime <= startDateTime) {
        toast.error('End Date and Time must be after Start Date and Time', {
          description:
            'Please adjust your end date and time to be later than the start.',
        });
        setIsSubmitting(false);
        return;
      }

      const proposalData = {
        title: watchFields.title,
        description: watchFields.description,
        dao_id: daoId,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        voting_options: ['yes', 'no'],
      };
      try {
        const response = await fetch('/api/create-proposal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            proposalData: { ...proposalData },
            token: token,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        toast.success('Proposal submitted successfully');
        await revalidateProperty('daoProposals');
        router.replace(`community/${daoId}`);
      } catch (error) {
        toast.error('Error submitting proposal', {
          description: error as string,
        });
      } finally {
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error('Error preparing proposal data', {
        description: error as string,
      });
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return !!watchFields.title && !errors.title;
      case 2:
        return !!watchFields.description && !errors.description;
      case 3:
        return (
          !!watchFields.startDate &&
          !!watchFields.startTime &&
          !!watchFields.endDate &&
          !!watchFields.endTime &&
          !errors.startDate &&
          !errors.startTime &&
          !errors.endDate &&
          !errors.endTime
        );
      default:
        return false;
    }
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/', isCurrentPage: false },
    { label: 'Communities', href: '/community', isCurrentPage: false },
    {
      label: daoName,
      href: `/community/${daoId}&${daoName}`,
      isCurrentPage: false,
    },
    { label: 'Create Proposal', href: '/create-proposal', isCurrentPage: true },
  ];

  if (!daoId) {
    return <div>Incorrect Dao Id</div>;
  }

  return (
    <div className='flex min-h-screen w-full flex-col bg-dark px-6 py-16 md:px-[64px] md:pl-12 lg:px-[124px] 2xl:px-[184px]'>
      <h1 className='mb-2 text-4xl font-bold uppercase tracking-wider text-inactive'>
        Create Proposal
      </h1>
      <div className='flex w-full flex-col rounded-lg border-2 border-dividers bg-lightDark p-4'>
        <div className='flex h-[50px] text-light'>
          <BreadcrumbDemo items={breadcrumbItems} />
        </div>
        <div className='mb-12 mt-6 flex flex-col sm:flex-col md:flex-row'>
          <div className='mb-6 w-full md:mb-0 md:w-1/6'>
            <Indicators
              totalSteps={3}
              currentStep={currentStep}
              onStepChange={handleStepChange}
            />
          </div>
          <form
            onSubmit={handleSubmit(console.log)}
            className='w-full md:ml-4 md:w-3/4'
          >
            {currentStep === 1 && (
              <div className='mb-6'>
                <label
                  htmlFor='title'
                  className='mb-2 block text-lg font-medium text-gray-300'
                >
                  What would you like your proposal to be known as?
                </label>
                <Controller
                  name='title'
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type='text'
                      id='title'
                      placeholder='e.g., Bundlr bounty contest for devs'
                      className='w-full border-b-2 border-purple-300 bg-transparent p-2 text-white outline-none'
                    />
                  )}
                />
                <div className='mt-1 h-10'>
                  {errors.title && (
                    <p className='mt-1 text-sm text-red-500'>
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className='mb-6'>
                <label
                  htmlFor='description'
                  className='mb-2 block text-lg font-medium text-gray-300'
                >
                  What is your proposal about?
                </label>
                <div
                  className={`transition-opacity duration-300 ${isPreview ? 'opacity-0' : 'opacity-100'}`}
                >
                  {!isPreview && (
                    <Controller
                      name='description'
                      control={control}
                      render={({ field }) => (
                        <ReactQuill
                          {...field}
                          modules={modules}
                          formats={formats}
                          theme='snow'
                          className='text-black bg-gray-300'
                        />
                      )}
                    />
                  )}
                </div>
                <div
                  className={`transition-opacity duration-300 ${isPreview ? 'opacity-100' : 'opacity-0'}`}
                >
                  {isPreview && (
                    <div
                      className='ql-editor prose prose-sm max-w-none rounded bg-white p-4 text-gray-900'
                      dangerouslySetInnerHTML={{
                        __html: watch('description') || '',
                      }}
                    />
                  )}
                </div>
                <div className='mt-1 h-10'>
                  {errors.description && (
                    <p className='mt-1 text-sm text-red-500'>
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className='mb-6'>
                <div>
                  <label
                    htmlFor='timing'
                    className='my-2 block text-lg font-medium text-gray-300'
                  >
                    When should this proposal start?
                  </label>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div className='mt-auto'>
                      <Controller
                        name='startDate'
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      <div className='mt-1 h-10'>
                        {errors.startDate && (
                          <p className='mt-1 text-sm text-red-500'>
                            {errors.startDate.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Controller
                        name='startTime'
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            date={field.value}
                            setDate={field.onChange}
                          />
                        )}
                      />
                      <div className='mt-1 h-10'>
                        {errors.startTime && (
                          <p className='mt-1 text-sm text-red-500'>
                            {errors.startTime.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <label
                    htmlFor='timing'
                    className='mb-2 mt-10 block text-lg font-medium text-gray-300'
                  >
                    When should this proposal end?
                  </label>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div className='mt-auto'>
                      <Controller
                        name='endDate'
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      <div className='mt-1 h-10'>
                        {errors.endDate && (
                          <p className='mt-1 text-sm text-red-500'>
                            {errors.endDate.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Controller
                        name='endTime'
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            date={field.value}
                            setDate={field.onChange}
                          />
                        )}
                      />
                      <div className='mt-1 h-10'>
                        {errors.endTime && (
                          <p className='mt-1 text-sm text-red-500'>
                            {errors.endTime.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className='flex flex-col justify-between gap-4 md:flex-row'>
              {currentStep > 1 && (
                <button
                  type='button'
                  onClick={() => handleStepChange(currentStep - 1)}
                  className='rounded-full border border-gray-300 bg-transparent px-6 py-2 text-white hover:bg-gray-700'
                >
                  Previous
                </button>
              )}
              {currentStep === 2 && (
                <div className='w-full'>
                  <button
                    type='button'
                    onClick={togglePreview}
                    className='w-full rounded-full border border-gray-300 bg-transparent px-6 py-2 text-gray-200 hover:bg-gray-700 md:w-auto'
                  >
                    {isPreview ? 'Edit' : 'Preview'}
                  </button>
                </div>
              )}
              {currentStep < 3 ? (
                <button
                  type='button'
                  onClick={() => handleStepChange(currentStep + 1)}
                  className='rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-700 disabled:bg-gray-500'
                  disabled={!isStepValid(currentStep)}
                >
                  Next
                </button>
              ) : (
                <ConnectWorldCoinID
                  placeholder='Submit Proposal'
                  onSuccess={async (token: string) => onSubmit(token)}
                  className='rounded-full bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:bg-gray-500'
                  disabled={!isValid || isSubmitting}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function CreateProposalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProposalForm />
    </Suspense>
  );
}
