import {createContext, Dispatch} from 'react';

export interface UserState {
  infoEdit: boolean;
  info: Record<string, any>;
  baseInfo: {
    name: string;
    phone: string;
    location: string;
  };
}

export type UserAction =
  | {type: 'SET_INFO'; info: any}
  | {type: 'SET_INFO_EDIT'; infoEdit: boolean}
  | {type: 'SET_BASE_INFO'; baseInfo: Partial<UserState['baseInfo']>};

const UserContext = createContext<{
  userState: UserState;
  userDispatch: Dispatch<UserAction>;
}>(null!);

export default UserContext;
