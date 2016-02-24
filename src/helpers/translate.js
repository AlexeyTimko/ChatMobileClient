/**
 * Created by Timko on 28.01.2016.
 */
import {store} from './store'

export default function translate(key){
    let translations = store.getState().state.translations;

    return (translations[key] === undefined)?key:translations[key];
}