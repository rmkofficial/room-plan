import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const RoomImageUpload = ({ imageSrc }) => {
  const [clickCoordinates, setClickCoordinates] = useState([]);

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

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const color = colors[clickCoordinates.length % colors.length]; 
    setClickCoordinates((prevCoords) => [...prevCoords, { x, y, color }]);
    console.log(`Clicked coordinates: X=${x}, Y=${y}, Color=${color}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        border: "1px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Uploaded Room Plan"
          style={{ maxWidth: "100%", maxHeight: "100%", cursor: "crosshair" }}
          onClick={handleImageClick}
        />
      ) : (
        <Typography variant="body1" color="textSecondary">
          No Image Uploaded
        </Typography>
      )}
      {clickCoordinates.map((coord, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: `${coord.y - 5}px`,
            left: `${coord.x - 5}px`,
            width: "10px",
            height: "10px",
            backgroundColor: coord.color,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </Box>
  );
};

RoomImageUpload.propTypes = {
  imageSrc: PropTypes.string,
};

export default RoomImageUpload;
