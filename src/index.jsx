/**
 * Created by Timko on 11.01.2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {routes} from './helpers/routes';
import {store} from './helpers/store';
import setTranslations from './actions/translations';
import socketEvents from './actions/socket-events';
import * as constants from './constants/';
import io from 'socket.io-client';

document.addEventListener('deviceready', () => {
    if(localStorage.UUID === undefined){
        localStorage.UUID = device.uuid||Math.floor(Math.random() * 0x10000).toString(16);
    }
    var connectionOptions =  {
        "force new connection" : true,
        "sync disconnect on unload": true,
        "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
        "timeout" : 10000, //before connect_error and connect_timeout are emitted.
        "transports" : ["websocket"]
    };
    //var socket =  io.connect('ws://109.86.67.211:8080', connectionOptions);
    var socket =  io.connect('ws://localhost:8080', connectionOptions);

    store.dispatch({
        type: constants.SET_SOCKET,
        socket
    });
    store.dispatch(setTranslations());

    socket.on('connect', () => {
        store.dispatch(socketEvents());
        ReactDOM.render(
            <Provider store={store}>
                <Router history={browserHistory}>{routes}</Router>
            </Provider>,
            document.getElementById('app')
        );
    });
}, false);