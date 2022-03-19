import React, { ChangeEvent, FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import styles from './Contacts.module.scss';

export type SearchDataType = {
    search: string
}

type PropsType = {
    searchNameChange: (searchData: string) => void
}

const SearchForm: FC<InjectedFormProps<SearchDataType, PropsType> & PropsType> = (props) => {
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.searchNameChange(event.target.value);
    }
    return (
        <form onSubmit={props.handleSubmit} className={styles.searchForm}>
            <Field className={styles.input} type="text" placeholder="name" 
                   name="search" component="input" onChange={handleSearchChange}/>      
            <button>Search</button>             
        </form>
    )
}

export default reduxForm<SearchDataType, PropsType>({form: 'searchForm'})(SearchForm);
