import { render, screen } from '@testing-library/react';

import Communities from '@/app/community/page';
import { getDAOs } from '@/lib/actions';
import type { DaoDetails } from '@/lib/interfaces';

jest.mock('@/lib/actions', () => ({
  getDAOs: jest.fn(),
}));

jest.mock('@/components/breadcrumb', () => ({
  BreadcrumbDemo: ({ items }: { items: Array<{ label: string }> }) => (
    <div data-testid='breadcrumb'>
      {items.map((item) => (
        <span key={item.label}>{item.label}</span>
      ))}
    </div>
  ),
}));

jest.mock('@/components/community', () => ({
  __esModule: true,
  default: ({ daoDetails }: { daoDetails: DaoDetails }) => (
    <div data-testid={`community-${daoDetails.id}`}>{daoDetails.name}</div>
  ),
}));

jest.mock('@/lib/icons', () => ({
  MagnifyingGlass: () => <div data-testid='search-icon'>Search Icon</div>,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid='next-link'>
      {children}
    </a>
  ),
}));

describe('Communities Page', () => {
  const mockDAOs: DaoDetails[] = [
    {
      id: '1',
      name: 'Test DAO 1',
      logo: 'logo1.png',
    },
    {
      id: '2',
      name: 'Test DAO 2',
      logo: 'logo2.png',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getDAOs as jest.Mock).mockResolvedValue(mockDAOs);
  });

  it('renders the communities page with correct header', async () => {
    render(await Communities());
    expect(screen.getByText('//COMMUNITIES')).toBeInTheDocument();
  });

  it('renders the breadcrumb with correct items', async () => {
    render(await Communities());

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Communities')).toBeInTheDocument();
  });

  it('renders the search icon', async () => {
    render(await Communities());
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('renders all DAOs with correct links', async () => {
    render(await Communities());
    mockDAOs.forEach((dao) => {
      expect(screen.getByTestId(`community-${dao.id}`)).toBeInTheDocument();
      expect(screen.getByText(dao.name)).toBeInTheDocument();
    });

    const links = screen.getAllByTestId('next-link');
    expect(links).toHaveLength(mockDAOs.length);
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', `/community/${mockDAOs[index].id}`);
    });
  });

  it('calls getDAOs on render', async () => {
    render(await Communities());
    expect(getDAOs).toHaveBeenCalled();
  });

  it('handles empty DAO list', async () => {
    (getDAOs as jest.Mock).mockResolvedValue([]);
    render(await Communities());

    expect(screen.getByText('//COMMUNITIES')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();

    expect(screen.queryAllByTestId(/community-/)).toHaveLength(0);
  });
});
