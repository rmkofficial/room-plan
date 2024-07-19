import PropTypes from "prop-types";
import { Box, Typography, TextField } from "@mui/material";

const RoomCoordinates = ({
  coordinates,
  onCoordinateChange,
  selectedPointIndex,
  onRowClick,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
          backgroundColor: "#f5f5f5",
          fontWeight: "bold",
        }}
      >
        <Typography>Koordinat X</Typography>
        <Typography>Koordinat Y</Typography>
        <Typography>Address</Typography>
      </Box>
      {coordinates.map((coord, index) => (
        <Box
          key={index}
          onClick={() => onRowClick(index)}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
            backgroundColor:
              selectedPointIndex === index ? "lightblue" : "transparent",
            cursor: "pointer",
          }}
        >
          <TextField
            value={coord.x}
            onChange={(e) => onCoordinateChange(index, "x", e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "30%", margin: "2px" }}
            InputProps={{ style: { fontSize: 12 } }}
          />
          <TextField
            value={coord.y}
            onChange={(e) => onCoordinateChange(index, "y", e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "30%", margin: "2px" }}
            InputProps={{ style: { fontSize: 12 } }}
          />
          <TextField
            value={coord.address}
            onChange={(e) =>
              onCoordinateChange(index, "address", e.target.value)
            }
            variant="outlined"
            size="small"
            sx={{ width: "30%", margin: "2px" }}
            InputProps={{ style: { fontSize: 12 } }}
          />
        </Box>
      ))}
    </Box>
  );
};

RoomCoordinates.propTypes = {
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCoordinateChange: PropTypes.func.isRequired,
  selectedPointIndex: PropTypes.number,
  onRowClick: PropTypes.func.isRequired,
};

export default RoomCoordinates;
