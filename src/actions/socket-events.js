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

        navigator.geolocation.watchPosition((position) => {
            let location = position.coords.latitude.toString().substr(0,6) + ':' + position.coords.longitude.toString().substr(0,6);
            if(location != store.getState().state.location){
                dispatch({
                    type: constants.SET_LOCATION,
                    location
                });
                socket.emit('set location', {location: store.getState().state.location});
            }
        });
    };
}
