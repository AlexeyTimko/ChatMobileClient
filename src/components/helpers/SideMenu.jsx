/**
 * Created by Timko on 26.01.2016.
 */
import React from 'react';

export default class SideMenu extends React.Component {
    render() {
        return <div id="sidebar-wrapper" className={this.props.active?'visible':''}
                    onClick={this.props.onClick} style={this.props.style}>
            <ul className='sidebar-nav'>
                <li className="sidebar-brand"><a href="#">{this.props.name}</a></li>
                {this.props.items.map((item, i) => <li key={i}><a href="#" data-id={item}>{item}</a></li>)}
            </ul>
        </div>;
    }
}