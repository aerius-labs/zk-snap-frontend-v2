'use client';

import { useState } from 'react';

import { faqQuestions } from '@/utils/faqData';

export default function FAQ() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const noOfQuestions = faqQuestions.length;
  return (
    <div className='bg-dark px-6 py-4'>
      <div className='mb-10 ml-36 rounded-2xl border-2 border-dividers bg-lightDark p-1'>
        <div className='flex min-h-[490px] w-full bg-lightDark'>
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <p className='-mx-12 hidden -rotate-90 items-center text-8xl font-bold tracking-wide text-dividers md:flex'>
            //FAQs
          </p>
          <div className='flex flex-col gap-8 bg-midBlack text-light'>
            <div className='grid grid-cols-4 px-5 py-2.5 text-subText xl:grid-cols-10'>
              {faqQuestions.map((question) => {
                return (
                  <>
                    <div
                      className={`flex cursor-pointer ${currentQuestion === question.id ? 'text-light' : ''}`}
                      onClick={() => setCurrentQuestion(question.id)}
                      role='presentation'
                    >
                      Question{question.id}
                    </div>
                    {question.id !== noOfQuestions && (
                      <span className='flex justify-center'>|</span>
                    )}
                  </>
                );
              })}
            </div>
            <div className='flex h-full flex-col justify-center gap-6 p-12'>
              <p className='text-4xl font-bold uppercase'>
                {`#${currentQuestion} `}
                {faqQuestions[currentQuestion - 1].question}
              </p>
              <p className='text-justify text-lg font-medium text-subText'>
                {faqQuestions[currentQuestion - 1].answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
