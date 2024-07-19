import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

const RoomImageUpload = ({
  imageSrc,
  coordinates,
  onImageClick,
  onImageLoad,
  onPointClick,
}) => {
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    onImageClick(x, y);
  };

  const handleImageLoad = useCallback(
    (event) => {
      const { width, height } = event.target;
      setImgDimensions({ width, height });
      onImageLoad({ width, height });
    },
    [onImageLoad]
  );

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = handleImageLoad;
    }
  }, [imageSrc, handleImageLoad]);

  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: imgDimensions.width,
        height: imgDimensions.height,
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded Room Plan"
          style={{ maxWidth: "100%", maxHeight: "100%", cursor: "crosshair" }}
          onClick={handleImageClick}
          onLoad={handleImageLoad}
        />
      )}
      {coordinates.map((coord, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: `${coord.y}px`,
            left: `${coord.x}px`,
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
          onClick={() => onPointClick(index)}
        />
      ))}
    </Box>
  );
};

RoomImageUpload.propTypes = {
  imageSrc: PropTypes.string,
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
  onImageLoad: PropTypes.func.isRequired,
  onPointClick: PropTypes.func.isRequired,
};

export default RoomImageUpload;
