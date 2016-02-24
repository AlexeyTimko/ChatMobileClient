/**
 * Created by Timko on 25.01.2016.
 */
import React from 'react';

export default class Pagination extends React.Component {
    render() {
        if (this.props.total <= 1) {
            return null;
        }
        let pages = [];
        for(let i = 1; i <= this.props.total; i++){
            if(Math.abs(parseInt(this.props.active) - i) > 2){
                continue;
            }
            pages.push(<li key={i} className={(i == this.props.active)?'active':''}><a href="#" data-page={i}>{i}</a></li>);
        }
        let prev = (this.props.active == 1)?1:this.props.active-1;
        let next = (this.props.active == this.props.total)?this.props.total:parseInt(this.props.active)+1;
        return <ul className="pagination" onClick={this.props.onChange}>
            <li className={(this.props.active == 1)?'disabled':''}>
                <a href="#" className="glyphicon glyphicon-backward" data-page={prev}></a>
            </li>
            {pages}
            <li className={(this.props.active == this.props.total)?'disabled':''}>
                <a href="#" className="glyphicon glyphicon-forward" data-page={next}></a>
            </li>
        </ul>;
    }
}
