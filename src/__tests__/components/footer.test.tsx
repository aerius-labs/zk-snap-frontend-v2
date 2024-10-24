import { render, screen } from '@testing-library/react';
import React from 'react';

import Footer from '@/components/footer';

describe('Footer Component', () => {
  it('renders the main headings', () => {
    render(<Footer />);

    expect(screen.getByText('ZK SNAP')).toBeInTheDocument();
    expect(screen.getByText('Join ZK Snap community')).toBeInTheDocument();
    expect(
      screen.getByText('Get the latest ZK Snap updates')
    ).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);

    const navigationItems = ['Communities', 'Proposal', 'About Us', 'Blog'];
    navigationItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('renders resource links', () => {
    render(<Footer />);

    const resourceItems = [
      'FAQs',
      'Github',
      'Docs',
      'Request a feature',
      'Support',
    ];
    resourceItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('renders the tagline', () => {
    render(<Footer />);

    expect(
      screen.getByText(
        'Where DAO voting is simple, anonymous, and user-friendly. Empower your voice while preserving privacy.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('Join the future of governance now!')
    ).toBeInTheDocument();
  });
});
