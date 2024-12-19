import { fireEvent, render, screen } from '@testing-library/react';

import FAQ from '@/components/faq';
import { faqQuestions } from '@/utils/faqData';

jest.mock('@/utils/faqData', () => ({
  faqQuestions: [
    { id: 1, question: 'First Question', answer: 'First Answer' },
    { id: 2, question: 'Second Question', answer: 'Second Answer' },
  ],
}));

describe('FAQ', () => {
  it('renders FAQ section title', () => {
    render(<FAQ />);
    expect(screen.getByText('//FAQs')).toBeInTheDocument();
  });

  it('renders question buttons for each FAQ', () => {
    render(<FAQ />);

    faqQuestions.forEach((question) => {
      expect(screen.getByText(`Question ${question.id}`)).toBeInTheDocument();
    });
  });

  it('displays first question by default', () => {
    render(<FAQ />);

    expect(screen.getByText('#1 First Question')).toBeInTheDocument();
    expect(screen.getByText('First Answer')).toBeInTheDocument();
  });

  it('applies correct styling to active question button', () => {
    render(<FAQ />);

    const activeButton = screen.getByText('Question 1');
    expect(activeButton).toHaveClass('bg-dividers', 'text-light');

    const inactiveButton = screen.getByText('Question 2');
    expect(inactiveButton).toHaveClass('text-subText');
  });
});
