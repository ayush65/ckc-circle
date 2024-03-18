import React, { useState } from "react";
import "./App.css";
import html2canvas from "html2canvas";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSize, setImageSize] = useState(50);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const increaseSize = () => {
    setImageSize(imageSize + 10); // Increase size by 10px
  };

  const decreaseSize = () => {
    setImageSize(imageSize - 10); // Decrease size by 10px
  };

  const captureAndDownload = (captureHeight) => {
    const elementToCapture = document.getElementById("element-to-capture");
    captureAndConvertToBase64(381);

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

          // Restore the original height of the element
          elementToCapture.style.height = originalHeight;
        }, "image/jpeg");
      });
    }
  };

  const captureAndConvertToBase64 = async (captureHeight) => {
    const elementToCapture = document.getElementById("element-to-capture");

    if (elementToCapture) {
      const originalHeight = elementToCapture.style.height;

      // Set the desired height for the element
      elementToCapture.style.height = captureHeight + "px";

      html2canvas(elementToCapture).then(async (canvas) => {
        const base64Image = canvas.toDataURL("image/jpeg");

        elementToCapture.style.height = originalHeight;

        console.log(base64Image);
        console.log("sucess");
      });
    }
  };

  return (
    <div className="App">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {/* <div
        id="element-to-capture"
        style={{
          width: `381px`,
          height: `381px`,
          backgroundColor: "red",
          zIndex: 100000,
        }}
      >
        <div
          className="circle"
          style={{
            width: `381px`,
            height: `381px`,
            borderRadius: `50%`,
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 500,
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                // width: `${imageSize}px`,
                height: `${imageSize}%`,
                objectFit: "cover",
                // borderRadius: `50%`,
                zIndex: 0,
             
              }}
            />
          )}
        </div>
      </div> */}

      <div
        id="element-to-capture"
        style={{
          position: "relative" /* Add position relative to parent div */,
          width: `381px`,
          height: `381px`,
          backgroundColor: "red",
          zIndex: 1000,
          display: "flex" /* Add flexbox for centering */,
          justifyContent: "center" /* Center horizontally */,
          alignItems: "center" /* Center vertically */,
        }}
      >
        <div
          className="circle"
          style={{
            position: "" /* Position the circle div absolutely */,
            width: `381px`,
            height: `381px`,
            borderRadius: `50%`,
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
    
        </div>

        {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                height: `${imageSize}px`,
                objectFit: "cover",
                zIndex: 104,
                position: "absolute"
              }}
            />
          )}


          {selectedImage && (
            <img
              src="data:image/png;base64,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"
              alt="Selected"
              style={{
                weight: `100%`,
                height: `100%`,
                objectFit: "cover",
                zIndex: 104,
                position: "absolute"
              }}
            />
          )}


        {/* <div
          style={{
            position: "relative",
            width: `381px`,
            height: `381px`,
            backgroundColor: "red",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: `381px`,
              height: `381px`,
              borderRadius: `50%`,
              background: "transparent",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
        </div> */}
      </div>

      <div className="controls">
        <button onClick={increaseSize}>+</button>
        <button onClick={decreaseSize}>-</button>

        <button onClick={() => captureAndDownload(381)}>download</button>
      </div>
    </div>
  );
}

export default App;
