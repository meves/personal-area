import { AppStateType } from "../redux-store";

export const receiveIsAuth = (state: AppStateType): boolean => state.auth.isAuth; 
export const receiveLogin = (state: AppStateType): string | undefined => state.auth.loginData?.login;
export const receiveUserId = (state: AppStateType): number | undefined => state.auth.loginData?.id;
