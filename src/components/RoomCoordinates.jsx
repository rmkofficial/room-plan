import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Typography, TextField, Pagination } from "@mui/material";

const RoomCoordinates = ({ coordinates, onCoordinateChange }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(coordinates.length / itemsPerPage);

  const handleInputChange = (index, field, value) => {
    if (field === "address" && isNaN(value)) {
      return;
    }
    onCoordinateChange(index, field, value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedCoordinates = coordinates.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
      {displayedCoordinates.map((coord, index) => (
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
            onChange={(e) =>
              handleInputChange(
                index + (page - 1) * itemsPerPage,
                "x",
                e.target.value
              )
            }
            size="small"
            sx={{
              width: "30%",
              "& .MuiInputBase-input": { color: coord.color },
            }}
          />
          <TextField
            value={coord.y}
            onChange={(e) =>
              handleInputChange(
                index + (page - 1) * itemsPerPage,
                "y",
                e.target.value
              )
            }
            size="small"
            sx={{
              width: "30%",
              "& .MuiInputBase-input": { color: coord.color },
            }}
          />
          <TextField
            value={coord.address}
            onChange={(e) =>
              handleInputChange(
                index + (page - 1) * itemsPerPage,
                "address",
                e.target.value
              )
            }
            size="small"
            sx={{
              width: "30%",
              "& .MuiInputBase-input": { color: coord.color },
            }}
            error={isNaN(coord.address)} 
            helperText={isNaN(coord.address) ? "Only numbers are allowed" : ""}
          />
        </Box>
      ))}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
        />
      )}
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
