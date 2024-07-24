import PropTypes from "prop-types";
import { Box, Typography, TextField, Button } from "@mui/material";

const RoomCoordinates = ({
  coordinates,
  onCoordinateChange,
  onCoordinateDelete,
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
          width: "100%",
        }}
      >
        <Typography sx={{ width: "14%", textAlign: "center" }}>X1</Typography>
        <Typography sx={{ width: "14%", textAlign: "center" }}>Y1</Typography>
        <Typography sx={{ width: "14%", textAlign: "center" }}>X2</Typography>
        <Typography sx={{ width: "14%", textAlign: "center" }}>Y2</Typography>
        <Typography sx={{ width: "14%", textAlign: "center" }}>Type</Typography>
        <Typography sx={{ width: "14%", textAlign: "center" }}>
          Address
        </Typography>
        <Typography sx={{ width: "14%", textAlign: "center" }}></Typography>
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
            value={coord.x1}
            onChange={(e) => onCoordinateChange(index, "x1", e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "14%", margin: "2px" }}
            InputProps={{ style: { fontSize: 12, textAlign: "center" } }}
          />
          <TextField
            value={coord.y1}
            onChange={(e) => onCoordinateChange(index, "y1", e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "14%", margin: "2px" }}
            InputProps={{ style: { fontSize: 12, textAlign: "center" } }}
          />
          <TextField
            value={coord.x2}
            onChange={(e) => onCoordinateChange(index, "x2", e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "14%", margin: "2px" }}
            InputProps={{ style: { fontSize: 12, textAlign: "center" } }}
          />
          <TextField
            value={coord.y2}
            onChange={(e) => onCoordinateChange(index, "y2", e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "14%", margin: "2px" }}
            InputProps={{ style: { fontSize: 12, textAlign: "center" } }}
          />
          <TextField
            value={coord.type}
            onChange={(e) => onCoordinateChange(index, "type", e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "14%", margin: "2px" }}
            InputProps={{ style: { fontSize: 12, textAlign: "center" } }}
          />
          <TextField
            value={coord.address}
            onChange={(e) =>
              onCoordinateChange(index, "address", e.target.value)
            }
            variant="outlined"
            size="small"
            sx={{ width: "14%", margin: "2px" }}
            InputProps={{ style: { fontSize: 12, textAlign: "center" } }}
          />
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onCoordinateDelete(index);
            }}
            sx={{ width: "14%", margin: "2px" }}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
};

RoomCoordinates.propTypes = {
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
  onCoordinateChange: PropTypes.func.isRequired,
  onCoordinateDelete: PropTypes.func.isRequired,
  selectedPointIndex: PropTypes.number,
  onRowClick: PropTypes.func.isRequired,
};

export default RoomCoordinates;
