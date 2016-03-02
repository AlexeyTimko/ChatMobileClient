/**
 * Created by Timko on 26.01.2016.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as constants from '../../../constants/';
import smiles from '../../../constants/smiles';
import Smile from '../../html/Smile';

class Chat extends React.Component {
    static contextTypes = {
        store: PropTypes.any,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            showSmiles: false
        };
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let message = this.state.message.trim();
        if(message != ''){
            this.props.socket.emit('add message', {message});
        }
        this.setState({
            message: ''
        });
    }

    componentDidMount() {
        document.body.scrollTop = document.body.scrollHeight;
    }

    parseMessage(message){
        message = message.replace(/<[^>]+>/gi, '');
        _.forEach(smiles, function(value, key) {
            if(message.indexOf(key) >= 0){
                message = message.split(key).join(`##${key}##`);
            }
        });
        message = _.map(message.split('##'), function(value, key){
            if(smiles[value] !== undefined){
                return <Smile key={key} type={value} />;
            }else{
                return <span key={key}>{value}</span>;
            }
        });

        return message;
    }

    toggleSmiles(event){
        event.preventDefault();
        this.setState({showSmiles: !this.state.showSmiles});
    }

    pickSmile(type){
        this.setState({
            message: this.state.message + type,
            showSmiles: false
        });
    }

    render() {
        let messages = _.map(this.props.messages, (mes, key) => {
            let date = new Date(mes.date),
                dateOptions = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    timezone: 'UTC',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                };
            return <p className={'text-primary ' + ((mes.userId == this.props.auth.user._id)?'self':'')}
                      key={key}>
                <strong>{mes.user}</strong>{this.parseMessage(mes.text)}<small>{date.toLocaleString(localStorage.LANG, dateOptions)}</small>
            </p>;
        });
        let smilesContent = _.map(smiles, (val, key) => {
            return <Smile onClick={() => {this.pickSmile(key)}} key={key} type={key} />;
        });
        return <div className="container" id="chat-container">
            {messages}
            <div className={'container smiles-container '+(this.state.showSmiles?'show':'hide')}>{smilesContent}</div>
            <form style={{position: 'fixed', bottom: 0, left: 0, right: 0}}
                  className="form-inline" onSubmit={::this.handleSubmit}>
                <div className="input-group chat-input">
                    <div className="input-group-btn">
                        <button onClick={::this.toggleSmiles} className="btn btn-warning glyphicon glyphicon-star-empty"/>
                    </div>
                    <input type="text" name="message" placeholder={this.props.translate.MESSAGE}
                           className="form-control"
                           value={this.state.message} onChange={::this.handleInputChange}/>
                    <div className="input-group-btn">
                        <button type="submit" className="btn btn-success glyphicon glyphicon-send"/>
                    </div>
                </div>
            </form>
        </div>;
    }
}
export default connect(state=> {
    return {
        translate: state.state.translations,
        auth: state.auth,
        messages: state.chat.messages,
        socket: state.state.socket
    }
})(Chat);