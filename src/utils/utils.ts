import { LoginDataType } from "../types/types";

export const isLoginExists = (loginArray: Array<LoginDataType>, loginData: LoginDataType): boolean => {
    let isExists: boolean = false;
    loginArray.forEach(login => {
        if (login.login === loginData.login) {
            isExists = true;
        }
    })
    return isExists;
}
