/**
 * Created by Timko on 02.03.2016.
 */
import React from 'react';
import smiles from '../../../../constants/smiles';

export default class Smile extends React.Component {
    render() {
        return <img onClick={this.props.onClick} className="smile" src={smiles[this.props.type]}/> ;
    }
}