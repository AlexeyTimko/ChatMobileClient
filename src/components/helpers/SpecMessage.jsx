import React, { PropTypes } from 'react'
import * as constants from '../../constants/'

export default class SpecMessage extends React.Component {
    static contextTypes = {
        store: PropTypes.any
    };

    componentDidMount() {
        setTimeout(()=>{
            this.context.store.dispatch({type: constants.MESSAGE_HIDE});
        },3000);
    }

    getIcon(type){
        switch (type) {
            case constants.MESSAGE_TYPE_DANGER:
                return 'ban-circle';
            case constants.MESSAGE_TYPE_WARNING:
                return 'warning-sign';
            case constants.MESSAGE_TYPE_INFO:
                return 'exclamation-sign';
            case constants.MESSAGE_TYPE_SUCCESS:
                return 'ok';
            default:
                return 'exclamation-sign';
        }
    }

    render() {
        let className = `alert alert-${this.props.type} text-center navbar navbar-fixed-bottom flash animated`;
        var icon = this.getIcon(this.props.type);
        return <div className={className}>
            <i className={`glyphicon glyphicon-${icon}`}></i>
            <i>&nbsp;{this.props.text}</i>
        </div>;
    }
}