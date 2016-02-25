/**
 * Created by Timko on 11.01.2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import {Provider} from 'react-redux';
import {routes} from './helpers/routes';
import {store} from './helpers/store';
import {getTranslations} from './actions/getTranslations';
import socketEvents from './actions/socket-events';
import * as constants from './constants/';
import io from 'socket.io-client';

document.addEventListener('deviceready', () => {
    var connectionOptions =  {
        "force new connection" : true,
        "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
        "timeout" : 10000, //before connect_error and connect_timeout are emitted.
        "transports" : ["websocket"]
    };
    var socket =  io.connect('ws://localhost:8080', connectionOptions);
    store.dispatch({
        type: constants.SET_SOCKET,
        socket
    });
    store.dispatch(getTranslations());

    socket.on('connect', function(){
        store.dispatch(socketEvents());
        ReactDOM.render(
            <Provider store={store}>
                <Router>{routes}</Router>
            </Provider>,
            document.getElementById('app')
        );
    });
}, false);