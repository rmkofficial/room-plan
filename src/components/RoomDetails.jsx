import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import RoomDetailsHeader from "./RoomDetailsHeader";
import RoomCoordinates from "./RoomCoordinates";
import RoomImageUpload from "./RoomImageUpload";

const RoomDetails = ({ selectedRoom }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const [error, setError] = useState(null);

  const handleImageUpload = (src) => {
    setImageSrc(src);
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

    const data = {
      room: selectedRoom,
      coordinates: coordinates.map((coord) => ({
        x: coord.x,
        y: coord.y,
        address: coord.address,
      })),
    };

    console.log(JSON.stringify(data, null, 2));
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
          gap: "40px",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <RoomCoordinates
            coordinates={coordinates}
            onCoordinateChange={handleCoordinateChange}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            width: imgDimensions.width,
            height: imgDimensions.height,
          }}
        >
          <RoomImageUpload
            imageSrc={imageSrc}
            coordinates={coordinates}
            onImageClick={handleImageClick}
            onImageLoad={handleImageLoad}
          />
        </Box>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
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
};

export default RoomDetails;
