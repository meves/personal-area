import React, { FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../../validators/validateControls';
import { required } from '../../validators/validators';
import styles from './Login.module.scss';

export type LoginDataType = {
    login: string
    password: string
}

const LoginForm: FC<InjectedFormProps<LoginDataType, {}> & {}> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.input}>
                <Field type="text" placeholder="login" name="login" component={Input} validate={[required]}/>
            </div>
            <div  className={styles.input}>
                <Field type="password" placeholder="password" name="password" component={Input} validate={[required]}/>
            </div>
            <div className={styles.buttonGroup}>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default reduxForm<LoginDataType, {}>({form: 'loginForm'})(LoginForm);
