'use client';

import { useState } from 'react';

import { faqQuestions } from '@/utils/faqData';

export default function FAQ() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  return (
    <div className='mx-4 mb-10 mt-4 flex min-h-[490px] flex-col rounded-2xl border-2 border-dividers bg-lightDark sm:mx-6 md:mx-8 lg:mx-24'>
      <div className='flex flex-col md:flex-row'>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <p className='px-6 py-4 text-4xl font-bold tracking-wide text-dividers sm:text-6xl md:origin-center md:-rotate-90 md:self-center md:whitespace-nowrap md:py-0 md:text-8xl'>
          //FAQs
        </p>
        <div className='flex w-full flex-col gap-8 bg-midBlack text-light'>
          <div className='flex flex-wrap justify-start gap-4 px-4 py-4 text-subText'>
            {faqQuestions.map((question) => (
              <div
                key={question.id}
                className={`cursor-pointer rounded px-2 py-1 font-bold ${
                  currentQuestion === question.id
                    ? 'bg-dividers text-light'
                    : 'text-subText hover:bg-dividers hover:bg-opacity-50'
                }`}
                onClick={() => setCurrentQuestion(question.id)}
                role='button'
                tabIndex={0}
              >
                Question {question.id}
              </div>
            ))}
          </div>
          <div className='flex h-full flex-col justify-center gap-6 p-6 sm:p-8 md:p-12'>
            <p className='text-2xl font-bold uppercase sm:text-3xl md:text-4xl'>
              {`#${currentQuestion} `}
              {faqQuestions[currentQuestion - 1].question}
            </p>
            <p className='text-justify text-base font-medium text-subText sm:text-lg'>
              {faqQuestions[currentQuestion - 1].answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
