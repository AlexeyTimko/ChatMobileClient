import * as constants from '../constants/'

const initialState = {
    messages: []
};
export default function (state = initialState, action) {
    switch (action.type) {
        case constants.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            };
        default:
            return state;
    }
};