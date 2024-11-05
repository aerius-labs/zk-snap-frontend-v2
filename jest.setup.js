import '@testing-library/jest-dom';
import 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from 'util';

// Setup Text Encoder/Decoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Add specific MSW requirements
global.Request = Request;
global.Response = Response;
global.Headers = Headers;
global.FormData = FormData;
global.URLSearchParams = URLSearchParams;

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} alt={props.alt || ''} />;
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

global.fetch = jest.fn();
