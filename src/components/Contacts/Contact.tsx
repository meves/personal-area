import React, { FC, useState } from "react";
import styles from './Contacts.module.scss';

type PropsType = {
    name: string
    city: string
    id: number
    removeContact: (id: number) => void
    showUpdateButtonForm: (id: number) => void
}

const Contact: FC<PropsType> =(props) => {
    const onRemoveContact = () => {
        props.removeContact(props.id);
    }
    const onEditContact = () => {
        props.showUpdateButtonForm(props.id);
    }
    return (
        <div className={styles.contact}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.city}>{props.city}</div>
            <button onClick={onEditContact} className={styles.editButton}>Edit</button>
            <button onClick={onRemoveContact} className={styles.removeButton}>Remove</button>
        </div>        
    )
}

export default Contact;
