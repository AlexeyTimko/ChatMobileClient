import * as constants from '../constants/'

const initialState = {processing:false};
export default function (state = initialState, action) {
    switch (action.type) {
        case constants.AJAX_PROCESSING:
            return {
                ...state,
                processing:true
            };
        case constants.AJAX_FINISH:
            return {
                ...state,
                processing:false
            };
        case constants.AJAX_ERROR:
            return {
                ...state,
                processing:false
            };
        default:
            return state;
    }
};