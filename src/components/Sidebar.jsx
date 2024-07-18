import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: "25%",
        padding: "10px",
        boxSizing: "border-box",
        border: "1px solid #ccc",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="block-select-label">Block</InputLabel>
          <Select labelId="block-select-label" id="block-select">
            <MenuItem value={1}>Block 1</MenuItem>
            <MenuItem value={2}>Block 2</MenuItem>
            <MenuItem value={3}>Block 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="floor-select-label">Floor</InputLabel>
          <Select labelId="floor-select-label" id="floor-select">
            <MenuItem value={1}>Floor 1</MenuItem>
            <MenuItem value={2}>Floor 2</MenuItem>
            <MenuItem value={3}>Floor 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Sidebar;
