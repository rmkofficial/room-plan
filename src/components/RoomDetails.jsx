import PropTypes from "prop-types";
import { Box } from "@mui/material";
import RoomDetailsHeader from "./RoomDetailsHeader";

const RoomDetails = ({ selectedRoom }) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        marginBottom: "10px",
      }}
    >
      <RoomDetailsHeader selectedRoom={selectedRoom} />
      {/* Diğer iki bölüm buraya eklenecek */}
    </Box>
  );
};

RoomDetails.propTypes = {
  selectedRoom: PropTypes.string.isRequired,
};

export default RoomDetails;
