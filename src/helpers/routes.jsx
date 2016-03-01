/**
 * Created by Timko on 25.01.2016.
 */
import React from 'react'
import {Route, Redirect} from 'react-router';
import {store} from './store'
import App from '../components/App';
import Main from '../components/pages/main/Main';
import Auth from '../components/pages/auth/Auth';
import Chat from '../components/pages/main/Chat';
import Settings from '../components/pages/main/settings/Settings';
import Language from '../components/pages/main/settings/Language';

function requireAuth(nextState, replaceState) {
    let auth = store.getState().auth;
    if(!auth.authorized){
        replaceState({}, '/auth');
    }
}

export const routes = <Route component={App}>
    <Redirect from="/" to="/chat" />
    <Route path="/" component={Main} onEnter={requireAuth}>
        <Route path="chat" component={Chat} />
        <Route path="settings" component={Settings}>
            <Route path="language" component={Language} />
        </Route>
    </Route>
    <Route path="/auth" component={Auth}  onEnter={(nextState, replaceState) => {
        let auth = store.getState().auth;
        if(auth.authorized){
            replaceState({}, '/');
        }
    }}/>
</Route>;