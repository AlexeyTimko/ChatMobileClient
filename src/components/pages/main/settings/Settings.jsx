/**
 * Created by Timko on 01.03.2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Settings extends React.Component {
    render() {
        return <div className="container">
            {this.props.children ||
            <ul className="nav nav-stacked">
                <li><Link to="/settings/language">{this.props.translate.LANGUAGE}</Link></li>
            </ul>}
        </div>;
    }
}
export default connect(state=> {
    return {
        translate: state.state.translations
    }
})(Settings);