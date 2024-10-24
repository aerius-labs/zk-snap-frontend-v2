import { render, screen } from '@testing-library/react';

import Community from '@/components/community';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Community', () => {
  const mockDaoDetails = {
    id: '1',
    name: 'Test DAO',
    logo: 'https://test-logo.jpg',
  };

  it('renders community name and logo', () => {
    render(<Community daoDetails={mockDaoDetails} />);

    expect(screen.getByText(mockDaoDetails.name)).toBeInTheDocument();
    expect(
      screen.getByAltText(`${mockDaoDetails.name} logo`)
    ).toBeInTheDocument();
  });
});
