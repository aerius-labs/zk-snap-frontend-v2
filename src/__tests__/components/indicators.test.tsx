import { fireEvent, render, screen } from '@testing-library/react';

import Indicators from '@/components/indicators';

describe('Indicators', () => {
  const mockOnStepChange = jest.fn();
  const defaultProps = {
    totalSteps: 3,
    currentStep: 1,
    onStepChange: mockOnStepChange,
  };

  beforeEach(() => {
    mockOnStepChange.mockClear();
  });

  it('renders all steps with correct titles', () => {
    render(<Indicators {...defaultProps} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Timing')).toBeInTheDocument();
  });

  it('highlights current step correctly', () => {
    render(<Indicators {...defaultProps} />);

    const currentStepText = screen.getByText('Title');
    const nonCurrentStepText = screen.getByText('Description');

    expect(currentStepText).toHaveClass('text-white');
    expect(nonCurrentStepText).toHaveClass('text-gray-500');
  });

  it('calls onStepChange with correct step number when clicked', () => {
    render(<Indicators {...defaultProps} />);

    const stepButtons = screen.getAllByRole('button');
    fireEvent.click(stepButtons[1]); // Click second step

    expect(mockOnStepChange).toHaveBeenCalledWith(2);
  });

  it('renders correct number of steps based on totalSteps prop', () => {
    render(<Indicators {...defaultProps} />);

    const steps = screen.getAllByRole('button');
    expect(steps).toHaveLength(3);
  });

  it('has correct aria-labels for accessibility', () => {
    render(<Indicators {...defaultProps} />);

    expect(screen.getByLabelText('Go to step 1 - Title')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Go to step 2 - Description')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Go to step 3 - Timing')).toBeInTheDocument();
  });
});
