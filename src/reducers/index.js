import { combineReducers } from 'redux'
import state from './state'
import auth from './auth'
import chat from './chat'
import ajax from './ajax'
import message from './message'

export default combineReducers({
    state,
    auth,
    chat,
    ajax,
    message
})