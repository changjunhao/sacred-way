import {createContext, Dispatch} from 'react';

export interface AuthState {
  isLoading: boolean;
  token: string;
}

export type AuthAction =
  | {type: 'LOADING'}
  | {type: 'RESTORE_TOKEN'; token?: string | null}
  | {type: 'SIGN_IN'; token?: string | null}
  | {type: 'SIGN_OUT'};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>(null!);

export default AuthContext;
