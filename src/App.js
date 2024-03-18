import React, { useState } from "react";
import "./App.css";
import html2canvas from "html2canvas";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSize, setImageSize] = useState(381);

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
      <div id="element-to-capture" style={{  width: `381px`,
            height: `381px`,backgroundColor: "red"}}>
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
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
                objectFit: "cover",
                // borderRadius: `50%`,
              }}
            />
          )}
        </div>
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
