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
import { receiveLogin, receiveUserId } from "../../redux/selectors/auth-selector";

type PropsType = {
    contacts: Array<ContactType>
    login: string | undefined
    id: number | undefined
    getContacts: () => void
    addNewContact: (name: string, city: string) => void
    removeContact: (id: number) => void
    upgradeContact: (id: number, name: string, city: string) => void
    logout: (id?: number) => void
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
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps !== this.props && prevState !== this.state) {
            this.props.getContacts();
        }
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
            this.setState({
                id: null
            });
        }   
        this.hideAddButtonForm();    
    }
    onRemoveContact = (id: number) => {
        this.props.removeContact(id);
    } 
    searchNameSubmit = (searchData: SearchDataType) => {
        if (searchData.search) {
            this.setState(({
                searchString: searchData.search
            }));
        }
    }
    searchNameChange = (searchString: string) => {
        this.setState(({
            searchString: searchString
        }));
    }
    onLogout = () => {
        this.props.logout(this.props.id);
    }
    render() {
        return (
            <div className={styles.contactsWrapper}>
                <SearchForm onSubmit={this.searchNameSubmit} searchNameChange={this.searchNameChange}/>
                <h1>Contact list</h1>
                <div className={styles.logout}>
                    <button onClick={this.onLogout}>Logout</button>
                    <span>{this.props.login}</span>
                </div>
                <button className={styles.button}
                        onClick={this.showAddButtonForm}>
                    Add contact
                </button>                    
                { this.state.isEdit && 
                    <AddContactForm onSubmit={this.addOrUpdateContact}
                                    hideAddButtonForm={this.hideAddButtonForm}/> 
                }
                <div className={styles.contactsBlock}>
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
            </div>
        )
    }
}

type MapStatePropsType = {
    contacts: Array<ContactType>
    login: string | undefined
    id: number | undefined
}

type MapDispatchPropsType = {
    getContacts: () => void
    addNewContact: (name: string, city: string) => void
    removeContact: (id: number) => void
    upgradeContact: (id: number, name: string, city: string) => void
    logout: (id?: number) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    contacts: receiveContacts(state),
    login: receiveLogin(state),
    id: receiveUserId(state)
})

export default connect<MapStatePropsType, MapDispatchPropsType, {} , AppStateType>(mapStateToProps,
     {getContacts, addNewContact, removeContact, upgradeContact, logout })(Contacts);
