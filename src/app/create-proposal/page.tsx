'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import Indicators from '../../components/indicators';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { DatePicker } from '@/components/datePicker';
import { TimePicker } from '@/components/timePicker';

const schema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  description: z.string().min(1, 'Description is required'),
  timing: z.string().min(1, 'Timing is required'),
  startDate: z.date({ required_error: '*Start date is required' }),
  startTime: z.date({ required_error: '*Start Time is required' }),
  endDate: z.date({ required_error: '*End date is required' }),
  endTime: z.date({ required_error: '*End Time is required' }),
});

type FormData = z.infer<typeof schema>;

const ProposalForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isPreview, setIsPreview] = useState(false);

  const watchFields = watch();
  console.log('watchFields', watchFields);
  const handleStepChange = (step: number) => {
    if (step <= currentStep + 1 && step > 0 && step <= 3) {
      setCurrentStep(step);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'align',
    'color',
    'background',
  ];

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className='ml-24 flex min-h-screen w-full flex-col bg-dark px-6 py-16 md:ml-12 md:px-[64px] lg:px-[124px] 2xl:px-[184px]'>
      <h1 className='mb-2 text-4xl font-bold uppercase tracking-wider text-inactive'>
        Create Proposal
      </h1>
      <div className='flex w-full flex-col rounded-lg border-2 border-dividers bg-lightDark p-4'>
        <div className='flex h-[50px] items-center text-light'>
          {'< Home / Communities / Flare Dao / Create Proposal'}
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
            onSubmit={handleSubmit(onSubmit)}
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
                          className='text-black bg-white'
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
                <div className='my-4 w-full'>
                  <button
                    type='button'
                    onClick={togglePreview}
                    className='w-full rounded bg-zinc-500 py-2 text-white transition-colors hover:bg-blue-600'
                  >
                    {isPreview ? 'Edit' : 'Preview'}
                  </button>
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
                    When should this proposal be implemented?
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
                    When should this proposal be implemented?
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
            <div className='flex justify-between'>
              {currentStep > 1 && (
                <button
                  type='button'
                  onClick={() => handleStepChange(currentStep - 1)}
                  className='rounded-full border border-gray-300 bg-transparent px-6 py-2 text-white hover:bg-gray-700'
                >
                  Previous
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type='button'
                  onClick={() => handleStepChange(currentStep + 1)}
                  className='rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-700 disabled:bg-gray-500'
                  disabled={
                    !watchFields[
                      Object.keys(watchFields)[
                        currentStep - 1
                      ] as keyof FormData
                    ]
                  }
                >
                  Next
                </button>
              ) : (
                <button
                  type='submit'
                  className='rounded-full bg-green-600 px-6 py-2 text-white hover:bg-green-700'
                >
                  Submit Proposal
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProposalForm;
