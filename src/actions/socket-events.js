import * as constants from '../constants/';
import Translate from '../helpers/translate';
import {store} from '../helpers/store';
import {processResponse} from './authorisation';
import * as router from 'react-router';

var processLocation = (socket, dispatch, position) => {
    let lat = position.coords.latitude.toString();
    lat = lat.substr(0, lat.indexOf('.') + 4);
    let lon = position.coords.longitude.toString();
    lon = Math.floor(lon.substr(0, lon.indexOf('.') + 4) * 1000 / 2) * 2 /1000;
    let location = '50.430:30.386'||`${lat}:${lon}`;
    if (location != store.getState().state.location) {
        dispatch({
            type: constants.SET_LOCATION,
            location
        });
        socket.emit('set location', {location: store.getState().state.location});
    }
};

export default function socketEvents() {
    var socket = store.getState().state.socket;
    return dispatch => {
        if (store.getState().state.location) {
            socket.emit('set location', {location: store.getState().state.location});
        }
        navigator.geolocation.watchPosition(
            (position) => {
                processLocation(socket, dispatch, position)
            },
            (error) => {
                dispatch({
                    type: constants.MESSAGE_SHOW,
                    messageType: constants.MESSAGE_TYPE_DANGER,
                    text: error.message
                });
            },
            {maximumAge: 3000, enableHighAccuracy: false}
        );

        let auth = store.getState().auth;
        if (auth.user.token) {
            socket.emit('sign in', {token: auth.user.token}, data => {
                processResponse(dispatch, data);
            });
        }
        socket.on('chat update', function (data) {
            dispatch({
                type: constants.SET_MESSAGES,
                messages: data.items
            });
            document.body.scrollTop = document.body.scrollHeight;
        });
    };
}
