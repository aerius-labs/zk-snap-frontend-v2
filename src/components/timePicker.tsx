'use client';

import { Clock } from 'lucide-react';
import * as React from 'react';

import { Label } from '@/components/ui/label';

import { TimePickerInput } from './timePickerInput';

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className='flex items-end gap-2'>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='hours' className='text-xs text-gray-300'>
          Hours
        </Label>
        <TimePickerInput
          picker='hours'
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='minutes' className='text-xs text-gray-300'>
          Minutes
        </Label>
        <TimePickerInput
          picker='minutes'
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='seconds' className='text-xs text-gray-300'>
          Seconds
        </Label>
        <TimePickerInput
          picker='seconds'
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className='flex h-10 items-center text-gray-300'>
        <Clock className='ml-2 h-4 w-4' />
      </div>
    </div>
  );
}
