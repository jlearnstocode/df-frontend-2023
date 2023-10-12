'use client';

import { createContext, useContext, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import {
  AuthInitialStateType,
  GetmeResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  UserType,
} from '../@types/auth';
import client from '../lib/api';

const AuthContext = createContext<AuthInitialStateType | null>(null);

const initialState = { userInfo: {}, isLogin: false };

type ACTIONTYPE =
  | {
      type: 'GET_ME';
      payload: {
        avatar: string;
        email: string;
        fullName: string;
        id: number;
      };
    }
  | { type: 'LOG_OUT' };

function authReducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'GET_ME': {
      state = {
        ...state,
        isLogin: true,
        userInfo: { ...state.userInfo, ...action.payload },
      };
      break;
    }

    case 'LOG_OUT': {
      state = {
        ...state,
        isLogin: false,
        userInfo: {},
      };
      break;
    }

    default:
      return state;
  }

  return state;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const value = useMemo(() => {
    async function signup(info: SignupRequest) {
      const { data }: SignupResponse = await client.signup(info);
      toast(data.message.toUpperCase(), {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
    }

    async function login(info: LoginRequest) {
      const { data }: LoginResponse = await client.login(info);
      window.localStorage.setItem('my-token', data.accessToken);
      toast('Susscess!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
    }

    async function getme() {
      const { data: userInfo }: GetmeResponse = await client.getMe();
      dispatch({ type: 'GET_ME', payload: userInfo });
    }

    function logout() {
      window.localStorage.removeItem('my-token');
      dispatch({ type: 'LOG_OUT' });
    }

    return {
      state,
      signup,
      login,
      logout,
      getme,
    };
  }, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthState() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('Context should be use winthin a CountProvider');
  }

  return context?.state;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('Context should be use winthin a CountProvider');
  }

  return context;
}

export { AuthProvider, useAuth, useAuthState };
