import { LoginDataType } from "../types/types";
import { InferActionTypes, ThunkActionType } from "./redux-store";

const inititalState = {
    isAuth: true
}

type InitialStateType = typeof inititalState;

type ActionsTypes = InferActionTypes<typeof actions>;

const authReducer = (state = inititalState, action: ActionsTypes) => {
    switch(action.type) {
        case "PERSONALAREA/AUTH/LOGIN":
            return {
                ...state,
                isAuth: action.payload.isAuth
            }
        case "PERSONALAREA/AUTH/LOGOUT":
            return {
                ...state,
                isAuth: action.payload.isAuth
            }
        default: 
            return state;
    }
}

const actions = {
    setLogin: (isAuth: boolean) => ({
        type: 'PERSONALAREA/AUTH/LOGIN',
        payload: { isAuth }
    } as const),
    setLogout: (isAuth: boolean) => ({
        type: 'PERSONALAREA/AUTH/LOGOUT',
        payload: { isAuth }
    } as const )
}

// thunk
type ThunnkType = ThunkActionType<ActionsTypes, void>;

export const login = (loginData: LoginDataType): ThunnkType => 
    async (dispatch) => {
        dispatch(actions.setLogin(true));
    }

export const logout = (): ThunnkType => 
async (dispatch) => {
    dispatch(actions.setLogin(false));
}

export default authReducer;
