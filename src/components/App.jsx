import React, { PropTypes } from 'react';
import {connect} from 'react-redux'
import SpecMessage from './helpers/SpecMessage'
import Loading from './helpers/Loading'

class App extends React.Component {
    static contextTypes = {
        store: PropTypes.any
    };

    render() {
        let specMessage = this.props.message.visible
            ? <SpecMessage visible={this.props.message.visible}
                           text={this.props.message.text}
                           type={this.props.message.type}/>
            : null;

        let loading = this.props.ajax.processing ? <Loading /> : null;

        return <div>
            {(this.props.translate != null && this.props.translate != 'process')?this.props.children:null}
            {specMessage}
            {loading}
        </div>;
    }
}
export default connect(state=> {
    return {
        message: state.message,
        ajax: state.ajax,
        translate: state.state.translations
    }
})(App);