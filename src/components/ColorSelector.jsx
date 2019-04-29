import React, { Component } from "react";
import styles from "./CircularColorPicker.module.scss";
import { ReactComponent as Circle } from "../assets/images/circle.svg";
import { ReactComponent as Arrow } from "../assets/images/arrow.svg";

// TODO: Improve desktop draging UX

export default class ColorSelector extends Component {
  containerRef;
  arrowRef;
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.arrowRef = React.createRef();
    this.state = { rotation: this.props.initialRotation };
  }
  setColor(rotation) {
    this.setState({ rotation }, () => this.emitChange());
  }
  componentDidMount() {
    // this.arrowRef.current.addEventListener(
    //   "dragstart",
    //   function(e) {
    //     const crt = this.cloneNode(true);
    //     crt.style.opacity = 0;
    //     crt.style.visibility = "hidden";
    //     e.dataTransfer.setDragImage(crt, 0, 0);
    //   },
    //   false
    // );
  }
  getRelativeCoordinates(pageX, pageY) {
    const clientRect = this.containerRef.current.getBoundingClientRect();
    return {
      mousex: pageX - clientRect.left - clientRect.width / 2,
      mousey: pageY - clientRect.top - clientRect.height / 2
    };
  }
  calculateDegrees(coordinates) {
    const radians = Math.atan2(coordinates.mousex, coordinates.mousey);
    const degrees = radians * (180 / Math.PI) * -1;
    return { degrees, radians };
  }
  getRotation = (x, y) => {
    return (
      this.calculateDegrees(this.getRelativeCoordinates(x, y)).degrees + 180
    );
  };
  emitChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.rotation);
    }
  }
  handleTouchMove = event => {
    event.stopPropagation();
    const touch = event.touches[0];
    if (this.state.pageX && this.state.pageY) {
      const pageX = touch.pageX;
      const pageY = touch.pageY;
      const rotation = this.getRotation(pageX, pageY);
      this.setState({ rotation, pageX, pageY }, () => this.emitChange());
    } else if (this.state.clientX && this.state.clientY) {
      const clientX = touch.clientX;
      const clientY = touch.clientY;
      const rotation = this.getRotation(clientX, clientY);
      this.setState({ rotation, clientX, clientY }, () => this.emitChange());
    } else if (touch.pageX && touch.pageY) {
      const pageX = touch.pageX;
      const pageY = touch.pageY;
      this.setState({ pageX, pageY });
    } else if (touch.clientX && touch.clientY) {
      const clientX = touch.clientX;
      const clientY = touch.clientY;
      this.setState({ clientX, clientY });
    }
  };
  handleMouseDown = event => {
    this.setState({ isRotating: true });
  };
  handleMouseUp = event => {
    this.setState({ isRotating: false });
  };
  handleMouseMove = event => {
    if (this.state.isRotating) {
      const rotation = this.getRotation(event.pageX, event.pageY);
      this.setState({ rotation }, () => this.emitChange());
    }
  };
  // handleDrag = event => {
  //   const rotation = this.getRotation(event.pageX, event.pageY);
  //   this.emitChange();
  //   this.setState({ rotation });
  // };
  render() {
    const { base } = this.props;
    return (
      <div
        ref={this.containerRef}
        className={
          styles.color_selector_container +
          ` ${base ? styles.base : styles.float}`
        }
        style={{
          transform: "rotate(" + this.state.rotation + "deg) scale(0.8)"
        }}
      >
        <div
          className={styles.arrow}
          ref={this.arrowRef}
          onTouchMove={this.handleTouchMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        >
          <Arrow />
        </div>
        <Circle style={{ opacity: 0 }} />
      </div>
    );
  }
}
