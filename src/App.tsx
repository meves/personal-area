import React, { FC } from 'react';
import { connect } from 'react-redux';
import './App.css';
import ContactsContainer from './components/Contacts/Contacts';
import LoginContainer from './components/Login/Login';
import { AppStateType } from './redux/redux-store';
import { receiveIsAuth } from './redux/selectors/auth-selector';

const App: FC<MapStatePropsType> = (props) => {
  const isAuth = props.isAuth;
  return (
    <div>
      {isAuth 
        ? <ContactsContainer/> 
        : <LoginContainer/>
      }
    </div>
  );
}

type MapStatePropsType = {
  isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: receiveIsAuth(state)
})

export default connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {})(App);
