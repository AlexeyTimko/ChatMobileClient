/**
 * Created by Timko on 25.01.2016.
 */
import React from 'react'
import {Route} from 'react-router';
import {store} from './store'
import App from '../components/App';
import Main from '../components/pages/main/Main';
import Auth from '../components/pages/auth/Auth';
import Chat from '../components/pages/main/Chat';

function requireAuth(nextState, replaceState) {
    let auth = store.getState().auth;
    if(!auth.authorized){
        replaceState({}, '/auth');
    }
}

export const routes = <Route component={App}>
    <Route path="/" component={Main} onEnter={requireAuth}>
        <Route path="chat" component={Chat} />
    </Route>
    <Route path="/auth" component={Auth}  onEnter={(nextState, replaceState) => {
        let auth = store.getState().auth;
        if(auth.authorized){
            replaceState({}, '/');
        }
    }}/>
</Route>;