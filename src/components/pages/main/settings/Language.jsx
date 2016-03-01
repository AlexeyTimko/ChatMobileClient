/**
 * Created by Timko on 01.03.2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import setTranslations from '../../../../actions/translations';

class Language extends React.Component {
    static contextTypes = {
        store: React.PropTypes.any
    };

    handleClick(event, language) {
        event.preventDefault();
        this.context.store.dispatch(setTranslations(language));
    };

    render() {
        return <ul className="nav nav-stacked">
            <li><Link onClick={event => {this.handleClick(event, 'en')}}
                      to="#">{this.props.translate.ENGLISH}</Link></li>
            <li><Link onClick={event => {this.handleClick(event, 'ru')}}
                      to="#">{this.props.translate.RUSSIAN}</Link></li>
        </ul>;
    }
}
export default connect(state=> {
    return {
        translate: state.state.translations
    }
})(Language);