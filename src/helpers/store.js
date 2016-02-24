/**
 * Created by Timko on 25.01.2016.
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index'

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

export const store = createStoreWithMiddleware(reducer);
