import React from "react";
import styles from "./CircularColorPicker.module.scss";

const mix = (a, b, v) => {
  return (1 - v) * a + v * b;
};

const hueToRGB = (H, startLimit, stopLimit) => {
  if ((H > startLimit && H < stopLimit) || !H) {
    return undefined;
  }
  const S = 0.6;
  const V = 1;
  const V2 = V * (1 - S);
  const r =
    (H >= 0 && H <= 60) || (H >= 300 && H <= 360)
      ? V
      : H >= 120 && H <= 240
      ? V2
      : H >= 60 && H <= 120
      ? mix(V, V2, (H - 60) / 60)
      : H >= 240 && H <= 300
      ? mix(V2, V, (H - 240) / 60)
      : 0;
  const g =
    H >= 60 && H <= 180
      ? V
      : H >= 240 && H <= 360
      ? V2
      : H >= 0 && H <= 60
      ? mix(V2, V, H / 60)
      : H >= 180 && H <= 240
      ? mix(V, V2, (H - 180) / 60)
      : 0;
  const b =
    H >= 0 && H <= 120
      ? V2
      : H >= 180 && H <= 300
      ? V
      : H >= 120 && H <= 180
      ? mix(V2, V, (H - 120) / 60)
      : H >= 300 && H <= 360
      ? mix(V, V2, (H - 300) / 60)
      : 0;

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

const ThreeColor = ({ color1, color2, color3 }) => {
  return (
    <div
      className={`${styles.color_renderer} ${styles.float}`}
      style={{ background: "white" }}
    >
      <div
        className={styles.color}
        style={{
          background: `linear-gradient(0deg, transparent, rgba(${color1.r},${
            color1.g
          },${color1.b}, 0.65), rgba(${color1.r},${color1.g},${color1.b}, 1) )`
        }}
      />
      <div
        className={styles.color}
        style={{
          background: `linear-gradient(120deg, transparent, rgba(${color2.r},${
            color2.g
          },${color2.b}, 0.2), rgba(${color2.r},${color2.g},${color2.b}, 1) )`
        }}
      />
      <div
        className={styles.color}
        style={{
          background: `linear-gradient(240deg, transparent, rgba(${color3.r},${
            color3.g
          },${color3.b}, 0.15), rgba(${color3.r},${color3.g},${color3.b}, 1) )`
        }}
      />
    </div>
  );
};

const TwoColor = ({ color1, color2 }) => {
  return (
    <div
      className={`${styles.color_renderer} ${styles.float}`}
      style={{ background: "white" }}
    >
      <div
        className={styles.color}
        style={{
          background: `rgba(${color1.r},${color1.g},${color1.b}, 1)`
        }}
      />
      <div
        className={styles.color}
        style={{
          background: `linear-gradient(135deg, transparent, rgba(${color2.r},${
            color2.g
          },${color2.b}, 0.5), rgba(${color2.r},${color2.g},${color2.b}, 1) )`
        }}
      />
    </div>
  );
};

const ColorRenderer = props => {
  const { hue1, hue2, hue3, startLimit, stopLimit } = props;
  const color1 = hueToRGB(hue1, startLimit, stopLimit);
  const color2 = hueToRGB(hue2, startLimit, stopLimit);
  const color3 = hueToRGB(hue3, startLimit, stopLimit);
  if (color1 && color2 && color3) {
    return <ThreeColor color1={color1} color2={color2} color3={color3} />;
  } else if (color1 && color2) {
    return <TwoColor color1={color1} color2={color2} />;
  } else if (color1 && color3) {
    return <TwoColor color1={color1} color2={color3} />;
  } else if (color2 && color3) {
    return <TwoColor color1={color2} color2={color3} />;
  } else if (color1 || color2 || color3) {
    const c1 = color1 || color2 || color3;
    return (
      <div
        className={`${styles.color_renderer} ${styles.float}`}
        style={{ background: "white" }}
      >
        <div
          className={styles.color}
          style={{
            background: `rgba(${c1.r},${c1.g},${c1.b}, 1)`
          }}
        />
      </div>
    );
  } else {
    return (
      <div
        className={`${styles.color_renderer} ${styles.float}`}
        style={{ background: "white" }}
      >
        <div
          className={styles.color}
          style={{
            background: `transparent`
          }}
        />
      </div>
    );
  }
};

export default ColorRenderer;
