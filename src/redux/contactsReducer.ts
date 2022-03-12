import { addContact, deleteContact, requestContacts, updateContact } from "../api/api";
import { ResultCodes } from "../enum/resulCodes";
import { ContactType } from "../types/types";
import { InferActionTypes, ThunkActionType } from "./redux-store";

const initialState = {
    contacts: [] as Array<ContactType>
}

type InitialStateType = typeof initialState;

type ActionsTypes = InferActionTypes<typeof actions>;

const contactsReducer = (state = initialState, action:ActionsTypes): InitialStateType => {
    switch(action.type) {
        case "PERSONALAREA/CONTACTS/SET-CONTACTS":
            return {
                ...state,
                contacts: [...action.payload.contacts]
            }       
        default:
            return state;
    }
}

// action
const actions = {
    setContacts: (contacts: Array<ContactType>) => ({
        type: 'PERSONALAREA/CONTACTS/SET-CONTACTS',
        payload: { contacts }
    } as const)    
}

// thunk
type ThunkType = ThunkActionType<ActionsTypes, void>;

export const getContacts = (): ThunkType => 
    async (dispatch) => {
        const response = await requestContacts();
        if (response.status === ResultCodes.Success) {
            dispatch(actions.setContacts(response.data));
        }        
    }

export const addNewContact = (name: string, city: string): ThunkType => 
    async (dispatch) => {
        const response = await addContact(name, city);    
        if (response.status === ResultCodes.Created) {
            dispatch(getContacts());    
        }
    }

export const removeContact = (id: number): ThunkType =>
    async (dispatch) => {
        const response = await deleteContact(id);
        if (response.status === ResultCodes.Success) {
            dispatch(getContacts()); 
        }
    } 

export const upgradeContact = (id: number, name: string, city: string): ThunkType => 
    async (dispatch) => {
        const response = await updateContact(id, name, city);
        if (response.status === ResultCodes.Success) {
            dispatch(getContacts()); 
        }
    }

export default contactsReducer;
