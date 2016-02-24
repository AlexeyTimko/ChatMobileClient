import * as constants from '../constants/';

const initialState = {
    authorized: false,
    token: null
};
export default function (state = initialState, action) {
    switch (action.type) {
        case constants.AUTHORISATION:
            return {
                ...state,
                authorized: true,
                token: action.token
            };
        default:
            return state;
    }
};