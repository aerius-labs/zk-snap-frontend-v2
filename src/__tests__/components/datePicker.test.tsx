import { fireEvent, render, screen } from '@testing-library/react';

import { DatePicker } from '@/components/datePicker';

describe('DatePicker', () => {
  const mockOnChange = jest.fn();
  const mockDate = new Date('2025-01-01');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial date value', () => {
    render(<DatePicker value={mockDate} onChange={mockOnChange} />);

    expect(screen.getByText('January 1st, 2025')).toBeInTheDocument();
  });

  it('shows calendar when clicked', () => {
    render(<DatePicker value={mockDate} onChange={mockOnChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument(); // Calendar grid
  });
});
