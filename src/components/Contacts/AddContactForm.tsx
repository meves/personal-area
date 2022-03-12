import React, { FC } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import styles from './Contacts.module.scss';

export type FormDataType = {
    name: string
    city: string
}

const AddContactForm: FC<InjectedFormProps<FormDataType, {}> & {}> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <label>Name: </label>
            <Field className={styles.input} type="text" placeholder="name" name="name" component="input" />
            <label>City: </label>
            <Field className={styles.input} type="text" placeholder="city" name="city" component="input" />
            <div>
                <button>Send</button>
            </div>            
        </form>
    )
}

export default reduxForm<FormDataType, {}>({form: 'addContactForm'})(AddContactForm);
