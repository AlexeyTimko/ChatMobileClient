/**
 * Created by Timko on 05.02.2016.
 */
import React from 'react';

export default class Swiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialTouch: null,
            swipeLength: 50
        };
    }

    calculateMove(touch) {
        return {
            x: touch.clientX - this.state.initialTouch.x,
            y: touch.clientY - this.state.initialTouch.y
        }
    }

    handleTouchStart(event) {
        if (!this.state.initialTouch) {
            this.setState({initialTouch: {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            }});
        }
    }

    handleTouchMove(event) {
        if (this.state.initialTouch && this.props.onMove != undefined) {
            this.props.onMove(this.calculateMove(event.touches[0]));
        }
    }

    handleTouchEnd(event) {
        if (this.state.initialTouch) {
            let move = this.calculateMove(event.touches[0]);
            console.log(move);
            if (Math.abs(move.x) >= Math.abs(move.y) && Math.abs(move.x) >= this.state.swipeLength) {
                if (move.x > 0) {
                    if (this.props.onSwipeRight !== undefined) {
                        this.props.onSwipeRight();
                    }
                } else {
                    if (this.props.onSwipeLeft !== undefined) {
                        this.props.onSwipeLeft();
                    }
                }
            } else if (Math.abs(move.x) < Math.abs(move.y) && Math.abs(move.y) >= this.state.swipeLength) {
                if (move.y > 0) {
                    if (this.props.onSwipeDown !== undefined) {
                        this.props.onSwipeDown();
                    }
                } else {
                    if (this.props.onSwipeUp !== undefined) {
                        this.props.onSwipeUp();
                    }
                }
            }
            if (this.props.onMoveEnd !== undefined) {
                this.props.onMoveEnd(move);
            }
        }
        this.setState({initialTouch: null});
    }

    render() {
        return <div onTouchStart={::this.handleTouchStart}
                    onTouchMove={::this.handleTouchMove}
                    onTouchEnd={::this.handleTouchEnd}
                    className={this.props.className}
        >{this.props.children}</div>;
    }
}