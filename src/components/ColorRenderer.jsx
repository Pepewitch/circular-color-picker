import React from "react";
import styles from "./CircularColorPicker.module.scss";

// const mix = (a, b, v) => {
//   return (1 - v) * a + v * b;
// };

// const hueToRGB = (H, startLimit, stopLimit) => {
//   if ((H > startLimit && H < stopLimit) || !H) {
//     return undefined;
//   }
//   const S = 0.6;
//   const V = 1;
//   const V2 = V * (1 - S);
//   const r =
//     (H >= 0 && H <= 60) || (H >= 300 && H <= 360)
//       ? V
//       : H >= 120 && H <= 240
//       ? V2
//       : H >= 60 && H <= 120
//       ? mix(V, V2, (H - 60) / 60)
//       : H >= 240 && H <= 300
//       ? mix(V2, V, (H - 240) / 60)
//       : 0;
//   const g =
//     H >= 60 && H <= 180
//       ? V
//       : H >= 240 && H <= 360
//       ? V2
//       : H >= 0 && H <= 60
//       ? mix(V2, V, H / 60)
//       : H >= 180 && H <= 240
//       ? mix(V, V2, (H - 180) / 60)
//       : 0;
//   const b =
//     H >= 0 && H <= 120
//       ? V2
//       : H >= 180 && H <= 300
//       ? V
//       : H >= 120 && H <= 180
//       ? mix(V2, V, (H - 120) / 60)
//       : H >= 300 && H <= 360
//       ? mix(V, V2, (H - 300) / 60)
//       : 0;

//   return {
//     r: Math.round(r * 255),
//     g: Math.round(g * 255),
//     b: Math.round(b * 255)
//   };
// };

const hueToRGB = (H, startLimit, stopLimit) => {
  if ((H > startLimit && H < stopLimit) || !H) {
    return undefined;
  }
  if (H >= 0 && H < 10) {
    return { r: 238, g: 72, b: 151 };
  } else if (H >= 10 && H < 20) {
    return { r: 234, g: 66, b: 133 };
  } else if (H >= 20 && H < 30) {
    return { r: 232, g: 63, b: 119 };
  } else if (H >= 30 && H < 40) {
    return { r: 228, g: 57, b: 102 };
  } else if (H >= 40 && H < 50) {
    return { r: 218, g: 62, b: 103 };
  } else if (H >= 50 && H < 60) {
    return { r: 187, g: 89, b: 143 };
  } else if (H >= 60 && H < 70) {
    return { r: 163, g: 115, b: 181 };
  } else if (H >= 70 && H < 80) {
    return { r: 134, g: 141, b: 220 };
  } else if (H >= 80 && H < 90) {
    return { r: 123, g: 144, b: 225 };
  } else if (H >= 90 && H < 100) {
    return { r: 118, g: 133, b: 209 };
  } else if (H >= 100 && H < 110) {
    return { r: 115, g: 123, b: 195 };
  } else if (H >= 110 && H < 120) {
    return { r: 112, g: 113, b: 181 };
  } else if (H >= 120 && H < 130) {
    return { r: 108, g: 103, b: 166 };
  } else if (H >= 130 && H < 135) {
    return { r: 105, g: 95, b: 155 };
  } else if (H >= 135 && H < 225) {
    return { r: 255, g: 255, b: 255 };
  } else if (H >= 225 && H < 230) {
    return { r: 63, g: 233, b: 169 };
  } else if (H >= 230 && H < 240) {
    return { r: 96, g: 230, b: 148 };
  } else if (H >= 240 && H < 250) {
    return { r: 132, g: 227, b: 127 };
  } else if (H >= 250 && H < 260) {
    return { r: 168, g: 224, b: 105 };
  } else if (H >= 260 && H < 270) {
    return { r: 206, g: 221, b: 81 };
  } else if (H >= 270 && H < 280) {
    return { r: 243, g: 217, b: 57 };
  } else if (H >= 280 && H < 290) {
    return { r: 251, g: 186, b: 100 };
  } else if (H >= 290 && H < 300) {
    return { r: 252, g: 155, b: 146 };
  } else if (H >= 300 && H < 310) {
    return { r: 254, g: 121, b: 195 };
  } else if (H >= 310 && H < 320) {
    return { r: 254, g: 95, b: 230 };
  } else if (H >= 320 && H < 330) {
    return { r: 251, g: 90, b: 214 };
  } else if (H >= 330 && H < 340) {
    return { r: 248, g: 86, b: 197 };
  } else if (H >= 340 && H < 350) {
    return { r: 245, g: 82, b: 182 };
  } else if (H >= 350 && H < 360) {
    return { r: 241, g: 76, b: 166 };
  } else {
    return undefined;
  }
};
const getGradDegree = (angle1, angle2) =>
  (Math.floor((angle1 + angle2) / 2) + 270) % 360;

