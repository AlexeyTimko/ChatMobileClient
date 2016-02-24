import React from 'react'

export default class Radio extends React.Component {
    render() {
        return <div className="radio">
            <label>
                <input type="radio" name={this.props.name}
                       id={`${this.props.name}-${this.props.value}`}
                       value={this.props.value}
                       checked={this.props.checked}
                       onChange={this.props.onChange} />
                {this.props.label}
            </label>
        </div>;
    }
}