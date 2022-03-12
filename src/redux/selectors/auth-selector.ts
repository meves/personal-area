import { AppStateType } from "../redux-store";

export const receiveIsAuth = (state: AppStateType): boolean => state.auth.isAuth; 
