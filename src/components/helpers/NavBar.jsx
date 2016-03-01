/**
 * Created by Timko on 01.03.2016.
 */
import React from 'react';
import {Link} from 'react-router';

export default class NavBar extends React.Component {
    goBack(event) {
        event.preventDefault();
        this.props.history.goBack();
    }

    render() {
        return <nav className='navbar navbar-fixed-top bg-primary'>
            {this.props.history.isActive('/chat')
                || <span onClick={::this.goBack} href="#" className="navbar-brand glyphicon glyphicon-arrow-left"/> }
            <span href="#" className="navbar-brand">{this.props.title}</span>
            <Link to="/settings" className="navbar-brand pull-right glyphicon glyphicon-cog"/>
        </nav>;
    }
}