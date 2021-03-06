import { createUser, logoutUser, getUsers } from "../api/api";
import { ResultCodes } from "../enum/resulCodes";
import { LoginDataType } from "../types/types";
import { isLoginExists } from "../utils/utils";
import store, { InferActionTypes, ThunkActionType } from "./redux-store";

const inititalState = {
    isAuth: false,
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
        const response = await getUsers();
        if (response.status === 200) {
            let result = isLoginExists(response.data, loginData);
            if (result) {
                dispatch(actions.setLogin(true, loginData));
            } else {
                const res = await createUser(loginData);
                if (res.status === 201) {
                    dispatch(actions.setLogin(true, res.data));
                }
            }
        }
    }

export const logout = (id?: number): ThunnkType => 
async (dispatch) => {
    //const response = await logoutUser(id);   
    //if (response.status === ResultCodes.Success) {
        dispatch(actions.setLogout(false, null));        
    //}         
}

export default authReducer;
