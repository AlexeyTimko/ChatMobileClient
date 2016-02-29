import * as constants from '../constants/'

var getTranslations = function(dispatch){
    dispatch({
        type: constants.GET_TRANSLATIONS
    });
    dispatch({
        type: constants.AJAX_PROCESSING
    });
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `i18n/${localStorage.LANG||'en'}/strings.json`, false);
    xhr.send();
    if (xhr.status != 200) {
        dispatch({
            type: constants.AJAX_ERROR
        });
        dispatch({
            type: constants.MESSAGE_SHOW,
            messageType: constants.MESSAGE_TYPE_DANGER,
            text: `i18n/${localStorage.LANG}/strings.json - ` + xhr.status + ': ' + xhr.statusText
            //text: 'Translate not found'
        });
    } else {
        dispatch({
            type: constants.AJAX_FINISH
        });
        dispatch({
            type: constants.SET_TRANSLATIONS,
            translations:JSON.parse(xhr.responseText)
        });
    }
};

export default function setTranslations() {
    return dispatch => {
        if(localStorage.LANG === undefined){
            if(navigator.globalization !== undefined){
                navigator.globalization.getPreferredLanguage(
                    function (language) {
                        localStorage.LANG = language.value.substr(0, 2);
                        if(['ru','en'].indexOf(localStorage.LANG) < 0){
                            localStorage.LANG = 'en';
                        }
                        getTranslations(dispatch);
                    },
                    function () {localStorage.LANG = 'en';}
                );
            }else{
                localStorage.LANG = 'en';
            }
        }
        getTranslations(dispatch);
   };
}