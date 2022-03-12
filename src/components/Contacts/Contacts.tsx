import React, { FC } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { receiveContacts } from "../../redux/selectors/contacts-selectors";
import { ContactType } from "../../types/types";
import { getContacts, addNewContact, removeContact, upgradeContact } from '../../redux/contactsReducer';
import Contact from './Contact';
import styles from './Contacts.module.scss';
import AddContactForm, { FormDataType } from "./AddContactForm";
import SearchForm, { SearchDataType } from "./SearchForm";
import { logout } from '../../redux/auth-reducer';

type PropsType = {
    contacts: Array<ContactType>
    getContacts: () => void
    addNewContact: (name: string, city: string) => void
    removeContact: (id: number) => void
    upgradeContact: (id: number, name: string, city: string) => void
    logout: () => void
}

type StateType = {
    isEdit: boolean
    id: number | null
    searchString: string
}

class Contacts extends React.Component<PropsType, StateType> {  
    constructor(props: PropsType) {
        super(props);
        this.state = {
            isEdit: false,
            id: null,
            searchString: ""
        }
    } 
    componentDidMount() {
        this.props.getContacts();
    }    
    showAddButtonForm = () => {
        this.setState({
            isEdit: true
        });
    }
    showUpdateButtonForm = (id: number) => {
        this.setState({
            isEdit: true, id: id
        });
    }
    hideAddButtonForm = () => {
        this.setState({
            isEdit: false
        });
    }
    addOrUpdateContact = (contact: FormDataType) => {
        const { name, city } = contact;  
        if (this.state.id === null) {
            this.props.addNewContact(name, city);
        } else {
            this.props.upgradeContact(this.state.id, name, city);
        }   
        this.hideAddButtonForm();    
    }
    onRemoveContact = (id: number) => {
        this.props.removeContact(id);
    } 
    searchName = (searchString: string) => {
        this.setState({
            searchString: searchString
        });
    }
    onLogout = () => {
        this.props.logout();
    }
    render() {
        return (
            <div className={styles.contactsWrapper}>
                <SearchForm searchName={this.searchName}/>
                <h1>Contact list</h1>
                <button onClick={this.onLogout} className={styles.logout}>Logout</button>
                <div className={styles.contacts}>
                    { 
                        this.state.searchString !== "" ?
                        this.props.contacts.filter(contact => contact.name.toLowerCase()
                                                                        .includes(this.state.searchString.toLowerCase()))
                        .map(contact => (
                            <Contact key={contact.id} name={contact.name} city={contact.city} id={contact.id}
                            removeContact={this.onRemoveContact} showUpdateButtonForm={this.showUpdateButtonForm}
                            />
                        )) :
                        this.props.contacts.map(contact => (
                            <Contact key={contact.id} name={contact.name} city={contact.city} id={contact.id}
                            removeContact={this.onRemoveContact} showUpdateButtonForm={this.showUpdateButtonForm}
                            />
                        ))
                    }                     
                </div>
                <button className={styles.button}
                        onClick={this.showAddButtonForm}>
                    Add contact
                </button>                    
                { this.state.isEdit && 
                    <AddContactForm onSubmit={this.addOrUpdateContact}/> 
                }
            </div>
        )
    }
}

type MapStatePropsType = {
    contacts: Array<ContactType>
}

type MapDispatchPropsType = {
    getContacts: () => void
    addNewContact: (name: string, city: string) => void
    removeContact: (id: number) => void
    upgradeContact: (id: number, name: string, city: string) => void
    logout: () => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    contacts: receiveContacts(state)
})

export default connect<MapStatePropsType, MapDispatchPropsType, {} , AppStateType>(mapStateToProps,
     {getContacts, addNewContact, removeContact, upgradeContact, logout })(Contacts);
