import * as constants from '../constants/';
import Translate from '../helpers/translate';
import {store} from '../helpers/store';

export function getMessages() {
    var socket = store.getState().state.socket;
    return dispatch => {
        messagesRef.off("value");
        messagesRef.on("value", function(data) {
            dispatch({
                type: constants.SET_MESSAGES,
                messages: data.val()
            });
        }, function (errorObject) {
            dispatch({
                type: constants.MESSAGE_SHOW,
                messageType: constants.MESSAGE_TYPE_DANGER,
                text: "The read failed: " + errorObject.code
            });
        });
    };
}
