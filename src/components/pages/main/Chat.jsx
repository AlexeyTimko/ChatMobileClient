/**
 * Created by Timko on 26.01.2016.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as constants from '../../../constants/';


class Chat extends React.Component {
    static contextTypes = {
        store: PropTypes.any,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.socket.emit('add message', {message: this.state.message});
        this.setState({
            message: ''
        });
    }

    render() {
        let messages = _.map(this.props.messages, function(mes, key){
            return <p key={key}><strong>{mes.user}</strong>: {mes.text}</p>;
        });
        return <div className="container" id="chat-container">
            {messages}
            <form style={{position: 'fixed', bottom: 0, left: 0, right: 0}}
                  className="form-inline" onSubmit={::this.handleSubmit}>
                <div className="input-group chat-input">
                    <input type="text" name="message" placeholder={this.props.translate.MESSAGE} className="form-control"
                           value={this.state.message} onChange={::this.handleInputChange} />
                    <div className="input-group-btn">
                        <button type="submit" className="btn btn-primary glyphicon glyphicon-send"/>
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