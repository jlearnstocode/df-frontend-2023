export interface UserType {
  avatar: string;
  email: string;
  fullName: string;
  id: number;
}

export interface AuthInfoType {
  email: string;
  password: string;
  fullName?: string;
  avatar?: string;
}

export interface AuthInitialStateType {
  state: { userInfo: UserType | null; isLogin: boolean };
  signup: (info: AuthInfoType) => void;
  login: (info: AuthInfoType) => void;
  logout: () => void;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    id: number;
    email: string;
    accessToken: string;
  };
};

export type SignupRequest = {
  email: string;
  password: string;
  fullName?: string;
  avatar?: string;
};

export type SignupResponse = {
  data: {
    message: string;
  };
};

export type GetmeResponse = {
  data: {
    avatar: string;
    email: string;
    fullName: string;
    id: number;
  };
};

export type SignupResponseBadRequest = {
  code: 'string';
  error: 'string';
  errors: [
    {
      error: 'string';
      field: 'string';
    },
  ];
  traceId: 'string';
};

export type Metadata = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
};

export type BaseListResponse<T> = {
  data: T[];
  metadata: Metadata;
};
