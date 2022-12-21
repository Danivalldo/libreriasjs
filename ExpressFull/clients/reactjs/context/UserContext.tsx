import React from "react";
import { createContext, useReducer } from "react";
import { SET_LOGIN_TOKEN, LOG_OUT } from "./UserContextActionTypes";
import { IUserState, localStorageCtrl } from "../services/localStorageCtrl";

interface IUserContextProps {
  userState: IUserState;
  userDispatch: React.Dispatch<any> | null;
}

const UserContext = createContext<IUserContextProps>({
  userState: localStorageCtrl.getUserState(),
  userDispatch: null,
});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_LOGIN_TOKEN:
      return (() => {
        const newUserState = {
          ...state,
          isLoggedIn: action.isLoggedIn ? true : false,
          token: action.token,
          contactInfo: action.contactInfo
            ? action.contactInfo
            : { ...state.contactInfo },
        };
        const appSettings = localStorageCtrl.getAppSettings();
        if (appSettings.keepSession && newUserState.isLoggedIn) {
          localStorageCtrl.setUserState(newUserState);
        }
        return newUserState;
      })();
    case LOG_OUT:
      return (() => {
        const newUserState = {
          ...state,
          isLoggedIn: false,
          token: action.token,
          contactInfo: action.contactInfo
            ? action.contactInfo
            : { ...state.contactInfo },
        };
        localStorageCtrl.resetUserState();
        return newUserState;
      })();
    default:
      return state;
  }
};

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userState, userDispatch] = useReducer(
    reducer,
    localStorageCtrl.getUserState()
  );
  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
