import * as constants from '../constants/';

const initialState = {
    authorized: false,
    user: {token: localStorage.token || null}
};
export default function (state = initialState, action) {
    switch (action.type) {
        case constants.AUTHORISATION:
            return {
                ...state,
                authorized: true,
                user: action.user
            };
        default:
            return state;
    }
};