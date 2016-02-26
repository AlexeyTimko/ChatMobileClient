import * as constants from '../constants/';
import Translate from '../helpers/translate';
import {store} from '../helpers/store';

export function signIn(user, redirect) {
    var socket = store.getState().state.socket;
    return dispatch => {
        dispatch({
            type: constants.AJAX_PROCESSING
        });
        socket.emit('sign in', user, function (data) {
            if (data.state == 'success') {
                dispatch({
                    type: constants.AJAX_FINISH
                });
                dispatch({
                    type: constants.AUTHORISATION,
                    token: data.token
                });
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
        });
    };
}
export function signUp(user, redirect) {
    var socket = store.getState().state.socket;
    return dispatch => {
        dispatch({
            type: constants.AJAX_PROCESSING
        });
        socket.emit('sign up', user, function (data) {
            if (data.state == 'success') {
                dispatch({
                    type: constants.AJAX_FINISH
                });
                dispatch({
                    type: constants.AUTHORISATION,
                    token: data.token
                });
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
        });
    };
}
