import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import RoomDetailsHeader from "./RoomDetailsHeader";
import RoomCoordinates from "./RoomCoordinates";
import RoomImageUpload from "./RoomImageUpload";

const RoomDetails = ({ selectedRoom, block, floor }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setImageSrc(null);
    setCoordinates([]);
    setImgDimensions({ width: 0, height: 0 });
  }, [selectedRoom]);

  const handleImageUpload = (src) => {
    setImageSrc(src);
    setCoordinates([]);
    setImgDimensions({ width: 0, height: 0 });
  };

  const handleImageClick = (x, y) => {
    const colors = [
      "red",
      "blue",
      "green",
      "orange",
      "purple",
      "pink",
      "yellow",
      "cyan",
      "magenta",
    ];
    const color = colors[coordinates.length % colors.length];
    setCoordinates((prevCoords) => [
      ...prevCoords,
      { x, y, address: "", color },
    ]);
  };

  const handleImageLoad = ({ width, height }) => {
    setImgDimensions({ width, height });
  };

  const handleCoordinateChange = (index, field, value) => {
    setCoordinates((prevCoords) => {
      const newCoords = [...prevCoords];
      newCoords[index][field] =
        field === "x" || field === "y" ? parseFloat(value) : value;
      return newCoords;
    });
  };

  const handleSave = () => {
    if (
      !selectedRoom ||
      coordinates.some(
        (coord) =>
          !coord.x ||
          !coord.y ||
          !coord.address ||
          isNaN(coord.address) ||
          coord.address === ""
      )
    ) {
      setError(
        "Please fill in all fields correctly. Address must be a non-empty numeric value."
      );
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      coordinates.forEach((coord) => {
        ctx.fillStyle = coord.color;
        ctx.beginPath();
        ctx.arc(coord.x, coord.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `blok_${block}_kat_${floor}_oda_${selectedRoom}.png`;
      link.href = dataUrl;
      link.click();
    };

    setError(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        marginBottom: "10px",
      }}
    >
      <RoomDetailsHeader
        selectedRoom={selectedRoom}
        onImageUpload={handleImageUpload}
        onSave={handleSave}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ width: "400px", paddingRight: 10 }}>
          {" "}
          <RoomCoordinates
            coordinates={coordinates}
            onCoordinateChange={handleCoordinateChange}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            padding: "10px",
            width: imgDimensions.width,
            height: imgDimensions.height,
          }}
        >
          {" "}
          <RoomImageUpload
            imageSrc={imageSrc}
            coordinates={coordinates}
            onImageClick={handleImageClick}
            onImageLoad={handleImageLoad}
          />
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </Box>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

RoomDetails.propTypes = {
  selectedRoom: PropTypes.string.isRequired,
  block: PropTypes.string.isRequired,
  floor: PropTypes.string.isRequired,
};

export default RoomDetails;
