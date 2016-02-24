/**
 * Created by Timko on 25.01.2016.
 */
import React from 'react'

export default class CheckBox extends React.Component {
    render() {
        return <div className="form-group">
            <input type="checkbox" id={this.props.name} name={this.props.name}
                   checked={this.props.checked} onChange={this.props.onChange} />
            <label htmlFor={this.props.name}> {this.props.label}</label>
        </div>;
    }
}