'use client';

import { createContext, useContext, useMemo, useReducer } from 'react';
import {
  AuthInfoType,
  AuthInitialStateType,
  SignupResponse,
} from '../@types/auth';
import client from '../lib/api';
import { toast } from 'react-toastify';

const AuthContext = createContext<AuthInitialStateType | null>(null);

const initialState = { userInfo: null, isLogin: false };

type ACTIONTYPE =
  | { type: 'LOG_IN'; payload: AuthInfoType }
  | { type: 'LOG_OUT' };

function authReducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'LOG_IN': {
      return state;
      break;
    }

    case 'LOG_OUT': {
      return state;
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
    async function signup(info: AuthInfoType) {
      const { data }: SignupResponse = await client.signup(info);
      toast(data.message.toUpperCase(), {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
    }

    function login(info: AuthInfoType) {
      dispatch({ type: 'LOG_IN', payload: info });
    }

    function logout() {
      dispatch({ type: 'LOG_OUT' });
    }

    return {
      state,
      signup,
      login,
      logout,
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
