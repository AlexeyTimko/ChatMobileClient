/**
 * Created by Timko on 25.01.2016.
 */
import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import Chat from './Chat';

class Main extends React.Component {
    static contextTypes = {
        store: PropTypes.any,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>
            <nav className='navbar navbar-fixed-top navbar-inverse'>
                <i className="navbar-brand pull-right glyphicon glyphicon-cog"/>
                <Link className="navbar-brand pull-right glyphicon glyphicon-home" to="/"/>
            </nav>
            {this.props.children}
            <Chat/>
        </div>;
    }
}
export default connect(state=> {
    return {
        state: state.state,
        translate: state.state.translations
    }
})(Main);