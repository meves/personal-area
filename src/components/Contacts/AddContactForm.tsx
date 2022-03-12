import React, { FC } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import styles from './Contacts.module.scss';

export type FormDataType = {
    name: string
    city: string
}

type PropsType = {
    hideAddButtonForm: () => void
}

const AddContactForm: FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.addContactForm}>
            <label>Name: </label>
            <Field className={styles.input} type="text" placeholder="name" name="name" component="input" />
            <label>City: </label>
            <Field className={styles.input} type="text" placeholder="city" name="city" component="input" />
            <div>
                <button type="submit">Send</button>
                <button onClick={() => props.hideAddButtonForm()}type="reset">Reset</button>
            </div>            
        </form>
    )
}

export default reduxForm<FormDataType, PropsType>({form: 'addContactForm'})(AddContactForm);
