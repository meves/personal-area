import React, { FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../../validators/validateControls';
import { maxLength20, minLength6, minLength8, required } from '../../validators/validators';
import styles from './Login.module.scss';

export type LoginDataType = {
    login: string
    password: string
}

const LoginForm: FC<InjectedFormProps<LoginDataType, {}> & {}> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.input}>
                <Field type="text" placeholder="login" name="login" component={Input} 
                       validate={[required, minLength6, maxLength20]}/>
            </div>
            <div  className={styles.input}>
                <Field type="password" placeholder="password" name="password" component={Input}
                       validate={[required, minLength8]}/>
            </div>
            <div className={styles.buttonGroup}>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default reduxForm<LoginDataType, {}>({form: 'loginForm'})(LoginForm);
