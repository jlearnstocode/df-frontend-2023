import {
  BaseListResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '../@types/auth';
import { BookType } from '../@types/book';
import fetcher from './fetcher';

const BASE_URL = 'https://develop-api.bookstore.dwarvesf.com';

const headers: HeadersInit = {
  'Content-Type': 'application/json',
};

const privateHeaders: HeadersInit = {
  ...headers,
  Authorization:
    typeof window !== 'undefined'
      ? `Bearer ${window.localStorage.getItem('df-token')}`
      : '',
};

const client = {
  signup(params: SignupRequest) {
    return fetcher<SignupResponse>(`${BASE_URL}/api/v1/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  login(params: LoginRequest) {
    return fetcher<LoginResponse>(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  getBooks() {
    return fetcher<BaseListResponse<BookType>>(`${BASE_URL}/api/v1/books`, {
      headers: privateHeaders,
    });
  },
};

export default client;
