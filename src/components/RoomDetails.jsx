import PropTypes from "prop-types";
import { useState } from "react";
import { Box } from "@mui/material";
import RoomDetailsHeader from "./RoomDetailsHeader";
import RoomCoordinates from "./RoomCoordinates";
import RoomImageUpload from "./RoomImageUpload";

const RoomDetails = ({ selectedRoom }) => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageUpload = (src) => {
    setImageSrc(src);
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
      />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "40px" }}
      >
        <Box sx={{ flex: 1 }}>
          <RoomCoordinates />
        </Box>
        <Box sx={{ flex: 1 }}>
          <RoomImageUpload imageSrc={imageSrc} />
        </Box>
      </Box>
    </Box>
  );
};

RoomDetails.propTypes = {
  selectedRoom: PropTypes.string.isRequired,
};

export default RoomDetails;
