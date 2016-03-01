/**
 * Created by Timko on 25.01.2016.
 */
import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import NavBar from '../../helpers/NavBar';

export default class Main extends React.Component {
    getTitle() {
        let title = this.props.translate[this.props.children.props.route.path.toUpperCase()];
        if (this.props.history.isActive('/chat')) {
            title += ` (${this.props.location})`;
        }

        return title;
    }

    render() {
        return <div>
            <NavBar title={::this.getTitle()} history={this.props.history} />
            {this.props.children}
        </div>;
    }
}
export default connect(state=> {
    return {
        translate: state.state.translations,
        location: state.state.location
    }
})(Main);