import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import Sidebar from '@/components/sidebar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: any) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

const resizeScreen = (width: number) => {
  global.innerWidth = width;
  global.dispatchEvent(new Event('resize'));
};

describe('Sidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop View (xl screens)', () => {
    beforeEach(() => {
      resizeScreen(1280);
    });

    it('renders desktop sidebar with logo images', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Sidebar />);

      expect(screen.getByAltText('Bg Logo Sidebar')).toBeInTheDocument();
      expect(screen.getByAltText('Zk Snap Logo')).toBeInTheDocument();
      expect(screen.getByAltText('Bg Nav Sidebar')).toBeInTheDocument();
    });

    it('renders all navigation items', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Sidebar />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Community')).toBeInTheDocument();
      expect(screen.getByText('Proposal')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    it('renders divider after Proposal item', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Sidebar />);

      const dividers = screen.getAllByRole('separator');
      expect(dividers).toHaveLength(1);
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      resizeScreen(375);
    });

    it('renders mobile navigation bar', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Sidebar />);

      const mobileNav = screen.getByTestId('mobile-navigation');
      expect(mobileNav).toHaveClass('flex', 'justify-around', 'py-2');
    });
  });

  describe('Navigation Active States', () => {
    it('highlights active route in mobile view', () => {
      (usePathname as jest.Mock).mockReturnValue('/community');
      render(<Sidebar />);

      const communityLink = screen.getByText('Community').closest('a');
      expect(communityLink).toHaveClass('text-gray-200');

      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveClass('text-muted-foreground');
    });

    it('applies correct hover styles to desktop icons', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Sidebar />);

      const icons = screen
        .getAllByRole('link')
        .filter((link) => link.className.includes('cursor-pointer'));

      icons.forEach((icon) => {
        expect(icon).toHaveClass('hover:bg-light');
      });
    });
  });

  describe('Accessibility', () => {
    it('renders all navigation links with accessible names', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Sidebar />);

      const expectedLabels = ['Home', 'Community', 'Proposal', 'Notifications'];

      expectedLabels.forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });
});
