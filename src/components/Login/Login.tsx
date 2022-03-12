import React, { FC } from "react";
import LoginForm, { LoginDataType } from "./LoginForm";
import styles from './Login.module.scss';
import { login } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";

type PropsType = {
    login: (loginData: LoginDataType) => void
}

const Login: FC<PropsType> = (props) => {
    const onLogin = (loginData: LoginDataType) => {
        props.login(loginData);
    }
    return (
        <div className={styles.loginWrapper}>
            <LoginForm onSubmit={onLogin}/>
        </div>
    )
}

type MapDispatchPropsType = {
    login: (loginData: LoginDataType) => void
}

export default connect<{}, MapDispatchPropsType, {}, AppStateType>(null, { login })(Login);
