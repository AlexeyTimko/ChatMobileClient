/**
 * Created by Timko on 03.03.2016.
 */
import React from 'react';
import smiles from '../../../../constants/smiles';
import Smile from '../chat/Smile';

export default class Message extends React.Component {
    static dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    constructor(props) {
        super(props);
        let l = this.props.message.text.length,
            size = (l > 19) ? ((l > 40) ? ((l > 50) ? 'huge' : 'vbig') : 'big') : '',
            deg = Math.floor(Math.random() * 30) - 15;

        this.state = {
            size,
            style: {
                transform: `rotate(${deg}deg)`
            },
            cloudType: Math.floor(Math.random() * 4) + 1
        }
    }

    parseMessage(message) {
        message = message.replace(/<[^>]+>/gi, '');
        _.forEach(smiles, function (value, key) {
            if (message.indexOf(key) >= 0) {
                message = message.split(key).join(`##${key}##`);
            }
        });
        message = _.map(message.split('##'), function (value, key) {
            if (smiles[value] !== undefined) {
                return <Smile key={key} type={value}/>;
            } else {
                return <span key={key}>{value}</span>;
            }
        });

        return message;
    }

    render() {
        let mes = this.props.message,
            date = new Date(mes.date),
            self = this.props.my?'self':'';
        return <div style={this.state.style} className={`cloud cloud-${this.state.cloudType} ${this.state.size} ${self}`}>
            <strong>{mes.user}</strong>{this.parseMessage(mes.text)}
            <small>{date.toLocaleString(localStorage.LANG, this.dateOptions)}</small>
        </div>;
    }
}