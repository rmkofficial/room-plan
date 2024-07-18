import { Box, Typography } from "@mui/material";

const RoomCoordinates = () => {
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
        <Typography variant="subtitle1">Koordinat X</Typography>
        <Typography variant="subtitle1">Koordinat Y</Typography>
        <Typography variant="subtitle1">Address</Typography>
      </Box>
      {/* İlgili veriler buraya eklenecek */}
    </Box>
  );
};

export default RoomCoordinates;
