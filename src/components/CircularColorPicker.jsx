import React, { Component } from "react";
import styles from "./CircularColorPicker.module.scss";
import ColorSelector from "./ColorSelector";
import ColorRenderer from "./ColorRenderer";

export default class CircularColorPicker extends Component {
  state = {
    hue1: 200,
    hue2: 220,
    hue3: 240
  };
  render() {
    const { hue1, hue2, hue3 } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.color_bar}>
          <div className={styles.selector_stack}>
            <ColorSelector
              base
              initialRotation={200}
              onChange={hue => this.setState({ hue1: hue })}
            />
            <ColorSelector
              initialRotation={220}
              onChange={hue => this.setState({ hue2: hue })}
            />
            <ColorSelector
              initialRotation={240}
              onChange={hue => this.setState({ hue3: hue })}
            />
            <ColorRenderer
              hue1={hue1}
              hue2={hue2}
              hue3={hue3}
              startLimit={150}
              stopLimit={240}
            />
          </div>
        </div>
      </div>
    );
  }
}
