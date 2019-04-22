import React, { Component } from 'react';
import styles from './CircularColorPicker.module.scss';
import { ReactComponent as Circle } from '../assets/images/circle.svg';
import { ReactComponent as Arrow } from '../assets/images/arrow.svg';

class ColorSelector extends Component {
    containerRef;
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = { rotation: this.props.initialRotation }
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
        return this.calculateDegrees(this.getRelativeCoordinates(x, y)).degrees + 180
    }
    emitChange() {
        if (this.props.onChange) {
            this.props.onChange(this.state.rotation);
        }
    }
    handleTouchMove = (event) => {
        event.stopPropagation();
        const touch = event.touches[0];
        if (this.state.pageX && this.state.pageY) {
            const pageX = touch.pageX
            const pageY = touch.pageY
            const rotation = this.getRotation(pageX, pageY);
            this.emitChange();
            this.setState({ rotation, pageX, pageY })
        } else if (this.state.clientX && this.state.clientY) {
            const clientX = touch.clientX
            const clientY = touch.clientY
            const rotation = this.getRotation(clientX, clientY);
            this.emitChange();
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
            this.emitChange();
            this.setState({ rotation });
        }
    }
    render() {
        return <div ref={this.containerRef} className={styles.color_selector_container} style={{ transform: "rotate(" + this.state.rotation + "deg) scale(0.8)" }}>
            <Arrow className={styles.arrow} onTouchMove={this.handleTouchMove} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove} onClick={() => console.log(123)} />
            <Circle style={{ opacity: 0 }} />
        </div>
    }
}

function mix(a, b, v) {
    return (1 - v) * a + v * b;
}

function hueToRGB(H) {
    const S = 0.6;
    const V = 1;
    var V2 = V * (1 - S);
    var r = ((H >= 0 && H <= 60) || (H >= 300 && H <= 360)) ? V : ((H >= 120 && H <= 240) ? V2 : ((H >= 60 && H <= 120) ? mix(V, V2, (H - 60) / 60) : ((H >= 240 && H <= 300) ? mix(V2, V, (H - 240) / 60) : 0)));
    var g = (H >= 60 && H <= 180) ? V : ((H >= 240 && H <= 360) ? V2 : ((H >= 0 && H <= 60) ? mix(V2, V, H / 60) : ((H >= 180 && H <= 240) ? mix(V, V2, (H - 180) / 60) : 0)));
    var b = (H >= 0 && H <= 120) ? V2 : ((H >= 180 && H <= 300) ? V : ((H >= 120 && H <= 180) ? mix(V2, V, (H - 120) / 60) : ((H >= 300 && H <= 360) ? mix(V, V2, (H - 300) / 60) : 0)));

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

const ColorRenderer = (props) => {
    const { hue1, hue2, hue3 } = props;
    const color1 = hueToRGB(hue1)
    const color2 = hueToRGB(hue2)
    const color3 = hueToRGB(hue3)
    return <div className={styles.color_renderer} style={{ background: 'white' }}>
        <div className={styles.color} style={{ background: `linear-gradient(0deg, transparent, rgb(${color1.r},${color1.g},${color1.b}) )` }}></div>
        <div className={styles.color} style={{ background: `linear-gradient(120deg, transparent, rgb(${color2.r},${color2.g},${color2.b}) )` }}></div>
        <div className={styles.color} style={{ background: `linear-gradient(240deg , transparent, rgb(${color3.r},${color3.g},${color3.b}) )` }}></div>
    </div>
}

export default class CircularColorPicker extends Component {
    state = {
        hue1: 200,
        hue2: 220,
        hue3: 240,
    };
    render() {
        const { hue1, hue2, hue3 } = this.state;
        console.log({ hue1, hue2, hue3 })
        return <div className={styles.container}>
            <div className={styles.color_bar}>
                <div className={styles.selector_stack}>
                    <ColorSelector initialRotation={200} onChange={hue => this.setState({ hue1: hue })} />
                    <ColorSelector initialRotation={220} onChange={hue => this.setState({ hue2: hue })} />
                    <ColorSelector initialRotation={240} onChange={hue => this.setState({ hue3: hue })} />
                    <ColorRenderer hue1={hue1} hue2={hue2} hue3={hue3} />
                </div>
            </div>
        </div>
    }
}