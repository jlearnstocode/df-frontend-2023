import queryString from 'query-string';
import {
  DeleteBookResponse,
  UpdateBookType,
  NewBookResponse,
  NewBookType,
  BookType,
  TopicType,
} from '../@types/book';
import {
  BaseListResponse,
  GetmeResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '../@types/auth';
import fetcher from './fetcher';

const BASE_URL = 'https://develop-api.bookstore.dwarvesf.com';

const headers: HeadersInit = {
  'Content-Type': 'application/json',
};

const privateHeaders: HeadersInit = {
  ...headers,
  Authorization:
    typeof window !== 'undefined'
      ? `Bearer ${window.localStorage.getItem('my-token')}`
      : '',
};

const client = {
  setClientJwt: () => {
    privateHeaders['Authorization'] =
      typeof window !== 'undefined'
        ? `Bearer ${window.localStorage.getItem('my-token')}`
        : '';
  },
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

  getMe() {
    return fetcher<GetmeResponse>(`${BASE_URL}/api/v1/me`, {
      headers: privateHeaders,
    });
  },

  getBooks(params: {
    page?: number;
    pageSize?: number;
    sort?: string;
    query?: string;
    topicId?: number;
  }) {
    const paramsUrl = queryString.stringify(params);

    return fetcher<BaseListResponse<BookType>>(
      `${BASE_URL}/api/v1/books?${paramsUrl}`,
      {
        headers: privateHeaders,
      },
    );
  },

  getBookById(params: { id: number }) {
    const { id } = params;
    return fetcher<NewBookResponse>(`${BASE_URL}/api/v1/books/${id}`, {
      headers: privateHeaders,
    });
  },

  getTopics() {
    return fetcher<BaseListResponse<TopicType>>(`${BASE_URL}/api/v1/topics`, {
      headers: privateHeaders,
    });
  },

  createBook(params: NewBookType) {
    return fetcher<NewBookResponse>(`${BASE_URL}/api/v1/books`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: privateHeaders,
    });
  },

  updateBook(params: UpdateBookType) {
    const { id, ...rest } = params;
    return fetcher<NewBookResponse>(`${BASE_URL}/api/v1/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...rest }),
      headers: privateHeaders,
    });
  },

  deleteBook(params: { id: number }) {
    const { id } = params;
    return fetcher<DeleteBookResponse>(`${BASE_URL}/api/v1/books/${id}`, {
      method: 'DELETE',
      headers: privateHeaders,
    });
  },
};

export default client;
