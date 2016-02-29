import * as constants from '../constants/';
import Translate from '../helpers/translate';
import {store} from '../helpers/store';

export function processResponse(dispatch, data, redirect = ()=>{}){
    if (data.state == 'success') {
        dispatch({
            type: constants.AJAX_FINISH
        });
        dispatch({
            type: constants.AUTHORISATION,
            user: data.user
        });
        // set local token to sign in without entering credentials
        localStorage.token = data.user.token;
        redirect();
    } else {
        dispatch({
            type: constants.AJAX_ERROR
        });
        dispatch({
            type: constants.MESSAGE_SHOW,
            messageType: constants.MESSAGE_TYPE_DANGER,
            text: Translate(data.message)
        });
    }
}

export function signIn(user, redirect) {
    var socket = store.getState().state.socket;
    return dispatch => {
        dispatch({
            type: constants.AJAX_PROCESSING
        });
        socket.emit('sign in', user, (data) => {
            processResponse(dispatch, data, redirect);
        });
    };
}
export function signUp(user, redirect) {
    var socket = store.getState().state.socket;
    return dispatch => {
        dispatch({
            type: constants.AJAX_PROCESSING
        });
        socket.emit('sign up', user, (data) => {
            processResponse(dispatch, data, redirect);
        });
    };
}
