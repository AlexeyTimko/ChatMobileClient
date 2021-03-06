import * as constants from '../constants/'

const initialState = {translations: null, socket: null, location: null};
export default function (state = initialState, action) {
    switch (action.type) {
        case constants.GET_TRANSLATIONS:
            return {
                ...state,
                translations: 'process'
            };
        case constants.SET_TRANSLATIONS:
            return {
                ...state,
                translations: action.translations
            };
        case constants.SET_SOCKET:
            return {
                ...state,
                socket: action.socket
            };
        case constants.SET_LOCATION:
            return {
                ...state,
                location: action.location
            };
        default:
            return state;
    }
};