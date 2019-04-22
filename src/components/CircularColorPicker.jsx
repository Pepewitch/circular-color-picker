import React, { Component } from 'react';
import styles from './CircularColorPicker.module.scss';
import { ReactComponent as Circle } from '../assets/images/circle.svg';
import { ReactComponent as Arrow } from '../assets/images/arrow.svg';

class ColorSelector extends Component {
    state = {
        rotation: 0,
    }
    containerRef;
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }
    getRelativeCoordinates(pageX, pageY) {
        const clientRect = this.containerRef.current.getBoundingClientRect()
        return {
            mousex: pageX - clientRect.left - (clientRect.width / 2),
            mousey: pageY - clientRect.top - (clientRect.height / 2)
        };
    };
    calculateDegrees(coordinates) {
        var radians = Math.atan2(coordinates.mousex, coordinates.mousey);
        var degrees = (radians * (180 / Math.PI) * -1);
        return { degrees, radians };
    };
    getRotation = (x, y) => {
        return this.calculateDegrees(this.getRelativeCoordinates(x, y)).degrees - 180
    }
    handleTouchMove = (event) => {
        const touch = event.touches[0];
        if (this.state.pageX && this.state.pageY) {
            const pageX = touch.pageX
            const pageY = touch.pageY
            const rotation = this.getRotation(pageX, pageY);
            this.setState({ rotation, pageX, pageY })
        } else if (this.state.clientX && this.state.clientY) {
            const clientX = touch.clientX
            const clientY = touch.clientY
            const rotation = this.getRotation(clientX, clientY);
            this.setState({ rotation, clientX, clientY })
        } else if (touch.pageX && touch.pageY) {
            const pageX = touch.pageX
            const pageY = touch.pageY
            this.setState({ pageX, pageY })
        } else if (touch.clientX && touch.clientY) {
            const clientX = touch.clientX
            const clientY = touch.clientY
            this.setState({ clientX, clientY })
        }
    }
    handleMouseDown = (event) => {
        this.setState({ isRotating: true })
    }
    handleMouseUp = (event) => {
        this.setState({ isRotating: false })
    }
    handleMouseMove = (event) => {
        if (this.state.isRotating) {
            const rotation = this.getRotation(event.pageX, event.pageY);
            this.setState({ rotation });
        }
    }
    render() {
        return <div ref={this.containerRef} className={styles.color_selector_container} style={{ transform: "rotate(" + this.state.rotation + "deg)" }}>
            <Arrow className={styles.arrow} onTouchMove={this.handleTouchMove} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove} />
            <Circle />
        </div>
    }
}

const ColorRenderer = (props) => {
    const {hue1, hue2, hue3} = props;
    return <div className={styles.color_renderer}>
        Render
    </div>
}

export default class CircularColorPicker extends Component {
    render() {
        return <div className={styles.container}>
            <div className={styles.color_bar}>
                <ColorSelector />
            </div>
        </div>
    }
}