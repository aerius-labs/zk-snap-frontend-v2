'use client';

import { useState } from 'react';

import { faqQuestions } from '@/utils/faqData';

export default function FAQ() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const noOfQuestions = faqQuestions.length;
  return (
    <div className='flex min-h-[490px] w-full bg-lightDark'>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <p className='-mx-12 hidden -rotate-90 items-center text-8xl font-bold tracking-wide text-dividers md:flex'>
        //FAQs
      </p>
      <div className='flex flex-col gap-8 bg-dark text-light'>
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
            In light of the ever-evolving landscape of blockchain technology and
            the critical importance of security within decentralized autonomous
            organizations (DAOs), Flare Dao presents this comprehensive proposal
            to reinforce and enhance the security measures governing our
            network. <br /> The primary objective of this proposal is to fortify
            Flare Dao&aposs infrastructure against potential threats, ensuring
            the continued integrity and reliability of our decentralized
            ecosystem. By implementing advanced security measures, we aim to
            instill confidence among our community members, developers, and
            stakeholders, fostering a secure environment for collaboration and
            innovation.
          </p>
        </div>
      </div>
    </div>
  );
}
