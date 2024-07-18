import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const RoomImageUpload = ({ imageSrc }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
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
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      ) : (
        <Typography variant="body1" color="textSecondary">
          No Image Uploaded
        </Typography>
      )}
    </Box>
  );
};

RoomImageUpload.propTypes = {
  imageSrc: PropTypes.string,
};

export default RoomImageUpload;
