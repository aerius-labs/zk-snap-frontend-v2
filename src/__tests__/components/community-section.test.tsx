import { render, screen } from '@testing-library/react';
import React from 'react';

import CommunitySection from '@/components/community-section';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        data-testid='mock-image'
      />
    );
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('CommunitySection', () => {
  const mockDaos = [
    { id: '1', name: 'DAO 1', logo: 'https://logo1.jpg' },
    { id: '2', name: 'DAO 2', logo: 'https://logo2.jpg' },
  ];

  it('renders section title and description', () => {
    render(<CommunitySection daos={mockDaos} />);

    expect(screen.getByText('//COMMUNITIES')).toBeInTheDocument();
    expect(screen.getByText(/are groups of individuals/)).toBeInTheDocument();
  });

  it('renders all community cards', () => {
    render(<CommunitySection daos={mockDaos} />);

    mockDaos.forEach((dao) => {
      expect(screen.getByText(dao.name)).toBeInTheDocument();
    });
  });

  it('renders view more link', () => {
    render(<CommunitySection daos={mockDaos} />);

    const viewMoreLink = screen.getByRole('link', { name: /view more/i });
    expect(viewMoreLink).toHaveAttribute('href', '/community');
  });

  it('wraps each community card in a link', () => {
    render(<CommunitySection daos={mockDaos} />);

    mockDaos.forEach((dao) => {
      const link = screen.getByRole('link', {
        name: new RegExp(dao.name, 'i'),
      });
      expect(link).toHaveAttribute('href', `/community/${dao.id}`);
    });
  });
});
