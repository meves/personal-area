import { Action, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleWare, { ThunkAction } from 'redux-thunk';
import authReducer from './auth-reducer';
import contactsReducer from './contactsReducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    contactsPage: contactsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export type AppStateType = ReturnType<typeof store.getState>;

export type InferActionTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never;

export type ThunkActionType<A extends Action, R=void> = ThunkAction<Promise<R>, AppStateType, unknown, A>;

export default store;
//@ts-ignore
window.store = store;