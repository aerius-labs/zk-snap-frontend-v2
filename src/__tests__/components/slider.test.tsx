import { render, screen } from '@testing-library/react';

import Slider from '@/components/slider';
import { ShowInfo } from '@/components/slider';

describe('ShowInfo', () => {
  it('renders property and value correctly', () => {
    render(<ShowInfo property='Test Property' value='Test Value' />);

    expect(screen.getByText('Test Property')).toBeInTheDocument();
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });
});

describe('Slider', () => {
  it('renders all sections', () => {
    render(<Slider />);

    expect(screen.getByText('Basic Info')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText('Submissions')).toBeInTheDocument();
  });

  it('renders submission instructions', () => {
    render(<Slider />);

    expect(
      screen.getByText('Qualified wallets can enter a max of 1 submission')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Contest accept up to 4997 submissions')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Connect wallet to see if you qualify')
    ).toBeInTheDocument();
  });
});
