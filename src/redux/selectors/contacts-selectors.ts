import { ContactType } from "../../types/types";
import { AppStateType } from "../redux-store";

export const receiveContacts = (state: AppStateType): Array<ContactType> => state.contactsPage.contacts;
