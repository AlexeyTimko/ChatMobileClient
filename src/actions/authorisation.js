import * as constants from '../constants/';
import Translate from '../helpers/translate';
import {store} from '../helpers/store';

export function signIn(user, redirect) {
    var socket = store.getState().state.socket;
    return dispatch => {
        dispatch({
            type: constants.AJAX_PROCESSING
        });
        socket.emit('sign in', user);
        //remove listeners if there are any
        socket.off('sign in success');
        socket.off('sign in error');
        //add listener on auth successful
        socket.on('sign in success', function(data){
            dispatch({
                type: constants.AJAX_FINISH
            });
            dispatch({
                type: constants.AUTHORISATION,
                token: data.token
            });
            redirect();
        });
        //add listener on auth fail
        socket.on('sign in error', function(data){
            dispatch({
                type: constants.AJAX_ERROR
            });
            dispatch({
                type: constants.MESSAGE_SHOW,
                messageType: constants.MESSAGE_TYPE_DANGER,
                text: Translate(data.message)
            });
        });
    };
}
export function signUp(user, redirect) {
    var socket = store.getState().state.socket;
    return dispatch => {
        dispatch({
            type: constants.AJAX_PROCESSING
        });
        socket.emit('sign up', user);
        //remove listeners if there are any
        socket.off('sign up success');
        socket.off('sign up error');
        //add listener on auth successful
        socket.on('sign up success', function(data){
            dispatch({
                type: constants.AJAX_FINISH
            });
            dispatch({
                type: constants.AUTHORISATION,
                token: data.token
            });
            redirect();
        });
        //add listener on auth fail
        socket.on('sign up error', function(data){
            dispatch({
                type: constants.AJAX_ERROR
            });
            dispatch({
                type: constants.MESSAGE_SHOW,
                messageType: constants.MESSAGE_TYPE_DANGER,
                text: Translate(data.message)
            });
        });
    };
}
