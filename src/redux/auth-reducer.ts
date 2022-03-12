import { LoginDataType } from "../types/types";
import { InferActionTypes, ThunkActionType } from "./redux-store";

const inititalState = {
    isAuth: true,
    loginData: null as LoginDataType | null
}

type InitialStateType = typeof inititalState;

type ActionsTypes = InferActionTypes<typeof actions>;

const authReducer = (state = inititalState, action: ActionsTypes) => {
    switch(action.type) {
        case "PERSONALAREA/AUTH/LOGIN":
            return {
                ...state,
                isAuth: action.payload.isAuth,
                loginData: action.payload.loginData
            }
        case "PERSONALAREA/AUTH/LOGOUT":
            return {
                ...state,
                isAuth: action.payload.isAuth,
                loginData: action.payload.loginData
            }
        default: 
            return state;
    }
}

const actions = {
    setLogin: (isAuth: boolean, loginData: LoginDataType) => ({
        type: 'PERSONALAREA/AUTH/LOGIN',
        payload: { isAuth, loginData }
    } as const),
    setLogout: (isAuth: boolean, loginData: null | LoginDataType) => ({
        type: 'PERSONALAREA/AUTH/LOGOUT',
        payload: { isAuth, loginData }
    } as const )
}

// thunk
type ThunnkType = ThunkActionType<ActionsTypes, void>;

export const login = (loginData: LoginDataType): ThunnkType => 
    async (dispatch) => {
        dispatch(actions.setLogin(true, loginData));
    }

export const logout = (): ThunnkType => 
async (dispatch) => {
    dispatch(actions.setLogout(false, null));
}

export default authReducer;
