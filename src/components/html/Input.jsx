/**
 * Created by Timko on 25.01.2016.
 */
import React from 'react'

export default class Input extends React.Component {
    render() {
        return <div className="form-group">
            <label htmlFor={this.props.name}>{this.props.label} </label>
            <div className={this.props.prefix || this.props.postfix ? "input-group":''}>
                {this.props.prefix?<span className="input-group-addon">{this.props.prefix}</span>:null}
                <input className="form-control" type={this.props.type} name={this.props.name} id={this.props.name}
                       value={this.props.value} onChange={this.props.onChange}/>
                {this.props.postfix?<span className="input-group-addon">{this.props.postfix}</span>:null}
            </div>
        </div>;
    }
}