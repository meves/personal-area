import { LoginDataType } from "../types/types"

export type ContactsDataType<T> = {
    constacts: T
}

export type LoginUsersData<T> = {
    users : Array<T>
}
