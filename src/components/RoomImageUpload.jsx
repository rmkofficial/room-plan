import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

const RoomImageUpload = ({
  imageSrc,
  coordinates,
  onImageClick,
  onImageLoad,
  onPointClick,
  selectedPointIndex,
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
        <Box key={index}>
          <Box
            sx={{
              position: "absolute",
              top: `${coord.y1}px`,
              left: `${coord.x1}px`,
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              border: selectedPointIndex === index ? "2px solid blue" : "none",
            }}
            onClick={() => onPointClick(index)}
          />
          {coord.type === "line" && coord.x2 !== null && coord.y2 !== null && (
            <Box>
              <Box
                sx={{
                  position: "absolute",
                  top: `${coord.y2}px`,
                  left: `${coord.x2}px`,
                  width: "10px",
                  height: "10px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                  border:
                    selectedPointIndex === index ? "2px solid blue" : "none",
                }}
                onClick={() => onPointClick(index)}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: `${coord.y1}px`,
                  left: `${coord.x1}px`,
                  width: `${Math.sqrt(
                    (coord.x2 - coord.x1) ** 2 + (coord.y2 - coord.y1) ** 2
                  )}px`,
                  height: "2px",
                  backgroundColor: "blue",
                  transformOrigin: "0 0",
                  transform: `rotate(${Math.atan2(
                    coord.y2 - coord.y1,
                    coord.x2 - coord.x1
                  )}rad)`,
                  cursor: "pointer",
                  zIndex: 1,
                }}
                onClick={() => onPointClick(index)}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

RoomImageUpload.propTypes = {
  imageSrc: PropTypes.string,
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      x1: PropTypes.number.isRequired,
      y1: PropTypes.number.isRequired,
      x2: PropTypes.number,
      y2: PropTypes.number,
      type: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
  onImageLoad: PropTypes.func.isRequired,
  onPointClick: PropTypes.func.isRequired,
  selectedPointIndex: PropTypes.number,
};

export default RoomImageUpload;
