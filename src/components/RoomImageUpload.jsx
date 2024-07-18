import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const RoomImageUpload = ({ imageSrc, coordinates, onImageClick }) => {
  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    onImageClick(x, y);
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
      {coordinates.map((coord, index) => (
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
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      address: PropTypes.string,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default RoomImageUpload;
