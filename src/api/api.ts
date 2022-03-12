import axios from "axios";
import { ContactType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000/',
});

export const requestContacts = async () => {
    const response = await instance.get<Array<ContactType>>('contacts');
    return response;    
}

export const addContact = async (name: string, city: string) => {
    const response = await instance.post<{}>('contacts', ({name, city}));
    return response;
}

export const deleteContact = async (id: number) => {
    const response = await instance.delete<{}>(`contacts/${id}`);
    return response;
}

export const updateContact = async (id: number, name: string, city: string) => {
    const response = await instance.put(`contacts/${id}`, {name, city});
    return response;
}
