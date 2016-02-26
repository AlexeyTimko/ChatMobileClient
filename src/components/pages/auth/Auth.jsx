import React, { PropTypes } from 'react';
import {connect} from 'react-redux'
import {signIn, signUp} from '../../../actions/authorisation';
import Input from '../../html/Input';

class Auth extends React.Component {

    static contextTypes = {
        store: PropTypes.any,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            name: '',
            nickname: '',
            password: ''
        };
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { history, store } = this.context;

        switch (this.state.tab) {
            case 1:
                store.dispatch(signIn(this.state, () => {
                    history.pushState({}, '/')
                }));
                break;
            case 2:
                store.dispatch(signUp(this.state, () => {
                    history.pushState({}, '/')
                }));
                break;
        }
    }

    render() {
        return <div className="container">
            <ul className="nav nav-tabs">
                <li className={this.state.tab==1?'active':''}>
                    <a href="#" onClick={() => {this.setState({tab:1})}}>{this.props.translate.SIGN_IN}</a>
                </li>
                <li className={this.state.tab==2?'active':''}>
                    <a href="#" onClick={() => {this.setState({tab:2})}}>{this.props.translate.SIGN_UP}</a>
                </li>
            </ul>
            <form onSubmit={::this.handleSubmit}>
                <Input type="text" name="name" label={this.props.translate.NAME}
                       value={this.state.user} onChange={::this.handleInputChange}/>
                {this.state.tab == 2
                    ? <Input type="text" name="nickname" label={this.props.translate.NICKNAME}
                             value={this.state.nickname} onChange={::this.handleInputChange}/>
                    : null}
                <Input type="password" name="password" label={this.props.translate.PASSWORD}
                       value={this.state.password} onChange={::this.handleInputChange}/>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg btn-block"
                            disabled={this.state.name.length < 2
                            || this.state.password.length < 6
                            || (this.state.nickname.length < 2 && this.state.tab == 2)}>
                        {this.state.tab == 1 ? this.props.translate.ENTER : this.props.translate.SIGN_UP}
                    </button>
                </div>
            </form>
        </div>;
    };
}
export default connect(state=> {
    return {
        translate: state.state.translations,
        location: state.state.location
    }
})(Auth);