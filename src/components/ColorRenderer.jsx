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
  if (H >= 135 && H <= 225) {
    return { r: 255, g: 255, b: 255 };
  }
  const color = [
    { h: 5, r: 238, g: 72, b: 151 },
    { h: 15, r: 234, g: 66, b: 133 },
    { h: 25, r: 232, g: 63, b: 119 },
    { h: 35, r: 228, g: 57, b: 102 },
    { h: 45, r: 218, g: 62, b: 103 },
    { h: 55, r: 187, g: 89, b: 143 },
    { h: 65, r: 163, g: 115, b: 181 },
    { h: 75, r: 134, g: 141, b: 220 },
    { h: 85, r: 123, g: 144, b: 225 },
    { h: 95, r: 118, g: 133, b: 209 },
    { h: 105, r: 115, g: 123, b: 195 },
    { h: 115, r: 112, g: 113, b: 181 },
    { h: 125, r: 108, g: 103, b: 166 },
    { h: 135, r: 105, g: 95, b: 155 },
    { h: 225, r: 63, g: 233, b: 169 },
    { h: 235, r: 96, g: 230, b: 148 },
    { h: 245, r: 132, g: 227, b: 127 },
    { h: 255, r: 168, g: 224, b: 105 },
    { h: 265, r: 206, g: 221, b: 81 },
    { h: 275, r: 243, g: 217, b: 57 },
    { h: 285, r: 251, g: 186, b: 100 },
    { h: 295, r: 252, g: 155, b: 146 },
    { h: 305, r: 254, g: 121, b: 195 },
    { h: 315, r: 254, g: 95, b: 230 },
    { h: 325, r: 251, g: 90, b: 214 },
    { h: 335, r: 248, g: 86, b: 197 },
    { h: 345, r: 245, g: 82, b: 182 },
    { h: 355, r: 241, g: 76, b: 166 }
  ];
  const index =
    H < 5
      ? color.length - 1
      : color.findIndex(e => H - e.h >= 0 && H - e.h < 10);
  if (index !== -1) {
    const handleStartPoint = index === color.length - 1 && H < 5 ? 360 : 0;
    const selected = color[index];
    const next = color[index === color.length - 1 ? 0 : index + 1];
    return {
      r: Math.floor(
        selected.r +
          ((next.r - selected.r) * (H - selected.h + handleStartPoint)) / 10
      ),
      g: Math.floor(
        selected.g +
          ((next.g - selected.g) * (H - selected.h + handleStartPoint)) / 10
      ),
      b: Math.floor(
        selected.b +
          ((next.b - selected.b) * (H - selected.h + handleStartPoint)) / 10
      )
    };
  }
  return undefined;
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
