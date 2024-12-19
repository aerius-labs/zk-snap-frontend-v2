import { render, screen } from '@testing-library/react';

import { renderStatusInfo } from '@/components/proposal-status';
import { ProposalStatus } from '@/lib/interfaces';

jest.mock('@/utils/handler', () => ({
  calculateTimeRemaining: jest.fn(() => '2 days'),
  calculateTimeToStart: jest.fn(() => '1 day'),
}));

describe('renderStatusInfo', () => {
  const now = new Date('2024-03-15T12:00:00Z');

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(now);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders active status correctly', () => {
    const props = {
      status: ProposalStatus.Active,
      start_time: '2024-03-14T12:00:00Z',
      end_time: '2024-03-17T12:00:00Z',
    };

    render(<div>{renderStatusInfo(props)}</div>);

    expect(screen.getByText('Voting')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('for')).toBeInTheDocument();
    expect(screen.getByText('2 days')).toBeInTheDocument();
  });

  it('renders inactive status with future start time', () => {
    const props = {
      status: ProposalStatus.Inactive,
      start_time: '2024-03-16T12:00:00Z',
      end_time: '2024-03-19T12:00:00Z',
    };

    render(<div>{renderStatusInfo(props)}</div>);

    expect(screen.getByText('Inactive')).toBeInTheDocument();
    expect(screen.getByText('Starts in')).toBeInTheDocument();
    expect(screen.getByText('1 day')).toBeInTheDocument();
  });

  it('renders inactive status with past start time', () => {
    const props = {
      status: ProposalStatus.Inactive,
      start_time: '2024-03-14T12:00:00Z',
      end_time: '2024-03-17T12:00:00Z',
    };

    render(<div>{renderStatusInfo(props)}</div>);

    expect(screen.getByText('Inactive')).toHaveClass('text-red-600');
  });

  it('returns null for invalid status', () => {
    const props = {
      status: 'invalid' as ProposalStatus,
      start_time: '2024-03-14T12:00:00Z',
      end_time: '2024-03-17T12:00:00Z',
    };

    const { container } = render(<div>{renderStatusInfo(props)}</div>);

    expect(container.firstChild?.textContent).toBe('');
  });
});
