import React, { useState } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import { Rnd } from "react-rnd";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSize, setImageSize] = useState(250);

  const increaseSize = () => {
    setImageSize(imageSize + 10);
  };

  const decreaseSize = () => {
    setImageSize(imageSize - 10);
  };

  const captureAndDownload = (captureHeight) => {
    const elementToCapture = document.getElementById("element-to-capture");

    if (elementToCapture) {
      const originalHeight = elementToCapture.style.height;

      elementToCapture.style.height = captureHeight + "px";

      html2canvas(elementToCapture).then((canvas) => {
        canvas.toBlob((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "captured_element.jpg";
          link.click();

          URL.revokeObjectURL(link.href);

          elementToCapture.style.height = originalHeight;
        }, "image/jpeg");
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
    event.target.style.border = "2px dashed #000";
  };

  const dropHandler = (event) => {
    event.preventDefault();
    event.target.style.border = "2px dashed #ccc";

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleDroppedFiles(files);
    }
  };

  const handleDroppedFiles = (files) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <div className="controls">
        <div>
          <button onClick={increaseSize} className="image-plus">
            +
          </button>
          <button onClick={decreaseSize}>-</button>
        </div>
        <button onClick={() => captureAndDownload(500)}>Download</button>
      </div>
      <div
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        style={{
          border: "2px dashed #ccc",
          width: "300px",
          height: "200px",
          textAlign: "center",
          lineHeight: "200px",
          fontSize: "18px",
          margin: "20px auto",
        }}
      >
        Drop Image Here
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      <div
        id="element-to-capture"
        style={{
          position: "relative",
          width: `500px`,
          height: `500px`,
          backgroundColor: "blue",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="circle"
          style={{
            position: "absolute",
            width: `500px`,
            height: `500px`,
            borderRadius: `50%`,
            background: "white",
            justifyContent: "center",
            alignItems: "center",
            zIndex: -5,
          }}
        ></div>

        <div>
          <Rnd>
            {" "}
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  height: `${imageSize}px`,
                  objectFit: "cover",
                  zIndex: 1040000,
                  position: "absolute",
                }}
              />
            )}
          </Rnd>
        </div>

        <img
          src="data:image/png;base64,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"
          alt="Selected"
          style={{
            height: `100%`,
            objectFit: "cover",
            zIndex: 104,
            position: "absolute",
          }}
        />
      </div>

      {/* <div className="controls">
        <div>
          <button onClick={increaseSize} className="image-plus">+</button>
          <button onClick={decreaseSize}>-</button>
        </div>
        <button onClick={() => captureAndDownload(500)}>Download</button>
      </div> */}
    </div>
  );
}

export default App;