const getBackgroundColor = (c1, c2, c3, angle1, angle2, angle3) => {
  if (c1 && c2 && c3) {
    const a1 = 0.6;
    const a2 = 0.8;
    const a3 = 1;
    return `linear-gradient(0deg, rgba(${c1.r},${c1.g},${c1.b}, 0), rgba(${
      c1.r
    },${c1.g},${c1.b}, ${a1})),linear-gradient(120deg, rgba(${c2.r},${c2.g},${
      c2.b
    }, 0), rgba(${c2.r},${c2.g},${c2.b}, ${a2})),linear-gradient(240deg, rgba(${
      c3.r
    },${c3.g},${c3.b}, 0), rgba(${c3.r},${c3.g},${c3.b}, ${a3})) `;
  } else if (c1 && c2) {
    const deg = getGradDegree(angle1, angle2);
    const t1 = angle1 > angle2 ? c1 : c2;
    const t2 = angle1 > angle2 ? c2 : c1;
    return `linear-gradient(${deg}deg, rgba(${t1.r},${t1.g},${t1.b},1), rgba(${
      t2.r
    },${t2.g},${t2.b},1))`;
  } else if (c1 && c3) {
    const deg = getGradDegree(angle1, angle3);
    const t1 = angle1 > angle3 ? c1 : c3;
    const t2 = angle1 > angle3 ? c3 : c1;
    return `linear-gradient(${deg}deg, rgba(${t1.r},${t1.g},${t1.b},1), rgba(${
      t2.r
    },${t2.g},${t2.b},1))`;
  } else if (c3 && c2) {
    const deg = getGradDegree(angle3, angle2);
    const t1 = angle3 > angle2 ? c3 : c2;
    const t2 = angle3 > angle2 ? c2 : c3;
    return `linear-gradient(${deg}deg, rgba(${t1.r},${t1.g},${t1.b},1), rgba(${
      t2.r
    },${t2.g},${t2.b},1))`;
  } else if (c1 || c2 || c3) {
    const t1 = c1 || c2 || c3;
    return `rgba(${t1.r},${t1.g},${t1.b},1)`;
  } else {
    return "transparent";
  }
};

const ColorRenderer = props => {
  const { hue1, hue2, hue3, startLimit, stopLimit } = props;
  const color1 = hueToRGB(hue1, startLimit, stopLimit);
  const color2 = hueToRGB(hue2, startLimit, stopLimit);
  const color3 = hueToRGB(hue3, startLimit, stopLimit);
  const border_color = "#ADADAD";
  return (
    <div
      className={`${styles.color_renderer} ${styles.float}`}
      style={{ background: "white", border: `0.5px solid ${border_color}` }}
    >
      <div
        className={styles.color}
        style={{
          background: getBackgroundColor(
            color1,
            color2,
            color3,
            hue1,
            hue2,
            hue3
          )
        }}
      />
    </div>
  );
};

export default ColorRenderer;
