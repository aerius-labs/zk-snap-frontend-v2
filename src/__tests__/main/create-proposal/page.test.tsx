import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import CreateProposalPage from '@/app/create-proposal/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));
jest.mock('@/components/idkit-widget', () => ({
  __esModule: true,
  default: ({ onSuccess, placeholder, disabled }: any) => (
    <button
      onClick={() => onSuccess('mock-worldcoin-token')}
      disabled={disabled}
      data-testid='mock-worldcoin-button'
    >
      {placeholder}
    </button>
  ),
}));

jest.mock('react-quill', () => {
  return {
    __esModule: true,
    default: (props: any) => {
      return React.createElement(
        'div',
        { 'data-testid': 'mock-quill' },
        React.createElement('textarea', {
          'data-testid': 'quill-editor',
          value: props.value,
          onChange: (e: any) => props.onChange(e.target.value),
        })
      );
    },
  };
});

jest.mock('@/components/date-picker', () => ({
  DatePicker: (props: any) => {
    return React.createElement('input', {
      type: 'date',
      'data-testid': 'date-picker',
      value: props.value,
      onChange: (e: any) => props.onChange(e.target.value),
    });
  },
}));

jest.mock('@/components/time-picker/time-picker', () => ({
  TimePicker: (props: any) => {
    return React.createElement('input', {
      type: 'time',
      'data-testid': 'time-picker',
      value: props.date,
      onChange: (e: any) => props.setDate(e.target.value),
    });
  },
}));

jest.mock('@/lib/actions', () => ({
  revalidateProperty: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
) as jest.Mock;

const mockRouter = {
  push: jest.fn(),
};

const mockSearchParams = new URLSearchParams('?daoId=123');

describe('CreateProposalPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('renders the form and handles step navigation', async () => {
    render(<CreateProposalPage />);

    // Step 1: Fill out title
    const titleInput = screen.getByPlaceholderText(
      /e\.g\., Bundlr bounty contest for devs/i
    );
    await userEvent.type(titleInput, 'Test Proposal Title');

    expect(
      screen.getByText(/What would you like your proposal to be known as?/i)
    ).toBeInTheDocument();

    const nextButton = screen.getByText('Next');
    await userEvent.click(nextButton);

    expect(
      screen.getByText(/What is your proposal about?/i)
    ).toBeInTheDocument();

    const nextButton2 = screen.getByText('Next');
    await userEvent.click(nextButton2);

    // await waitFor(() => {
    //     const startDatePicker = screen.getByTestId('date-picker');
    //     const startTimePicker = screen.getByTestId('time-picker');
    //     expect(startDatePicker).toBeInTheDocument();
    //     expect(startTimePicker).toBeInTheDocument();
    // });
  });

  it('handles validation errors appropriately', async () => {
    render(<CreateProposalPage />);
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
    const titleInput = screen.getByPlaceholderText(
      /e.g., Bundlr bounty contest for devs/i
    );
    await userEvent.type(titleInput, 'a'.repeat(101));

    expect(
      screen.getByText(/Title must be 100 characters or less/i)
    ).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<CreateProposalPage />);

    const titleInput = screen.getByPlaceholderText(
      /e.g., Bundlr bounty contest for devs/i
    );
    await userEvent.type(titleInput, 'Test Title');
    await userEvent.click(screen.getByText('Next'));

    const editor = screen.getByTestId('quill-editor');
    await userEvent.type(editor, 'Test description');
    await userEvent.click(screen.getByText('Next'));

    const submitButton = screen.getByTestId('mock-worldcoin-button');
    await userEvent.click(submitButton);
  });

  it('prevents navigation when daoId is missing', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    render(<CreateProposalPage />);
    expect(screen.getByText('Incorrect Dao Id')).toBeInTheDocument();
  });
});
