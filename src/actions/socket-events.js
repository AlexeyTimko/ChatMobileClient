import * as constants from '../constants/';
import Translate from '../helpers/translate';
import {store} from '../helpers/store';

export default function socketEvents() {
    var socket = store.getState().state.socket;
    return dispatch => {
        let auth = store.getState().auth;
        if(auth.authorized && auth.token){
            socket.emit('sign in', {token: auth.token});
        }
        socket.on('chat update', function(data){
            dispatch({
                type: constants.SET_MESSAGES,
                messages: data.items
            });
            var chatContainer = document.getElementById("chat-container");
            if(chatContainer){
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        });
    };
}
