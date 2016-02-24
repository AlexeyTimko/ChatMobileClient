import * as constants from '../constants/'

const initialState = {visible:false,type:null,text:null};
export default function (state = initialState, action) {
    switch (action.type) {
        case constants.MESSAGE_SHOW:
            return {
                ...state,
                visible: true,
                type: action.messageType,
                text: action.text
            };
        case constants.MESSAGE_HIDE:
            return {
                ...state,
                visible: false,
                type: null,
                text: null
            };
        default:
            return state;
    }
};