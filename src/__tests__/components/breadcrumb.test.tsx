import { render, screen } from '@testing-library/react';

import { BreadcrumbDemo } from '@/components/breadcrumb';

describe('BreadcrumbDemo', () => {
  const mockItems = [
    { label: 'Home', href: '/', isCurrentPage: false },
    { label: 'Projects', href: '/projects', isCurrentPage: false },
    { label: 'Current', href: '/projects/current', isCurrentPage: true },
  ];

  it('renders full breadcrumb on desktop', () => {
    render(<BreadcrumbDemo items={mockItems} />);

    const desktopView = screen.getByTestId('desktop-breadcrumb');
    mockItems.forEach((item) => {
      expect(desktopView).toHaveTextContent(item.label);
    });
  });

  it('renders truncated breadcrumb on mobile', () => {
    render(<BreadcrumbDemo items={mockItems} />);

    const mobileView = screen.getByTestId('mobile-breadcrumb');
    expect(mobileView).toHaveTextContent(mockItems[0].label);
    expect(mobileView).toHaveTextContent(mockItems[mockItems.length - 1].label);
  });

  it('renders correct links and current page in desktop view', () => {
    render(<BreadcrumbDemo items={mockItems} />);

    const desktopView = screen.getByTestId('desktop-breadcrumb');

    mockItems.forEach((item) => {
      if (item.isCurrentPage) {
        const currentPage = desktopView.querySelector(`[aria-current="page"]`);
        expect(currentPage).toHaveTextContent(item.label);
        expect(currentPage).not.toHaveAttribute('href');
      } else {
        const links = desktopView.querySelectorAll(`a[href="${item.href}"]`);
        expect(links.length).toBe(1);
        expect(links[0]).toHaveTextContent(item.label);
      }
    });
  });

  it('applies correct styling classes', () => {
    render(<BreadcrumbDemo items={mockItems} />);

    // Check desktop/mobile visibility classes
    const desktopView = screen.getByTestId('desktop-breadcrumb');
    const mobileView = screen.getByTestId('mobile-breadcrumb').parentElement;

    expect(desktopView.parentElement).toHaveClass('hidden', 'md:block');
    expect(mobileView).toHaveClass('md:hidden');
  });
});
