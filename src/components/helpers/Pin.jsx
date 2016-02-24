/**
 * Created by Timko on 27.01.2016.
 */
import React from 'react';

export default class Pin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pin:'',
            numbers: this.getNumbers()
        };
    }

    getNumbers(){
        let o = new Array(10);
        o = [...o.keys()];
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    handleTyping(event){
        if(this.state.pin.length < 4){
            switch (event.target.dataset.num){
                case 'reset':
                    this.setState({pin: ''});
                    break;
                case 'clear':
                    this.setState({pin: this.state.pin.substring(0, this.state.pin.length - 1)});
                    break;
                default:
                    let pin = this.state.pin + event.target.dataset.num;
                    this.setState({pin});
                    if(pin.length == 4){
                        this.setState({pin:''});
                        this.props.onEnterFinish(pin);
                    }

            }
            this.setState({numbers:this.getNumbers()});
        }
    }

    render() {
        let numbers = this.state.numbers;
        return <div className="pin-container">
            <div className="navbar navbar-header navbar-default">
                <span className="navbar-brand"><i className="glyphicon glyphicon-lock"></i><span> {this.props.header}</span></span>
            </div>
            <table className="table table-bordered table-input">
                <tbody>
                <tr>
                    {[0,0,0,0].map( (o, i) => <td key={i} className={i == this.state.pin.length?'active':''}>{this.state.pin[i] !== undefined?'●':''}</td> )}
                </tr>
                </tbody>
            </table>
            <table className="table table-bordered table-buttons" onClick={::this.handleTyping}>
                <tbody>
                {[0,0,0].map( (r,k) => <tr key={k}>{numbers.splice(0,3).map( (i, j) => <td data-num={i} key={j}>{i}</td> )}</tr>)}
                <tr>
                    <td data-num="reset"><i data-num="reset" className="glyphicon glyphicon-remove"/></td>
                    <td data-num={numbers[0]}>{numbers[0]}</td>
                    <td data-num="clear"><i data-num="clear" className="glyphicon glyphicon-arrow-left"/></td>
                </tr>
                </tbody>
            </table>
        </div>;
    }
}