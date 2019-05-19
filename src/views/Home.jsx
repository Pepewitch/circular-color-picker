import React, { useRef } from "react";
import CircularColorPicker from "../components/CircularColorPicker";
import html2canvas from "html2canvas";

export default () => {
  const colorPickerRef = useRef(null);
  const onClick = () => {
    try {
      html2canvas(colorPickerRef.current.containerRef.current).then(canvas => {
        const data = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = data
          .replace(/^data:image\/[^;]*/, "data:application/octet-stream")
          .replace(
            /^data:application\/octet-stream/,
            "data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png"
          );
        a.download = "Canvas.png";
        a.click();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <CircularColorPicker ref={colorPickerRef} />
      <button onClick={onClick}>Download</button>
    </div>
  );
};
