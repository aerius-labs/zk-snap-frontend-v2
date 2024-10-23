import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Mock fetch
global.fetch = jest.fn();

// Mock next/cache
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

// Mock environment variables
process.env.BACKEND_URL = 'http://test-api.com';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
}));
