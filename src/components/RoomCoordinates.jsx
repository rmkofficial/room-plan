import PropTypes from "prop-types";
import { Box, Typography, TextField } from "@mui/material";

const RoomCoordinates = ({ coordinates, onCoordinateChange }) => {
  const handleInputChange = (index, field, value) => {
    if (field === "address" && isNaN(value)) {
      return; // Sadece sayısal değerleri kabul et
    }
    onCoordinateChange(index, field, value);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Typography variant="subtitle1" sx={{ width: "30%" }}>
          Koordinat X
        </Typography>
        <Typography variant="subtitle1" sx={{ width: "30%" }}>
          Koordinat Y
        </Typography>
        <Typography variant="subtitle1" sx={{ width: "30%" }}>
          Address
        </Typography>
      </Box>
      {coordinates.map((coord, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px 0",
          }}
        >
          <TextField
            value={coord.x}
            onChange={(e) => handleInputChange(index, "x", e.target.value)}
            size="small"
            sx={{
              width: "30%",
              "& .MuiInputBase-input": { color: coord.color },
            }}
          />
          <TextField
            value={coord.y}
            onChange={(e) => handleInputChange(index, "y", e.target.value)}
            size="small"
            sx={{
              width: "30%",
              "& .MuiInputBase-input": { color: coord.color },
            }}
          />
          <TextField
            value={coord.address}
            onChange={(e) =>
              handleInputChange(index, "address", e.target.value)
            }
            size="small"
            sx={{
              width: "30%",
              "& .MuiInputBase-input": { color: coord.color },
            }}
            error={isNaN(coord.address)} // Sayısal olmayan değerler için hata göstermek
            helperText={isNaN(coord.address) ? "Only numbers are allowed" : ""}
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
      address: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCoordinateChange: PropTypes.func.isRequired,
};

export default RoomCoordinates;
